export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Isla Bonita",
    url: "https://islabonita.nyc",
    telephone: "+16465591222",
    email: "hello@islabonita.nyc",
    description:
      "Caribbean soul meets Amalfi Coast warmth. Bold flavors, signature cocktails, and unforgettable ambiance in Inwood, New York City.",
    image: "https://islabonita.nyc/interior-cherry-blossom.jpg",
    priceRange: "$$",
    servesCuisine: ["Caribbean", "Mediterranean", "American"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "3950 10th Ave Suite B",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10034",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.8676,
      longitude: -73.9218,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday"], opens: "16:00", closes: "23:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday","Saturday"], opens: "12:00", closes: "00:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "12:00", closes: "22:00" },
    ],
    hasMenu: "https://islabonita.nyc/menu",
    acceptsReservations: true,
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Bar", value: true },
      { "@type": "LocationFeatureSpecification", name: "Private Dining", value: true },
      { "@type": "LocationFeatureSpecification", name: "Catering", value: true },
      { "@type": "LocationFeatureSpecification", name: "Happy Hour", value: true },
    ],
    sameAs: [
      "https://www.instagram.com/islabonita",
      "https://www.facebook.com/islabonita",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
