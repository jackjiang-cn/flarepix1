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

const faqs = [
  {
    q: "How does your product photography work?",
    a: "Ship your products to our studio, share your brief and specs, and we'll handle everything — styling, shooting, editing, and delivery. For AI generation, just upload a reference photo and we'll create lifestyle scenes, on-model shots, and more.",
  },
  {
    q: "What is your turnaround time?",
    a: "Standard turnaround is 6–8 business days from receipt of products and payment. Rush delivery in 3–4 business days available. AI generation can be even faster depending on volume.",
  },
  {
    q: "What services do you offer?",
    a: "We offer product photography (ghost mannequin, flat lay, on-model), product videography, AI on-model imagery, AI lifestyle scenes, AI video generation, and 3D product rendering. All from one studio, one workflow.",
  },
  {
    q: "Can I work with you remotely?",
    a: "Yes. Our process is fully remote — ship your products to us from anywhere, or use our AI generation service with just reference photos. You receive upload-ready files online.",
  },
  {
    q: "Is retouching included?",
    a: "Basic retouching is included on all images — color correction, cropping, and background cleanup. Premium retouching is available for advanced edits.",
  },
  {
    q: "What's the difference between AI generation and traditional photography?",
    a: "Traditional photography captures your actual product in our studio under controlled lighting. AI generation takes a reference photo and creates lifestyle scenes, on-model shots, and campaign visuals around it. Many brands use both for different needs.",
  },
  {
    q: "Does AI video look AI-generated?",
    a: "Without professional oversight, yes — AI-generated video often has telltale signs: unnatural motion, visual artifacts, generic-looking scenes. FlarePix runs every AI output through human quality review before delivery. We fix artifacts, correct product angles, and ensure the final video looks professional on your Amazon listing.",
  },
  {
    q: "What's included in your human quality review?",
    a: "Every AI video and image we produce is reviewed by a team member before delivery. That means checking product accuracy, visual quality, brand consistency, and Amazon compliance. You receive finished files — not a draft to review and send back.",
  },
  {
    q: "What's the difference between AI video and brand film production?",
    a: "AI video is generated from reference assets — fast, scalable, and suited for batch content (Amazon A+ video, social ad variants, display campaigns). Brand film production involves a real shoot with professional talent, creative direction, and a multi-week post-production process. Brand films are built for your biggest launches and highest-stakes visual moments.",
  },
  {
    q: "How does your hybrid production workflow work?",
    a: "For brand films: we plan the creative concept, shoot real footage with professional talent, then use AI-assisted post-production for colour grading, motion graphics, and upscaling. For AI video: we manage the generation process end-to-end — prompt design, reference curation, output review. Either way, you work with a team, not a tool.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <FaqSection />
      <Footer />
    </>
  );
}
