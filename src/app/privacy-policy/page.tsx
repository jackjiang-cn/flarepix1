import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy — FlarePix",
  description:
    "Privacy Policy for FlarePix — how we collect, use, and protect your information.",
  alternates: {
    canonical: "https://flarepix.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy — FlarePix",
    description:
      "Privacy Policy for FlarePix — how we collect, use, and protect your information.",
    url: "https://flarepix.com/privacy-policy",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FlarePix Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — FlarePix",
    description:
      "Privacy Policy for FlarePix — how we collect, use, and protect your information.",
    images: ["/og-image.jpg"],
  },
};

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy — FlarePix",
  url: "https://flarepix.com/privacy-policy",
  description: "Privacy Policy for FlarePix — how we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-sm text-[var(--muted)]">Last updated: 2026-06-05</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Privacy Policy</h1>

        <p className="mt-6 text-[var(--muted)]">
          FlarePix (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, and safeguard information when you visit our website at{' '}
          <a href="https://flarepix.com" className="text-[var(--amber)] hover:underline">
            https://flarepix.com
          </a>{' '}
          and use our services.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Information We Collect</h2>
        <p className="mt-3 text-[var(--muted)]">
          We collect information you provide directly, including: name, email address, company name,
          product details, and project specifications when you submit a contact form or communicate
          with us via email.
        </p>

        <h2 className="mt-10 text-xl font-semibold">How We Use Your Information</h2>
        <p className="mt-3 text-[var(--muted)]">
          We use the information to respond to your inquiries, provide quotes, deliver our services,
          and communicate about your project. We do not sell or share your personal information with
          third parties for their marketing purposes.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Information Shared with Third Parties</h2>
        <p className="mt-3 text-[var(--muted)]">
          We may share your information with service providers who assist us in delivering our
          services (e.g., cloud storage providers, communication tools). These providers are
          contractually obligated to protect your information.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Data Retention</h2>
        <p className="mt-3 text-[var(--muted)]">
          We retain your information for as long as necessary to provide our services and for a
          reasonable period thereafter for record-keeping purposes.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Your Rights</h2>
        <p className="mt-3 text-[var(--muted)]">
          You may request access to, correction, or deletion of your personal information by
          contacting us at{' '}
          <a href="mailto:hello@flarepix.com" className="text-[var(--amber)] hover:underline">
            hello@flarepix.com
          </a>
          .
        </p>

        <h2 className="mt-10 text-xl font-semibold">Contact</h2>
        <p className="mt-3 text-[var(--muted)]">
          FlarePix
          <br />
          Email:{' '}
          <a href="mailto:hello@flarepix.com" className="text-[var(--amber)] hover:underline">
            hello@flarepix.com
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}