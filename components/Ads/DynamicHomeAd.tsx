'use client'
import React, { useEffect, useState } from 'react'
import HomeAd from './HomeAd'
import { getActiveAds } from '@/services/ads'

function DynamicHomeAd() {
  const [ad, setAd] = useState<any>(null)

  useEffect(() => {
    async function fetchAd() {
      const activeAds = await getActiveAds()
      console.log(activeAds)
      if (activeAds.length > 0) {
        setAd(activeAds[0])
      }
    }
    fetchAd()
  }, [])

  if (!ad) {
    return null
  }

  return (
    <HomeAd
      title={ad.first_tagline}
      description={ad.second_tagline}
      link={ad.link}
      iconContent={<img src={ad.image} alt={ad.first_tagline} className="w-full h-full object-cover rounded-md" />}
    />
  )
}

export default DynamicHomeAd