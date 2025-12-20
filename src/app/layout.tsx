// app/root-layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavbarFooterWrapper from "./layout/NavbarFooterWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://blackossoftwaresolution.in";
const SITENAME = "BlackOS Software";
const DESCRIPTION = "BlackOS Software Solution provides AI-powered software, web development, mobile app development, and custom IT solutions for businesses worldwide."


const extendedKeywords = [
  "BlackOS",
  "BlackOS Software",
  "enterprise AI solutions",
  "AI consulting for enterprises",
  "UX design and engineering",
  "design-led engineering",
  "secure systems architecture",
  "fast software delivery",
  "web app development",
  "mobile application development",
  "full stack development services",
  "headless CMS integrations",
  "ecommerce platform development",
  "SaaS product development",
  "AI powered products",
  "ml ops consulting",
  "custom AI models",
  "enterprise software development agency",
  "product design consultancy",
  "UX research and testing",
  "interaction design services",
  "user experience strategy",
  "accessibility-first design",
  "performance optimization services",
  "scalable backend architecture",
  "cloud native solutions",
  "microservices design",
  "real-time systems development",
  "trading system development",
  "fintech software development",
  "data engineering services",
  "data pipeline architecture",
  "secure data platforms",
  "privacy-first software",
  "compliance-ready systems",
  "devops and ci/cd",
  "observability and monitoring",
  "qa and automated testing",
  "integration consulting",
  "api design and development",
  "graphql and rest apis",
  "progressive web apps",
  "react development agency",
  "next.js experts",
  "tailwind css ui",
  "design systems creation",
  "brand identity for startups",
  "technical architecture reviews",
  "security audits",
  "site reliability engineering",
  "ai model integration",
  "lifecycle management for ai",
  "ml model deployment",
  "edge computing solutions",
  "serverless architecture",
  "containerized workloads",
  "kubernetes platform engineering",
  "sso and identity management",
  "oauth2 implementations",
  "payment integrations",
  "blockchain exploration",
  "automation and bots",
  "rpa integrations for enterprise",
  "analytics dashboards",
  "custom reporting solutions",
  "observability dashboards",
  "user onboarding flows",
  "customer experience optimization",
  "conversion rate optimisation",
  "a/b testing services",
  "multilingual websites",
  "internationalization (i18n)",
  "localization services",
  "seo for web apps",
  "technical seo audits",
  "semantic markup implementation",
  "schema.org structured data",
  "open graph optimization",
  "twitter card support",
  "social preview assets",
  "image optimization strategies",
  "cdn and caching strategies",
  "image lazy loading",
  "nextjs image component best practices",
  "headless cms for enterprise",
  "content strategy for startups",
  "content engineering",
  "seo-friendly routing",
  "link building strategy",
  "press release distribution",
  "blogging for saas products",
  "devblogs and changelogs",
  "case studies and whitepapers",
  "technical writing services",
  "developer experience improvements",
  "cli tools and developer utilities",
  "api-first product development",
  "observability-driven development",
  "cost-efficient cloud infra",
  "aws azure gcp consulting",
  "hybrid cloud solutions",
  "data privacy engineering",
  "gdpr compliance solutions",
  "hipaa compliant dev",
  "scalable message queueing",
  "event-driven architecture",
  "cqrs and event sourcing",
  "database scaling patterns",
  "sql and nosql expertise",
  "time-series database design",
  "high-frequency trading systems",
  "low-latency networking",
  "protocol optimization",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "BlackOS Software Solution | AI, Web & App Development Company",
  description: DESCRIPTION,
  keywords: extendedKeywords,
  authors: [
    {
      name: "BlackOS Software",
      url: SITE_URL,
    },
  ],
  publisher: "BlackOS Software",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  openGraph: {
    title: "BlackOS Software Solution | AI, Web & App Development Company",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITENAME,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "BlackOS — AI-driven software & design",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlackOS Software Solution | AI, Web & App Development Company",
    description: DESCRIPTION,
    creator: "@BlackOS",
    images: [`${SITE_URL}/og-image.png`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#F97316" }],
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
    languages: {
      "en-US": SITE_URL,
    },
  },
};

const jsonLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITENAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      sameAs: [
        "https://www.linkedin.com/company/blackos",
        "https://github.com/blackos",
        "https://twitter.com/BlackOS",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-7869600155",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITENAME,
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}#homepage`,
      url: SITE_URL,
      name: "Home — BlackOS Software",
      isPartOf: { "@id": `${SITE_URL}#website` },
      about: { "@id": `${SITE_URL}#organization` },
      breadcrumb: {
        "@id": `${SITE_URL}#breadcrumb`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}#breadcrumbList`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}#software`,
      name: "BlackOS Platform",
      applicationCategory: "BusinessApplication",
      url: SITE_URL,
      description: DESCRIPTION,
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0.00",
        priceCurrency: "INR",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}#faqpage`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What services does BlackOS provide?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "BlackOS provides enterprise AI solutions, product design, web & mobile development, cloud architecture, and security & compliance consulting.",
          },
        },
        {
          "@type": "Question",
          name: "How do I contact BlackOS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: `You can reach customer service at +91-7869600155 or use the contact form at ${SITE_URL}/contact.`,
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preload" as="image" href="/og-image.png" />

        <link rel="canonical" href={SITE_URL} />

        <link rel="alternate" hrefLang="en" href={SITE_URL} />
        <link rel="alternate" hrefLang="en-IN" href={SITE_URL} />

        <script
          key="ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
        />

        <meta name="msapplication-TileColor" content="#F97316" />
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavbarFooterWrapper>
          <main>{children}</main>
        </NavbarFooterWrapper>
      </body>
    </html>
  );
}
