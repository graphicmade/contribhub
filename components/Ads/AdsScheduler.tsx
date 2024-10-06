"use client"
import React, { useState, useEffect } from 'react';
import { createAd, scheduleAd, getActiveAds, getAvailableSlots } from '@/services/ads';
import toast from 'react-hot-toast';
import { useSession } from '@/components/Contexts/SessionContext';
import { CalendarIcon, ImageIcon, LinkIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar"
import { addMonths } from 'date-fns';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import HomeAd from './HomeAd';
import { useRouter } from 'next/navigation';

const AdsScheduler: React.FC = () => {
  const [firstTagline, setFirstTagline] = useState('');
  const [secondTagline, setSecondTagline] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [startDate, setStartDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const session = useSession() as any;
  const [availableSlots, setAvailableSlots] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const router = useRouter()
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      const slots = await getAvailableSlots(220); // Fetch slots for 2 months
      const parsedSlots = slots.map(slot => new Date(slot.split('|')[0]));
      setAvailableSlots(parsedSlots);
    };
    fetchAvailableSlots();
  }, []);

  // Add this new state for the image preview
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Modify the existing image onChange handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!image || !selectedDate) {
      toast.error('Please select an image and a start date');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('first_tagline', firstTagline);
      formData.append('second_tagline', secondTagline);
      formData.append('link', link);
      formData.append('image', image);
      formData.append('period', '');
      formData.append('user_id', session?.user?.id || '');

      const newAd = await createAd(formData);

      if (newAd && newAd.id) {
        const endDate = new Date(selectedDate);
        endDate.setDate(endDate.getDate() + 7);
        
        const scheduled = await scheduleAd(Number(newAd.id), selectedDate, endDate);
        
        if (scheduled) {
          toast.success('Ad created and scheduled successfully');
          // Reset form
          setFirstTagline('');
          setSecondTagline('');
          setLink('');
          setImage(null);
          setSelectedDate(undefined);
          router.push('/dashboard/advertise')
        } else {
          toast.error('Failed to schedule the ad');
        }
      } else {
        toast.error('Failed to create the ad');
      }
    } catch (error) {
      console.error('Error creating ad:', error);
      toast.error('An error occurred while creating the ad');
    }

    setIsSubmitting(false);
  };

  return (
    <div className='flex flex-col items-center w-full pb-20'>
      <div className='w-full max-w-6xl flex flex-col items-center px-4 mt-24'>
        <h1 className='text-4xl font-bold mb-8'>Schedule an Ad on the homepage</h1>
        <form onSubmit={handleSubmit} className='w-full space-y-6 bg-white rounded-lg nice-shadow p-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div className='space-y-6'>
              <div className="space-y-2">
                <Label htmlFor="firstTagline">First Tagline</Label>
                <Input
                  type="text"
                  id="firstTagline"
                  value={firstTagline}
                  onChange={(e) => setFirstTagline(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondTagline">Second Tagline</Label>
                <Input
                  type="text"
                  id="secondTagline"
                  value={secondTagline}
                  onChange={(e) => setSecondTagline(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Link</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <LinkIcon className="h-5 w-5" />
                  </span>
                  <Input
                    type="url"
                    id="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                    className="rounded-l-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="startDate" className="mb-2">Start Date (1 week period ad)</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => 
                  !availableSlots.some(slot => slot.toDateString() === date.toDateString()) ||
                  date < new Date() ||
                  date > addMonths(new Date(), 4)
                }
                className="rounded-md border w-full"
                numberOfMonths={2}
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || !selectedDate}
            className="w-full"
          >
            {isSubmitting ? 'Creating...' : 'Create Ad'}
          </Button>
        </form>

        {/* Ad Preview */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Ad Preview</h2>
          <HomeAd
            title={firstTagline}
            description={secondTagline}
            link={link}
            iconContent={
              imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Ad preview"
                  width={64}
                  height={64}
                  className="object-cover rounded-md"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                  <ImageIcon className="text-gray-400" />
                </div>
              )
            }
          />
        </div>
      </div>
    </div>
  );

};

export default AdsScheduler;