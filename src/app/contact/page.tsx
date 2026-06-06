import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import { contact } from "@/config/contact";

export const metadata: Metadata = {
  title: "Contact — FlarePix",
  description:
    "Get in touch with FlarePix for product photography, video, and AI visuals. Get a quote within 24 hours.",
  alternates: {
    canonical: "https://flarepix.com/contact",
  },
  openGraph: {
    title: "Contact FlarePix — Get a Quote",
    description:
      "Get in touch with FlarePix for product photography, video, and AI visuals. Get a quote within 24 hours.",
    url: "https://flarepix.com/contact",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact FlarePix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact FlarePix — Get a Quote",
    description:
      "Get in touch with FlarePix for product photography, video, and AI visuals.",
    images: ["/og-image.jpg"],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact FlarePix",
  url: "https://flarepix.com/contact",
  description: "Get in touch for product photography, video, and AI visuals quotes.",
  mainEntity: {
    "@type": "Organization",
    name: "FlarePix",
    email: contact.email,
    telephone: contact.phone,
    url: "https://flarepix.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Qingdao",
      addressRegion: "Shandong",
      addressCountry: "CN",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-3xl font-semibold tracking-tight">Get in touch</h1>
        <p className="mt-4 text-[var(--muted)]">
          Tell us about your project and we&apos;ll get back to you within 24
          hours.
        </p>

        {/* Trust signals */}
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6">
            <p className="text-sm font-medium text-[var(--amber)]">Phone</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{contact.phone}</p>
          </div>
          <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6">
            <p className="text-sm font-medium text-[var(--amber)]">Email</p>
            <p className="mt-2 text-sm">
              <a
                href={`mailto:${contact.email}`}
                className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {contact.email}
              </a>
            </p>
          </div>
          <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6">
            <p className="text-sm font-medium text-[var(--amber)]">Location</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{contact.address}</p>
          </div>
        </div>

        <div className="mt-10">
          <ContactForm />
        </div>

        <div className="mt-16 border-t border-black/[0.08] pt-8">
          <p className="text-sm text-[var(--muted)]">
            Or email us directly at{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-[var(--amber)] hover:underline"
            >
              {contact.email}
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
