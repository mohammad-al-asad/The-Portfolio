import { SITE_URL } from "@/lib/site";
import { SOCIAL_LINKS } from "@/lib/socials";

// Who the site is about, as schema.org data for search results
export const PERSON_ID = `${SITE_URL}/#person`;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Mohammad Al Asad",
  alternateName: "M.A. Asad",
  url: SITE_URL,
  image: `${SITE_URL}/hero.jpg`,
  jobTitle: "React Native Developer",
  description:
    "Full-stack & React Native developer building fast, polished apps for mobile and the web.",
  worksFor: { "@type": "Organization", name: "Spark Tech Agency" },
  alumniOf: [
    { "@type": "EducationalOrganization", name: "Feni Govt. Polytechnic Institute" },
    { "@type": "EducationalOrganization", name: "Fazilpur High School" },
  ],
  affiliation: { "@type": "CollegeOrUniversity", name: "Northern University Bangladesh" },
  address: { "@type": "PostalAddress", addressLocality: "Feni", addressCountry: "BD" },
  knowsAbout: [
    "React Native",
    "Expo",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "FastAPI",
    "MongoDB",
    "Machine learning",
  ],
  sameAs: SOCIAL_LINKS.map((s) => s.href),
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mohammad Al Asad",
  url: SITE_URL,
  author: { "@id": PERSON_ID },
};
