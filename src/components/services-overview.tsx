export default function ServicesOverview() {
  return (
    <section className="bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-40">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Two ways to get product visuals
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            Choose what works for your brand — or combine both
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.06] bg-[var(--background)] p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--amber)]">
              Traditional
            </p>
            <h3 className="mt-3 text-2xl font-semibold">
              Ship &amp; Shoot
            </h3>
            <p className="mt-3 text-[var(--muted)]">
              Send us your products. We photograph them in studio — ghost
              mannequin, flat lay, on-model, 360/3D shots. Consistent quality,
              handled end to end.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--amber)]/20 bg-[var(--background)] p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--amber)]">
              AI-Powered
            </p>
            <h3 className="mt-3 text-2xl font-semibold">
              AI Generation
            </h3>
            <p className="mt-3 text-[var(--muted)]">
              Upload a reference photo, get AI-generated lifestyle scenes,
              on-model shots, and campaign visuals. Fast, scalable, no
              shipping needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
