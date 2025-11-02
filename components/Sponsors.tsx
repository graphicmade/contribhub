import React from 'react'
import Image from 'next/image'

const sponsors = [
]

function Sponsors() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 my-6">
      {sponsors.map((sponsor) => (
        <a
          key={sponsor.name}
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-4 "
        >
          <Image
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            width={120}
            height={60}
            objectFit="contain"
          />
        </a>
      ))}
    </div>
  )
}

export default Sponsors