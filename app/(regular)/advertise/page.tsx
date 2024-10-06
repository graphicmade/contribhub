import React from 'react';
import { Metadata } from 'next';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Advertise on ContribHub | ContribHub',
  description: 'Learn how to advertise on ContribHub and reach a community of developers and open-source enthusiasts.',
};

const AdvertisePage: React.FC = () => {
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
          title="Login with GitHub to Advertise"
          description="To advertise on ContribHub, please log in with your GitHub account. This ensures a seamless experience and helps us verify your identity."
        />
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/login" className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
          <GitHubLogoIcon className="mr-2" />
          Login with GitHub
        </Link>
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

export default AdvertisePage;
