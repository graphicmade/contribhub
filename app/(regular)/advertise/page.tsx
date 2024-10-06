import React from 'react';
import { Metadata } from 'next';
import AdvertiseClient from './client';

export const metadata: Metadata = {
  title: 'Advertise on ContribHub | ContribHub',
  description: 'Learn how to advertise on ContribHub and reach a community of developers and open-source enthusiasts.',
};

const AdvertisePage: React.FC = () => {
  return (
    <AdvertiseClient />
  );
};


export default AdvertisePage;
