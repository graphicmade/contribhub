'use server'
import { createClient } from "@/services/utils/supabase/server";
import { v4 as uuidv4 } from 'uuid';
import { parseISO, isWithinInterval } from 'date-fns';

interface Ad {
  id?: bigint;
  first_tagline: string;
  second_tagline: string;
  image: string;
  link: string;
  period: string;
  user_id: string;
  paid_for: boolean;
}

export async function createAd(formData: FormData): Promise<Ad | null> {
  const supabase = createClient(); // Move inside the function
  try {
    // Extract data from FormData
    const first_tagline = formData.get('first_tagline') as string;
    const second_tagline = formData.get('second_tagline') as string;
    const link = formData.get('link') as string;
    const period = formData.get('period') as string;
    const user_id = formData.get('user_id') as string;
    const imageFile = formData.get('image') as File;

    if (!imageFile || !(imageFile instanceof File)) {
      console.error('Invalid or missing image file');
      return null;
    }

    // Upload image
    const imagePath = `ads/${uuidv4()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from('contribhub')
      .upload(imagePath, imageFile);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    // Get public URL for the uploaded image
    const { data: { publicUrl } } = supabase.storage
      .from('contribhub')
      .getPublicUrl(imagePath);

    // Create ad record
    const { data, error } = await supabase
      .from('ads')
      .insert({
        first_tagline,
        second_tagline,
        image: publicUrl,
        link,
        period,
        user_id,
        paid_for: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating ad:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in createAd:', error);
    return null;
  }
}

export async function scheduleAd(adId: number, startDate: Date, endDate: Date): Promise<boolean> {
  const supabase = createClient(); // Move inside the function
  try {
    const { error } = await supabase
      .from('ads')
      .update({
        period: `${startDate.toISOString()}|${endDate.toISOString()}`,
      })
      .eq('id', adId);

    if (error) {
      console.error('Error scheduling ad:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in scheduleAd:', error);
    return false;
  }
}

export async function getActiveAds(): Promise<Ad[]> {
  const supabase = createClient(); // Move inside the function
  const now = new Date();
  
  const { data, error } = await supabase
    .from('ads')
    .select('*')
    .filter('paid_for', 'eq', true)
    .filter('period', 'not.eq', '') // Ensure period is not empty
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching active ads:', error);
    return [];
  }

  // Filter ads based on the current date and time
  const activeAds = data.filter(ad => {
    const [startDateStr, endDateStr] = ad.period.split('|');
    console.log(startDateStr, endDateStr)
    return isWithinInterval(now, {
      start: startDateStr,
      end: endDateStr
    });
  });

  return activeAds;
}

export async function updateAdPaymentStatus(adId: number, paidFor: boolean): Promise<boolean> {
  const supabase = createClient(); // Move inside the function
  try {
    const { error } = await supabase
      .from('ads')
      .update({ paid_for: paidFor })
      .eq('id', adId);

    if (error) {
      console.error('Error updating ad payment status:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateAdPaymentStatus:', error);
    return false;
  }
}

export async function deleteAd(adId: number): Promise<boolean> {
  const supabase = createClient(); // Move inside the function
  try {
    // First, get the ad to retrieve the image URL
    const { data: ad, error: fetchError } = await supabase
      .from('ads')
      .select('image')
      .eq('id', adId)
      .single();

    if (fetchError) {
      console.error('Error fetching ad for deletion:', fetchError);
      return false;
    }

    // Delete the image from storage
    if (ad && ad.image) {
      const imagePath = ad.image.split('/').pop(); // Get the filename from the URL
      const { error: deleteImageError } = await supabase.storage
        .from('contribhub')
        .remove([imagePath]);

      if (deleteImageError) {
        console.error('Error deleting ad image:', deleteImageError);
        // Continue with ad deletion even if image deletion fails
      }
    }

    // Delete the ad record
    const { error: deleteAdError } = await supabase
      .from('ads')
      .delete()
      .eq('id', adId);

    if (deleteAdError) {
      console.error('Error deleting ad:', deleteAdError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteAd:', error);
    return false;
  }
}

export async function getAvailableSlots(numberOfWeeks: number): Promise<string[]> {
  const supabase = createClient(); // Move inside the function
  try {
    // Fetch all ads with non-empty periods
    const { data: ads, error } = await supabase
      .from('ads')
      .select('period')
      .filter('period', 'not.eq', '')
      .order('period', { ascending: true });

    if (error) {
      console.error('Error fetching ads for available slots:', error);
      return [];
    }

    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endDate = new Date(startDate.getTime() + numberOfWeeks * 7 * 24 * 60 * 60 * 1000);
    
    const bookedPeriods = ads.map(ad => {
      const [start, end] = ad.period.split('|');
      return { start: new Date(start), end: new Date(end) };
    });

    const availableSlots: string[] = [];
    let currentDate = new Date(startDate);

    while (currentDate < endDate) {
      const slotEnd = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      const isSlotAvailable = !bookedPeriods.some(period => 
        (currentDate >= period.start && currentDate < period.end) ||
        (slotEnd > period.start && slotEnd <= period.end) ||
        (currentDate <= period.start && slotEnd >= period.end)
      );

      if (isSlotAvailable) {
        availableSlots.push(`${currentDate.toISOString()}|${slotEnd.toISOString()}`);
        currentDate = slotEnd;
      } else {
        // Find the next available start date
        const nextAvailableDate = bookedPeriods.reduce((nextDate, period) => {
          if (period.end > currentDate && period.end < nextDate) {
            return period.end;
          }
          return nextDate;
        }, endDate);
        
        currentDate = new Date(nextAvailableDate);
      }
    }
    console.log(availableSlots);
    return availableSlots;
  } catch (error) {
    console.error('Error in getAvailableSlots:', error);
    return [];
  }
}

export async function getUserAds(userId: string): Promise<Ad[]> {
    const supabase = createClient(); // Move inside the function
    try {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
  
      if (error) {
        console.error('Error fetching user ads:', error);
        return [];
      }
  
      return data || [];
    } catch (error) {
      console.error('Error in getUserAds:', error);
      return [];
    }
  }
