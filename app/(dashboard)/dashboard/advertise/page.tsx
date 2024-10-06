'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from '@/components/Contexts/SessionContext';
import { Calendar, Clock, Plus, CreditCard, Trash2, CheckCircle, Info, Mail, HeartHandshake } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { createCheckoutSession } from '@/services/stripe';
import { deleteAd, getUserAds } from '@/services/ads';

interface Ad {
  id: number;
  first_tagline: string;
  second_tagline: string;
  link: string;
  image: string;
  period: string;
  paid_for: boolean;
}

const UserScheduledAds: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const session = useSession() as any;
  const router = useRouter()

  useEffect(() => {
    const fetchAds = async () => {
      if (session?.user?.id) {
        const userAds = await getUserAds(session.user.id);
        setAds(userAds as any);
      }
    };
    fetchAds();
  }, [session]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handlePayment = async (adId: number) => {
    const stripeSession = await createCheckoutSession(adId, session.user.email);
    router.push(stripeSession.url)
  };

  const handleDeleteAd = async (adId: number) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      try {
        await deleteAd(adId);
        setAds(ads.filter(ad => ad.id !== adId));
        toast.success('Ad deleted successfully');
      } catch (error) {
        console.error('Error deleting ad:', error);
        toast.error('Failed to delete ad');
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Scheduled Ads</h2>
        <Link href="/dashboard/advertise/new">
          <Button className="flex items-center space-x-2">
            <Plus size={16} />
            <span>Create New Ad</span>
          </Button>
        </Link>
      </div>
      
      {/* New disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6 text-sm text-blue-800">
        <h3 className="font-semibold mb-2">Important Information:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li className="flex items-center">
            <CheckCircle size={16} className="mr-2 text-blue-600" />
            The standard price for an ad is $150 per week.
          </li>
          <li className="flex items-center">
            <Info size={16} className="mr-2 text-blue-600" />
            Payment is required before the Ad goes live.
          </li>
          <li className="flex items-center">
            <Mail size={16} className="mr-2 text-blue-600" />
            In case of issues feel free to <a className='px-1 underline' href="mailto:graphicmade@gmail.com"> contact us</a>
          </li>
          <li className="flex items-center">
            <HeartHandshake size={16} className="mr-2 text-blue-600" />
           Your support through Ads helps ContribHub thrive and grow.
          </li>
        </ul>
      </div>

      {ads.length === 0 ? (
        <p>You haven't scheduled any ads yet.</p>
      ) : (
        <ul className="space-y-6">
          {ads.map((ad) => (
            <li key={ad.id} className="bg-white rounded-lg nice-shadow p-6">
              <div className="flex items-start space-x-6">
                <div className="flex items-center justify-center w-1/3 h-full">
                  <img
                    src={ad.image}
                    alt={ad.first_tagline}
                    className="rounded-md nice-shadow object-cover"
                  />
                </div>
                <div className="w-2/3 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-xl font-semibold break-words max-w-full">{ad.first_tagline}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${ad.paid_for ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {ad.paid_for ? 'Paid' : 'Pending Payment'}
                    </span>
                  </div>
                  <p className="text-gray-600">{ad.second_tagline}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {formatDate(ad.period.split('|')[0])} - {formatDate(ad.period.split('|')[1])}
                    </span>
                  </div>
                  <a href={ad.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {ad.link}
                  </a>
                  <div className='flex items-center space-x-2'>
                  {!ad.paid_for && (
                    <Button 
                    onClick={() => handlePayment(ad.id)}
                    variant="outline" className="flex items-center space-x-2">
                      <CreditCard size={16} />
                      <span className='flex items-center space-x-1'><span>Pay for Ad </span><span className='py-0.5 px-2 bg-gray-200/60 rounded-full text-xs'>$150</span></span>
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    className="flex items-center space-x-2 text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteAd(ad.id)}
                  >
                    <Trash2 size={16} />
                      <span>Delete Ad</span>
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserScheduledAds;