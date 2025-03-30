import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true
});

export const metadata = {
  metadataBase: new URL('https://hiremod.io'),
  title: {
    default: "Hiremod - AI-Powered Recruitment & Applicant Tracking System",
    template: "%s | Hiremod"
  },
  description: "Hiremod is an intelligent talent platform that streamlines recruitment with AI-powered candidate matching, automated screening, and smart analytics. Find top talent 3x faster.",
  keywords: [
    "AI recruitment software",
    "applicant tracking system",
    "recruitment automation",
    "talent acquisition platform",
    "hiring automation",
    "candidate matching software",
    "AI hiring platform",
    "recruitment CRM",
    "HR technology",
    "intelligent recruiting"
  ],
  authors: [{ name: "Hiremod" }],
  creator: "Hiremod",
  publisher: "Hiremod",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Hiremod - Hiremod - Intelligent Talent Platform",
    description: "Transform your hiring process with AI-powered candidate matching, automated screening, and intelligent analytics. Find better candidates 3x faster.",
    url: 'https://hiremod.io',
    siteName: 'Hiremod',
    images: [
      {
        url: 'https://hiremod.io/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hiremod AI Recruitment Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hiremod - Hiremod - Intelligent Talent Platform",
    description: "Revolutionize your hiring with AI-powered candidate matching and automated screening. Find top talent 3x faster.",
    images: ['https://hiremod.io/images/twitter-image.jpg'],
    creator: '@hiremod',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={`min-h-screen font-sans ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
