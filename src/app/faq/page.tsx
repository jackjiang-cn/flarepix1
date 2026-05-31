import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FaqSection from "@/components/faq-section";

export const metadata: Metadata = {
  title: "FAQ — FlarePix",
  description:
    "Frequently asked questions about FlarePix product photography, video, and AI services.",
  alternates: {
    canonical: "https://flarepix.com/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <FaqSection />
      <Footer />
    </>
  );
}
