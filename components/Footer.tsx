import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="text-gray-600 py-6 flex items-center justify-center">
      <div className="text-center">
        <div className="flex flex-row space-x-4 mb-4">
          <Link href="/" className="block hover:underline">Home</Link>
          <Link href="/terms" className="block hover:underline">Terms of Service</Link>
          <Link href="/privacy" className="block hover:underline">Privacy Policy</Link>
          <Link href="/about" className="block hover:underline">About</Link>
          <Link href="https://x.com/swveio" className="block hover:underline">Contact</Link>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} ContribHub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;