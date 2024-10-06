"use client"
import React from 'react';
import { Metadata } from 'next';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { HeartHandshake, PointerIcon, SquareMousePointer } from 'lucide-react';
import { useSession } from '@/components/Contexts/SessionContext';
import { useRouter } from 'next/navigation';

const AdvertiseClient: React.FC = () => {
  const session = useSession() as any;

  return (
    <div className="container mx-auto px-4 py-48 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Advertise on ContribHub</h1>
      <p className="text-lg text-gray-600 mb-12 text-center">
        Reach a dedicated audience of developers and open-source enthusiasts.
      </p>
      
      <div className="space-y-12">
        <FeatureSection
          icon={<HeartHandshake className="w-8 h-8 text-blue-600" />}
          title="Support ContribHub's Growth"
          description="Your support through advertising helps ContribHub thrive and grow, allowing us to add more features and improve the platform."
        />
        
        <FeatureSection
          icon={<GitHubLogoIcon className="w-8 h-8 text-black" />}
          title={session.authenticated ? "Start Advertising" : "Login with GitHub to Advertise"}
          description={session.authenticated ? "Click the button below to start creating your ad campaign." : "To advertise on ContribHub, please log in with your GitHub account. This ensures a seamless experience and helps us verify your identity."}
        />
      </div>
      
      <div className="mt-12 text-center">
        {session.authenticated ? (
          <Link
            href="/dashboard/advertise"
            className="inline-flex items-center bg-white text-black px-6 py-3 rounded-lg font-semibold transition-colors nice-shadow"
          >
            <SquareMousePointer className="mr-2" />
            Start Advertising
          </Link>
        ) : (
          <Link href="/login?redirectTo=/dashboard/advertise" className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors nice-shadow">
            <GitHubLogoIcon className="mr-2" />
            Login with GitHub
          </Link>
        )}
      </div>
    </div>
  );
};

interface FeatureSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default AdvertiseClient;
