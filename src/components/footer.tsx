import Link from "next/link";
import { contact, navigation } from "@/config/contact";
import AnalyticsSettingsButton from "@/components/analytics-settings-button";

const footerServices = [
  { label: "Commercials & Brand Films", href: "/services#brand-film" },
  { label: "Advertising Creatives", href: "/services#advertising-creatives" },
  { label: "Product Videos & Demos", href: "/services#product-demonstrations" },
  { label: "AI Video Production", href: "/services#ai-video" },
  { label: "Product Photography", href: "/services#product-photography" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.08] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-8">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Flare<span className="text-[var(--amber)]">Pix</span>
            </Link>
            <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
              Video and visual production for consumer brands. Commercials, advertising creatives, product videos, AI video, and photography.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-3 text-sm font-medium text-[var(--foreground)]">Navigation</p>
            <nav className="flex flex-col gap-2">
              {navigation.footer.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <p className="mb-3 text-sm font-medium text-[var(--foreground)]">Services</p>
            <nav className="flex flex-col gap-2">
              {footerServices.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-3 text-sm font-medium text-[var(--foreground)]">Get in touch</p>
            <a
              href={`mailto:${contact.email}`}
              className="block text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {contact.email}
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-black/[0.08] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <span>&copy; {new Date().getFullYear()} FlarePix. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-[var(--foreground)] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">Terms</Link>
            <AnalyticsSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
