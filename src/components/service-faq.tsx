type Faq = { q: string; a: string };

export default function ServiceFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="mt-16">
      <h2 className="text-xl font-semibold">Frequently asked questions</h2>
      <div className="mt-6 space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.q}
            name="service-faq"
            className="group rounded-xl border border-black/[0.08] bg-[var(--surface)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)] [&::-webkit-details-marker]:hidden">
              <span className="text-sm font-medium">{faq.q}</span>
              <span className="ml-4 shrink-0 text-[var(--muted)]" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 group-open:hidden">
                  <path d="M8 3v10M3 8h10" />
                </svg>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="hidden h-4 w-4 group-open:block">
                  <path d="M3 8h10" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-black/[0.06] p-5">
              <p className="text-sm text-[var(--muted)]">{faq.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
