import type { Metadata } from "next";
import AnalyticsSettingsButton from "@/components/analytics-settings-button";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy — FlarePix",
  description:
    "Privacy Policy for FlarePix — how we collect, use, and protect your information.",
  alternates: {
    canonical: "https://www.flarepix.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy — FlarePix",
    description:
      "Privacy Policy for FlarePix — how we collect, use, and protect your information.",
    url: "https://www.flarepix.com/privacy-policy",
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
  url: "https://www.flarepix.com/privacy-policy",
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
          <a href="https://www.flarepix.com" className="text-[var(--amber)] hover:underline">
            https://flarepix.com
          </a>{' '}
          and use our services.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Information We Collect</h2>
        <p className="mt-3 text-[var(--muted)]">
          We collect information you provide in our contact form or by email, including your name,
          email address, brand or company, requested services, project brief, target date, and
          reference links. When optional measurement is enabled, we also store your landing page,
          referring website domain, and campaign parameters (when present) in your browser session.
          If you submit the form, these attribution details are sent with your inquiry.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Website Analytics</h2>
        <p className="mt-3 text-[var(--muted)]">
          We use Vercel Web Analytics to understand page views, referral sources, approximate location,
          and device or browser information in aggregate. We use these statistics to improve the
          website. Vercel describes this service as cookie-free and anonymized.
        </p>
        <p className="mt-3 text-[var(--muted)]">
          Where configured, Google Analytics and Google Ads measurement may be enabled by default for
          visitors outside the EEA, the UK, and Switzerland. Visitors in those regions must opt in
          before these optional tools run.
          They may receive information about page visits and successful contact-form submissions.
          You can turn them off or change your choice in{" "}
          <AnalyticsSettingsButton className="font-medium text-[var(--foreground)] underline underline-offset-4" />.
          A first-party preference cookie may remember your choice when browser storage is unavailable.
          Turning them off does not affect your ability to contact us.
        </p>

        <h2 className="mt-10 text-xl font-semibold">How We Use Your Information</h2>
        <p className="mt-3 text-[var(--muted)]">
          We use the information to respond to your inquiries, provide quotes, deliver our services,
          and communicate about your project. We do not sell or share your personal information with
          third parties for their marketing purposes.
        </p>
        <p className="mt-3 text-[var(--muted)]">
          When optional measurement is enabled, we use campaign and referral information to
          understand which channels lead to project inquiries.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Information Shared with Third Parties</h2>
        <p className="mt-3 text-[var(--muted)]">
          We use Vercel to host the website and provide aggregate analytics, and Resend to deliver
          contact-form inquiries to our inbox. When optional Google measurement is enabled as
          described above, Google may receive website visit and contact-form conversion data. We
          share data with these providers for those stated purposes and do not sell your personal
          information.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Data Retention</h2>
        <p className="mt-3 text-[var(--muted)]">
          We keep inquiry records as long as needed to respond and follow up. If an inquiry becomes
          a project, we keep relevant records as needed to deliver the work, manage billing, and
          meet applicable recordkeeping obligations.
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
        <p className="mt-3 text-[var(--muted)]">
          Depending on applicable law, you may also have the right to restrict or object to certain
          uses of your personal information, receive a copy in a portable format, or lodge a
          complaint with the relevant data protection authority.
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
