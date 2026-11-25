import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service — FlarePix",
  description:
    "Terms of Service for FlarePix — project terms, pricing, intellectual property, and revision policy.",
  alternates: {
    canonical: "https://www.flarepix.com/terms",
  },
  openGraph: {
    title: "Terms of Service — FlarePix",
    description:
      "Terms of Service for FlarePix — project terms, pricing, intellectual property, and revision policy.",
    url: "https://www.flarepix.com/terms",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FlarePix Terms of Service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — FlarePix",
    description:
      "Terms of Service for FlarePix — project terms, pricing, intellectual property, and revision policy.",
    images: ["/og-image.jpg"],
  },
};

const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service — FlarePix",
  url: "https://www.flarepix.com/terms",
  description: "Terms of Service for FlarePix — project terms, pricing, intellectual property, and revision policy.",
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
      />
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-sm text-[var(--muted)]">Last updated: 2026-06-05</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Terms of Service</h1>

        <p className="mt-6 text-[var(--muted)]">
          Welcome to FlarePix. By using our website and services, you agree to these Terms of Service.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Services</h2>
        <p className="mt-3 text-[var(--muted)]">
          FlarePix provides video and visual content production for consumer brands and ecommerce
          teams, including commercials, advertising creatives, product demonstrations, AI video, and
          photography. The scope, deliverables, and price for each project are confirmed in the
          written proposal.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Quoting and Pricing</h2>
        <p className="mt-3 text-[var(--muted)]">
          Prices shown on this website are starting prices for the stated scope. Final project
          pricing, deliverables, any additional production costs, and quote validity are confirmed
          in the written proposal before work begins.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Client Materials</h2>
        <p className="mt-3 text-[var(--muted)]">
          Clients are responsible for ensuring they have the right to use any materials (products,
          images, brand assets) provided to FlarePix for production purposes.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Intellectual Property</h2>
        <p className="mt-3 text-[var(--muted)]">
          The written proposal specifies the client&apos;s usage rights in the final deliverables and
          any separate terms for licensed music, talent, or other third-party assets. Those rights
          take effect upon full payment unless the proposal states otherwise. FlarePix will feature
          completed work in its portfolio only with the client&apos;s written agreement.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Revision Policy</h2>
        <p className="mt-3 text-[var(--muted)]">
          Revision rounds and review stages are specified in the written proposal. If a request falls
          outside the agreed scope, we will quote the additional work and seek your approval before
          proceeding.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Turnaround Time</h2>
        <p className="mt-3 text-[var(--muted)]">
          Project timelines are agreed in the written proposal after we review the scope, required
          materials, and feedback schedule. Any expedited delivery terms, if available, are specified
          in the proposal.
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
