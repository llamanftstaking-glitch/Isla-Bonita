import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Meet the team behind Isla Bonita. Chef Gus Moya's vision of Caribbean boldness and Amalfi warmth, served in the heart of Inwood, New York City since 2025.",
  alternates: { canonical: "https://islabonita.nyc/about" },
  openGraph: {
    title: "Our Story | Isla Bonita NYC",
    description:
      "Chef Gus Moya's vision of Caribbean boldness and Amalfi warmth, served in Inwood, NYC since 2025.",
    url: "https://islabonita.nyc/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
