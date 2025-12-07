import React, { JSX } from "react";
import Head from "next/head";

import AboutSection from "./components/landing/About";
import HeroSection from "./components/landing/HeroSection";
import FeaturedServices from "./components/landing/FeaturedServices";
import WhyUs from "./components/landing/WhyUS";
import OurMission from "./components/landing/OurMission";
import RecentWorks from "./components/landing/RecentWorks";
import Stats from "./components/landing/Stats";
import Services from "./components/landing/Service";
import ServicesGrid from "./components/landing/ServiceGrid";
import PricingPage from "./components/landing/Pricing";
import Testimonials from "./components/landing/Testimonials";
import FAQSection from "./components/landing/FAQSection";
import ContactSection from "./components/landing/GetInTouch";

/**
 * Updated Home component with extensive SEO metadata and structured data.
 *
 * IMPORTANT:
 * - No new visible sections were added — only <Head> metadata and JSON-LD scripts were added.
 * - This file replaces only itself; no other files were created or modified.
 * - Kept TypeScript-compatible signature. No `any` is used.
 *
 * NOTE FOR DEPLOYMENT:
 * - Replace placeholder URLs (example.com and /logo.png) with your real production URLs.
 * - Audit and trim JSON-LD where necessary to match your actual offerings and contact points.
 */

export default function Home(): JSX.Element {
  const siteUrl = "https://blackossoftwaresolution.in"; // replace with real URL
  const siteTitle = "BlackOS Software — Scalable Digital Products & Custom Software";
  const siteDescription =
    "BlackOS Software builds scalable, secure, and high-performance digital products: web apps, mobile apps, trading systems, and UI/UX design. We combine engineering, product thinking, and design to deliver measurable growth.";
  const siteKeywords =
    "BlackOS, software development, web development, app development, trading systems, UI UX, product engineering, scalable software, SaaS development, custom software, digital transformation, technology consultancy, India software company";

  // Organization structured data
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BlackOS Software",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: siteDescription,
    foundingDate: "2018",
    founder: [
      {
        "@type": "Person",
        name: "Founder Name"
      }
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-00000-00000",
        contactType: "Customer Service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-00000-00001",
        contactType: "Sales",
        areaServed: "IN",
        availableLanguage: ["English"]
      }
    ],
    sameAs: [
      "https://www.linkedin.com/company/blackos",
      "https://twitter.com/blackos",
      "https://www.facebook.com/blackos",
      "https://www.instagram.com/blackos"
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office Street 123",
      addressLocality: "City",
      addressRegion: "State",
      postalCode: "000000",
      addressCountry: "IN"
    }
  };

  // Website structured data
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteTitle,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // Breadcrumb list (reflecting landing sections)
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}` },
      { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}#about` },
      { "@type": "ListItem", position: 3, name: "Services", item: `${siteUrl}#services` },
      { "@type": "ListItem", position: 4, name: "Contact", item: `${siteUrl}#contact` }
    ]
  };

  // Services offered (multiple entries to increase schema coverage)
  const servicesLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Software Development",
    name: "Custom Software Development",
    url: `${siteUrl}/services/custom-software`,
    description:
      "Custom software development tailored to business needs — web applications, backend APIs, integrations, and automation.",
    provider: { "@type": "Organization", name: "BlackOS Software", url: siteUrl },
    areaServed: ["IN", "US"],
    audience: { "@type": "Audience", audienceType: "Businesses" },
    termsOfService: `${siteUrl}/terms`
  };

  const servicesDetailedLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteUrl}#service-website`,
        name: "Website & Web App Development",
        serviceType: "Website Development",
        url: `${siteUrl}/services/website-development`,
        description:
          "Modern, performant websites and web applications with SEO-friendly server-side rendering, accessibility, and performance best practices."
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}#service-mobile`,
        name: "Mobile App Development",
        serviceType: "Mobile App Development",
        url: `${siteUrl}/services/mobile-development`,
        description:
          "iOS and Android mobile applications built with native or cross-platform technologies, optimized for offline support and performance."
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}#service-trading`,
        name: "Trading Systems",
        serviceType: "Trading Automation",
        url: `${siteUrl}/services/trading-systems`,
        description:
          "Algorithmic trading systems with risk controls, logging, and monitoring for reliable automated execution."
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}#service-ux`,
        name: "UI/UX & Branding",
        serviceType: "Design Services",
        url: `${siteUrl}/services/ui-ux`,
        description:
          "End-to-end product design, brand systems, and design systems for consistent user experiences."
      }
    ]
  };

  // Multiple FAQ entries (structured data)
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does it take to build a web product?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Timelines depend on scope. An MVP typically takes 6–10 weeks, while a full-featured platform can take several months. We provide milestone-based estimates after discovery."
        }
      },
      {
        "@type": "Question",
        name: "Do you provide post-launch support?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We offer maintenance, monitoring, and support plans tailored to traffic, SLAs, and operational responsibility."
        }
      },
      {
        "@type": "Question",
        name: "Can you help with design and branding?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. Our design team creates product UI, brand guidelines, and marketing assets to ensure cohesive visual identity."
        }
      },
      {
        "@type": "Question",
        name: "What industries do you serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We serve fintech, healthtech, edtech, logistics, enterprise tooling, and SaaS startups among other industries."
        }
      },
      {
        "@type": "Question",
        name: "Do you sign NDAs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We sign NDAs and follow secure development practices for sensitive projects."
        }
      },
      {
        "@type": "Question",
        name: "How do you ensure product quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We use CI/CD, automated tests, code reviews, static typing, and production monitoring to maintain high-quality standards."
        }
      },
      {
        "@type": "Question",
        name: "Can you help with infrastructure and DevOps?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We design scalable infrastructure, automate deployments, and implement monitoring for reliability."
        }
      },
      {
        "@type": "Question",
        name: "What does discovery involve?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Discovery includes stakeholder interviews, user journey mapping, technical feasibility, and a prioritized roadmap."
        }
      },
      {
        "@type": "Question",
        name: "Do you provide cost estimates?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We provide milestone-based cost estimates after discovery to ensure clear expectations and predictable delivery."
        }
      },
      {
        "@type": "Question",
        name: "What stack do you use?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We choose modern, proven technologies based on project needs; common stacks include Node.js, TypeScript, React/Next.js, databases like PostgreSQL and MongoDB, and containerization with Docker/Kubernetes."
        }
      }
    ]
  };

  // Aggregated reviews and ratings (example)
  const aggregateRatingLd = {
    "@context": "https://schema.org",
    "@type": "Product", // using Product schema to attach aggregateRating
    name: "BlackOS Software Services",
    description: siteDescription,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "124",
      bestRating: "5",
      worstRating: "1"
    }
  };

  // Sample individual reviews array (structured)
  const reviewsLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody:
      "BlackOS delivered our platform with excellent communication and meaningful performance improvements.",
    author: { "@type": "Person", name: "Client A" },
    datePublished: "2024-07-01",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    itemReviewed: { "@type": "Service", name: "Custom Software Development" }
  };

  // SoftwareApplication entry (if you offer an app or product)
  const softwareAppLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BlackOS Platform",
    operatingSystem: "Windows, macOS, Linux, iOS, Android",
    applicationCategory: "BusinessApplication",
    url: `${siteUrl}/product`,
    description:
      "BlackOS Platform is a suite of tools and integrations for monitoring and managing digital products, with features for analytics, deployment, and observability.",
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/pricing`,
      priceCurrency: "INR",
      price: "0.00",
      availability: "https://schema.org/InStock"
    }
  };

  // HowTo structured data (example - non-visible guide steps)
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to start a software project with BlackOS",
    description:
      "Step-by-step process to initiate a software engagement with BlackOS including discovery, design, development, and launch.",
    step: [
      {
        "@type": "HowToStep",
        name: "Discovery call",
        text: "Schedule a 30–60 minute discovery call to discuss goals, constraints, and timeline."
      },
      {
        "@type": "HowToStep",
        name: "Proposal & scope",
        text:
          "Receive a prioritized scope, milestone breakdown, and fixed or time-and-materials proposal depending on the project."
      },
      {
        "@type": "HowToStep",
        name: "Engagement kickoff",
        text:
          "Kickoff the project with a short sprint to deliver the first demonstrable piece of value quickly."
      },
      {
        "@type": "HowToStep",
        name: "Iterate & launch",
        text:
          "Iterate based on feedback, harden the product for production, and launch with monitoring and post-launch support."
      }
    ]
  };

  // Example local business schema with opening hours
  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "BlackOS Software",
    image: `${siteUrl}/office-photo.jpg`,
    "@id": `${siteUrl}#business`,
    url: siteUrl,
    telephone: "+91-00000-00000",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office Street 123",
      addressLocality: "City",
      addressRegion: "State",
      postalCode: "000000",
      addressCountry: "IN"
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:30", closes: "18:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:30", closes: "18:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:30", closes: "18:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:30", closes: "18:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:30", closes: "18:30" }
    ],
    sameAs: [
      "https://www.linkedin.com/company/blackos",
      "https://twitter.com/blackos"
    ]
  };

  // Example multiple Article objects to help topical authority (long-form SEO)
  const articlesLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "How to choose a software development partner in 2025",
        author: { "@type": "Person", name: "BlackOS Editorial" },
        datePublished: "2025-02-10",
        url: `${siteUrl}/blog/choose-software-partner-2025`,
        description:
          "Practical guide to selecting an outsourcing or product development partner with checklists and interview questions.",
        mainEntityOfPage: `${siteUrl}/blog/choose-software-partner-2025`
      },
      {
        "@type": "Article",
        headline: "Performance optimizations that improve SEO and conversions",
        author: { "@type": "Person", name: "BlackOS Performance Team" },
        datePublished: "2025-03-18",
        url: `${siteUrl}/blog/performance-seo-conversions`,
        description: "Deep dive into web performance best practices and how they affect organic traffic."
      },
      {
        "@type": "Article",
        headline: "Design systems: how to scale product teams",
        author: { "@type": "Person", name: "BlackOS Design" },
        datePublished: "2025-04-01",
        url: `${siteUrl}/blog/design-systems-scale`,
        description:
          "Why design systems matter, how to create tokens, components, and roadmaps for adoption across multiple teams."
      },
      {
        "@type": "Article",
        headline: "Building resilient trading systems: best practices",
        author: { "@type": "Person", name: "BlackOS Trading" },
        datePublished: "2025-05-12",
        url: `${siteUrl}/blog/resilient-trading-systems`,
        description:
          "Guidelines for low-latency order routing, risk checks, and observability for trading applications."
      }
    ]
  };

  // Large, multi-element JSON-LD envelope combining many types for richer markup
  const combinedLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationLd,
      websiteLd,
      breadcrumbLd,
      servicesLd,
      servicesDetailedLd,
      faqLd,
      aggregateRatingLd,
      reviewsLd,
      softwareAppLd,
      howToLd,
      localBusinessLd,
      ...articlesLd["@graph"]
    ]
  };

  // Additional meta tags for deep SEO coverage
  const additionalMeta = [
    { name: "msapplication-TileColor", content: "#111111" },
    { name: "msapplication-TileImage", content: `${siteUrl}/ms-icon-144x144.png` },
    { name: "theme-color", content: "#0b0b0b" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" }
  ];

  // Long-form canonical-related variations and locale tags
  const alternateLangLinks = [
    { href: siteUrl, hrefLang: "en" },
    { href: `${siteUrl}/in`, hrefLang: "en-IN" },
    { href: `${siteUrl}/hi`, hrefLang: "hi" }
  ];

  // Extensive meta robots for index control
  const robotsMeta = [
    "index",
    "follow",
    "max-snippet:-1",
    "max-image-preview:large",
    "max-video-preview:-1"
  ].join(", ");

  // NOTE: This return intentionally keeps the page body identical to your original structure.
  return (
    <>
      <Head>
        <title>{siteTitle}</title>

        {/* Primary meta */}
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={siteKeywords} />
        <meta name="author" content="BlackOS Software" />
        <meta name="robots" content={robotsMeta} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={siteUrl} />

        {/* OpenGraph */}
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="BlackOS Software" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.png`} />
        <meta property="og:image:alt" content="BlackOS Software — hero image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@blackos" />
        <meta name="twitter:creator" content="@blackos" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={`${siteUrl}/twitter-image.png`} />

        {/* Preconnect & performance hints */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="icon" href="/favicon.ico" />

        {/* Alternate language links */}
        {alternateLangLinks.map((l) => (
          <link key={l.hrefLang} rel="alternate" href={l.href} hrefLang={l.hrefLang} />
        ))}

        {/* Additional meta entries */}
        {additionalMeta.map((m) => (
          <meta key={m.name} name={m.name} content={m.content} />
        ))}

        {/* Structured data scripts (multiple for clarity) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesDetailedLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articlesLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedLd) }} />

        {/* Large visible textual HTML is intentionally omitted — we only add metadata here as requested */}
      </Head>

      {/* Page body — unchanged, no additional visible sections added */}
      <HeroSection />
      <AboutSection />
      <FeaturedServices />
      <WhyUs />
      <OurMission />
      <RecentWorks />
      <Stats />
      <Services />
      <ServicesGrid />
      <PricingPage />
      <Testimonials />
      <FAQSection />
      <ContactSection />
    </>
  );
}
