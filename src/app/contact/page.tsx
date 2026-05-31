import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import { contact } from "@/config/contact";

export const metadata: Metadata = {
  title: "Contact — FlarePix",
  description:
    "Get in touch with FlarePix for product photography, video, and AI visuals.",
  alternates: {
    canonical: "https://flarepix.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-3xl font-semibold tracking-tight">Get in touch</h1>
        <p className="mt-4 text-[var(--muted)]">
          Tell us about your project and we&apos;ll get back to you within 24
          hours.
        </p>

        <div className="mt-10">
          <ContactForm />
        </div>

        <div className="mt-16 border-t border-white/[0.06] pt-8">
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
