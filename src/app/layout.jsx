import { Rubik, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
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
  metadataBase: new URL('https://accessibilityhire.io'),
  title: {
    default: "Accessibility Hire",
    template: "%s | Accessibility Hire"
  },
  description: "Accessibility Hire is an intelligent talent platform that streamlines recruitment with AI-powered candidate matching, automated screening, and smart analytics. Find top talent 3x faster.",
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
  authors: [{ name: "Accessibility Hire" }],
  creator: "Accessibility Hire",
  publisher: "Accessibility Hire",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Accessibility Hire - Accessibility Hire - Intelligent Talent Platform",
    description: "Transform your hiring process with AI-powered candidate matching, automated screening, and intelligent analytics. Find better candidates 3x faster.",
    url: 'https://accessibilityhire.io',
    siteName: 'Accessibility Hire',
    images: [
      {
        url: 'https://accessibilityhire.io/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Accessibility Hire AI Recruitment Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Accessibility Hire - Accessibility Hire - Intelligent Talent Platform",
    description: "Revolutionize your hiring with AI-powered candidate matching and automated screening. Find top talent 3x faster.",
    images: ['https://accessibilityhire.io/images/twitter-image.jpg'],
    creator: '@accessibilityhire',
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
    <html lang="en" className={`${rubik.variable} ${spaceGrotesk.variable}`}>
      <body className={`min-h-screen font-sans ${rubik.className}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
