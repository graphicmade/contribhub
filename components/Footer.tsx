import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import contribhublogo from "@/public/contribhub.png"

function Footer() {
  return (
    <footer className="text-gray-600 py-6 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center">
          <Image 
            src={contribhublogo}
            alt="Contribhub Logo"
            width={100}
            className="mb-3 grayscale"
          />
        </div>
        <div className="flex flex-row text-sm space-x-4 mb-2">
          <Link href="/" className="block hover:underline">Home</Link>
          <Link href="/terms" className="block hover:underline">Terms of Service</Link>
          <Link href="/privacy" className="block hover:underline">Privacy Policy</Link>
          <Link href="/about" className="block hover:underline">About</Link>
          <Link href="https://swve.io" className="block hover:underline">Contact</Link>
        </div>
        <p className="text-xs opacity-70">&copy; {new Date().getFullYear()} ContribHub</p>
      </div>
    </footer>
  );
}

export default Footer;