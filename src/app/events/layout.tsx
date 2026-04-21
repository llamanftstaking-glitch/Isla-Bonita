import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Private Dining",
  description:
    "Host your next event at Isla Bonita in Inwood, NYC. Private dining, full buyouts, corporate dinners, birthdays, and more. Capacity up to 100 guests. Inquire today.",
  alternates: { canonical: "https://islabonita.nyc/events" },
  openGraph: {
    title: "Events & Private Dining | Isla Bonita NYC",
    description:
      "Private dining and event venue in Inwood, NYC. Up to 100 guests. Full bar buyout available. Submit an inquiry today.",
    url: "https://islabonita.nyc/events",
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
