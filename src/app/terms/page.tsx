import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service — FlarePix",
  description:
    "Terms of Service for FlarePix — project terms, pricing, intellectual property, and revision policy.",
  alternates: {
    canonical: "https://flarepix.com/terms",
  },
  openGraph: {
    title: "Terms of Service — FlarePix",
    description:
      "Terms of Service for FlarePix — project terms, pricing, intellectual property, and revision policy.",
    url: "https://flarepix.com/terms",
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
  url: "https://flarepix.com/terms",
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
          FlarePix provides professional product photography, video production, AI imagery, and AI
          video services for ecommerce and Amazon sellers. All services are quoted and delivered on a
          project-by-project basis.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Quoting and Pricing</h2>
        <p className="mt-3 text-[var(--muted)]">
          All quotes provided by FlarePix are valid for 30 days from the date of issue. Pricing is
          customized based on product type, volume, and project scope. No fixed packages are offered.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Client Materials</h2>
        <p className="mt-3 text-[var(--muted)]">
          Clients are responsible for ensuring they have the right to use any materials (products,
          images, brand assets) provided to FlarePix for production purposes.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Intellectual Property</h2>
        <p className="mt-3 text-[var(--muted)]">
          Final deliverables are transferred to the client upon full payment. FlarePix reserves the
          right to display completed work in our portfolio unless otherwise agreed in writing.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Revision Policy</h2>
        <p className="mt-3 text-[var(--muted)]">
          All projects include a defined number of revisions as specified in the project quote.
          Additional revisions are billed at our standard hourly rate.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Turnaround Time</h2>
        <p className="mt-3 text-[var(--muted)]">
          Standard turnaround is 6–8 business days from receipt of products and payment. Rush
          delivery is available at an additional cost.
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