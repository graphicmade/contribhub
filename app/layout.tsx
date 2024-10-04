import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { isDevEnvironment } from "@/services/utils";

const bricolage = Bricolage_Grotesque({ weight: ['200', '300', '400', '500', '600', '700', '800'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: "ContribHub : Find Open Source Projects to Contribute to",
  description: "ContribHub is a platform that helps you find open source projects to contribute to.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={bricolage.className} lang="en">
      <body>
      {isDevEnvironment() ? '' : <Script data-website-id="c8796e86-6ad9-45f8-a02b-c5ee42e0953e" src="/umami/script.js" />}
        {children}
      </body>
    </html>
  );
}
