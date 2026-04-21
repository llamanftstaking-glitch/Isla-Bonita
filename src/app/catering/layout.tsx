import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Isla Bonita catering for galas, corporate events, weddings, film shoots, and private parties across New York City. Caribbean-inspired menus tailored to your event.",
  alternates: { canonical: "https://islabonita.nyc/catering" },
  openGraph: {
    title: "Catering | Isla Bonita NYC",
    description:
      "Caribbean-inspired catering for events across New York City — galas, corporate dinners, weddings, and more. Request a quote today.",
    url: "https://islabonita.nyc/catering",
  },
};

export default function CateringLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
