import type { Metadata } from "next";
import Header from "@/components/header";
import Hero from "@/components/hero";
import SelectedWork from "@/components/selected-work";
import IndustryFocus from "@/components/industry-focus";
import VideoSection from "@/components/video-section";
import ServicesOverview from "@/components/services-overview";
import AiShowcase from "@/components/ai-showcase";
import ProcessSteps from "@/components/process-steps";
import WhyUs from "@/components/why-us";
import FaqSection from "@/components/faq-section";
import TrustSignals from "@/components/trust-signals";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Commercial Video & Visual Content for Consumer Brands | FlarePix",
  description:
    "FlarePix creates commercial videos, product demonstrations, advertising creatives, and photography for consumer brands and ecommerce teams.",
  alternates: { canonical: "https://www.flarepix.com" },
  openGraph: {
    title: "Commercial Video & Visual Content for Consumer Brands | FlarePix",
    description:
      "FlarePix creates commercial videos, product demonstrations, advertising creatives, and photography for consumer brands and ecommerce teams.",
    url: "https://www.flarepix.com",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Commercial Video & Visual Content for Consumer Brands | FlarePix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Video & Visual Content for Consumer Brands | FlarePix",
    description:
      "FlarePix creates commercial videos, product demonstrations, advertising creatives, and photography for consumer brands and ecommerce teams.",
    images: ["/og-image.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SelectedWork />
        <ServicesOverview />
        <IndustryFocus />
        <VideoSection />
        <AiShowcase />
        <ProcessSteps />
        <WhyUs />
        <FaqSection />
        <TrustSignals />
      </main>
      <Footer />
    </>
  );
}
