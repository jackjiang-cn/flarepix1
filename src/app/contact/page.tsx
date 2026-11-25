import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import { contact } from "@/config/contact";

const description =
  "Tell FlarePix about your project. Share the content you need, where it will be used, and your target date to start a conversation about video and visual production.";

export const metadata: Metadata = {
  title: "Start a Project | Contact FlarePix",
  description,
  alternates: { canonical: "https://www.flarepix.com/contact" },
  openGraph: {
    title: "Start a Project | Contact FlarePix",
    description,
    url: "https://www.flarepix.com/contact",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact FlarePix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Start a Project | Contact FlarePix",
    description,
    images: ["/og-image.jpg"],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Start a Project with FlarePix",
  description,
  url: "https://www.flarepix.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "FlarePix",
    url: "https://www.flarepix.com",
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Qingdao",
      addressRegion: "Shandong",
      addressCountry: "CN",
    },
  },
};

const pointers = [
  { number: "01", title: "Your product or brand", text: "What are you making content for?" },
  { number: "02", title: "Content and channels", text: "Tell us what you need and where it will appear." },
  { number: "03", title: "Timing and references", text: "Share a target date or examples if you have them." },
] as const;

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />

        <section className="mx-auto max-w-7xl px-6 pb-14 pt-20 sm:pb-16 sm:pt-28" aria-labelledby="contact-title">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">FlarePix / Start a Project</p>
          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-end lg:gap-20">
            <h1 id="contact-title" className="max-w-3xl text-[clamp(3rem,6vw,5.75rem)] font-semibold leading-[1.03] tracking-[-0.065em]">
              Tell us what you want to create<span className="text-[#b8975c]">.</span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg lg:pb-2">
              Share your brand, the content you need, and where it will be used. We&apos;ll review your brief and reply with the next steps.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 sm:pb-28" aria-label="Project enquiry">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)] lg:items-start lg:gap-7">
            <div className="rounded-md border border-[#1b3b2f]/15 bg-[#fbfaf6] p-6 sm:p-10">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-[#1b3b2f]/15 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#896333]">Your Brief</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">Start the conversation.</h2>
                </div>
                <p className="text-xs text-[var(--muted)]">* Required fields</p>
              </div>
              <ContactForm />
            </div>

            <aside className="rounded-md bg-[#17382d] p-7 text-[#f4f2ec] sm:p-9" aria-labelledby="brief-help-title">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#cfb077]">A Better Starting Point</p>
              <h2 id="brief-help-title" className="mt-3 text-2xl font-semibold tracking-[-0.035em]">What helps us respond.</h2>
              <ol className="mt-7 border-t border-white/20">
                {pointers.map((item) => (
                  <li key={item.number} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-white/20 py-5">
                    <span className="pt-1 text-xs font-semibold tracking-[0.14em] text-[#cfb077]">{item.number}</span>
                    <div>
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#d5ddd5]">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-9 border-t border-white/20 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#cfb077]">Prefer Email?</p>
                <a href={`mailto:${contact.email}`} className="mt-3 inline-block break-all text-lg font-semibold underline decoration-[#cfb077] underline-offset-4 hover:text-[#cfb077] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  {contact.email}
                </a>
                <p className="mt-7 text-sm text-[#d5ddd5]">Based in Qingdao, China</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
