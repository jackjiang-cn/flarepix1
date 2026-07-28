import type { Metadata } from "next";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ValueProp from "@/components/value-prop";
import VideoCarousel from "@/components/video-carousel";
import PortfolioCarousel from "@/components/portfolio-carousel";
import VideoSection from "@/components/video-section";
import ServicesOverview from "@/components/services-overview";
import AiShowcase from "@/components/ai-showcase";
import ProcessSteps from "@/components/process-steps";
import WhyUs from "@/components/why-us";
import FeatureCards from "@/components/feature-cards";
import BrandMarquee from "@/components/brand-marquee";
import SeoContent from "@/components/seo-content";
import WhatWeDo from "@/components/what-we-do";
import FaqSection from "@/components/faq-section";
import StatsSection from "@/components/stats-section";
import TrustSignals from "@/components/trust-signals";
import Footer from "@/components/footer";
import { photoCategories } from "@/config/categories";
import { photoSources } from "@/config/photo-sources";
import { cdnUrl } from "@/config/cdn";

export const metadata: Metadata = {
  title: "FlarePix — Amazon Product Photography, Video & AI Visuals for Ecommerce",
  description:
    "Photo, video, AI imagery, and AI video for Amazon and ecommerce brands — one studio, one workflow. Based in Qingdao, China. Remote-friendly, worldwide shipping.",
  alternates: { canonical: "https://www.flarepix.com" },
  openGraph: {
    title: "FlarePix — Product Photography, Video & AI Visuals for Ecommerce",
    description:
      "Photo, video, AI imagery, and AI video for Amazon and ecommerce brands — one studio, one workflow. Based in Qingdao, China.",
    url: "https://www.flarepix.com",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FlarePix — Product Photography, Video & AI Visuals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlarePix — Amazon Product Photography, Video & AI Visuals",
    description:
      "Photo, video, AI imagery, and AI video for Amazon and ecommerce brands — one studio, one workflow. Based in Qingdao, China.",
    images: ["/og-image.jpg"],
  },
};

// Product photography tabs from photoCategories
const productTabs = photoCategories.map((cat) => ({
  label: cat.label,
  slug: cat.slug,
  images: photoSources[cat.slug] || [],
}));

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "FlarePix Hero Reel",
  description:
    "Product photography, video and AI imagery showreel for ecommerce and Amazon brands",
  thumbnailUrl: cdnUrl("/works/posters/hero-reel.jpg"),
  contentUrl: cdnUrl("/works/hero-reel.mp4"),
  uploadDate: "2026-01-15T00:00:00Z",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main>
        <Hero />
        <ServicesOverview />
        <ValueProp />
        <VideoCarousel />
        <PortfolioCarousel
          title="Product photography"
          description="Quality product images ready for your online shop, marketplace, or ecommerce site."
          tabs={productTabs}
          basePath="/services"
          linkPattern="path"
        />
        <VideoSection />
        <AiShowcase />
        <ProcessSteps />
        <WhyUs />
        <FeatureCards />
        <StatsSection />
        <BrandMarquee />
        <SeoContent />
        <WhatWeDo />
        <FaqSection />
        <TrustSignals />
      </main>
      <Footer />
    </>
  );
}
