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
import Footer from "@/components/footer";
import { photoCategories } from "@/config/categories";
import { photoSources } from "@/config/photo-sources";

export const metadata: Metadata = {
  title: "FlarePix — Product Photography, Video & AI Visuals for Ecommerce",
  description:
    "Photo, video, AI imagery, and AI video for Amazon and ecommerce brands — one studio, one workflow. Studio in Miami, remote-friendly, fast turnaround.",
  alternates: { canonical: "https://flarepix.com" },
  openGraph: {
    title: "FlarePix — Product Photography, Video & AI Visuals",
    description:
      "Photo, video, AI imagery, and AI video for Amazon and ecommerce brands.",
    url: "https://flarepix.com",
    type: "website",
  },
};

// Product photography tabs from photoCategories
const productTabs = photoCategories.map((cat) => ({
  label: cat.label,
  slug: cat.slug,
  images: photoSources[cat.slug] || [],
}));

export default function Home() {
  return (
    <>
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
      </main>
      <Footer />
    </>
  );
}