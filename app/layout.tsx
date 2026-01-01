import type { Metadata } from "next";
import {Geist, Geist_Mono, Playfair_Display} from "next/font/google";
import "./globals.css";
import AuthProvider from "@/app/providers/AuthProvider";

import { Inter } from 'next/font/google'

export const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-inter',
})

export const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400'],
    style: ['normal', 'italic'],
    variable: '--font-playfair',
})



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EverGift",
  description: "A modern way to send wedding gifts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-inter \`${playfair.variable} playfair-display`}
      >
      <AuthProvider>
        {children}
      </AuthProvider>
      </body>
    </html>
  );
}
