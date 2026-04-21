import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore Isla Bonita's full menu — Caribbean-inspired small plates, signature mains, bold cocktails, and daily happy hour specials starting at 4 PM in Inwood, NYC.",
  alternates: { canonical: "https://islabonita.nyc/menu" },
  openGraph: {
    title: "Menu | Isla Bonita NYC",
    description:
      "Caribbean-inspired dishes, signature cocktails, and daily happy hour at 4 PM. Order online via UberEats or DoorDash.",
    url: "https://islabonita.nyc/menu",
  },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
