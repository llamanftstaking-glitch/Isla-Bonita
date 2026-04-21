import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hours & Location",
  description:
    "Find Isla Bonita at 3950 10th Ave Suite B, Inwood, New York. Open daily — happy hour starts at 4 PM. Easy subway access via A/C and 1 trains.",
  alternates: { canonical: "https://islabonita.nyc/hours" },
  openGraph: {
    title: "Hours & Location | Isla Bonita NYC",
    description:
      "3950 10th Ave Suite B, Inwood, New York. Open daily — happy hour at 4 PM. A/C and 1 train access.",
    url: "https://islabonita.nyc/hours",
  },
};

export default function HoursLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
