import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://islabonita.nyc";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Isla Bonita | Caribbean & Amalfi Restaurant in Inwood, NYC",
    template: "%s | Isla Bonita NYC",
  },
  description:
    "Isla Bonita brings Caribbean soul and Amalfi Coast warmth to Inwood, New York City. Signature cocktails, bold flavors, happy hour daily at 4 PM. Reserve your table today.",
  keywords: [
    "Isla Bonita restaurant",
    "Caribbean restaurant NYC",
    "Amalfi restaurant New York",
    "Inwood restaurant",
    "Washington Heights restaurant",
    "happy hour Inwood",
    "restaurant 10th Ave Manhattan",
    "Caribbean food Manhattan",
    "private dining NYC",
    "brunch Inwood NYC",
    "catering NYC",
    "events venue Inwood",
  ],
  authors: [{ name: "Isla Bonita" }],
  creator: "Isla Bonita",
  publisher: "Isla Bonita",
  category: "Restaurant",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Isla Bonita",
    title: "Isla Bonita | Caribbean & Amalfi Restaurant in Inwood, NYC",
    description:
      "Caribbean soul meets Amalfi Coast warmth. Bold flavors, signature cocktails, happy hour daily at 4 PM. Located at 3950 10th Ave, Inwood, New York.",
    images: [
      {
        url: "/interior-cherry-blossom.jpg",
        width: 1200,
        height: 630,
        alt: "Isla Bonita restaurant interior — Inwood, NYC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isla Bonita | Caribbean & Amalfi Restaurant in Inwood, NYC",
    description:
      "Caribbean soul meets Amalfi Coast warmth. Bold flavors, signature cocktails, happy hour daily at 4 PM.",
    images: ["/interior-cherry-blossom.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
