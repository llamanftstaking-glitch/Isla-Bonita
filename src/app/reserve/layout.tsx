import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserve a Table",
  description:
    "Reserve a table at Isla Bonita in Inwood, NYC. Easy online booking — choose your date, time, and party size. Walk-ins welcome. Call (646) 559-1222 for large parties.",
  alternates: { canonical: "https://islabonita.nyc/reserve" },
  openGraph: {
    title: "Reserve a Table | Isla Bonita NYC",
    description:
      "Book your table at Isla Bonita, Inwood NYC. Online reservations available. Call (646) 559-1222 for parties over 8.",
    url: "https://islabonita.nyc/reserve",
  },
};

export default function ReserveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
