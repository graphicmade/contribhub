import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
