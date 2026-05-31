export default function StatsSection() {
  const stats = [
    { value: "50,000+", label: "Product photos delivered" },
    { value: "2,000+", label: "Brands served" },
    { value: "3,500+", label: "AI visuals generated" },
    { value: "98%", label: "Client satisfaction" },
  ];

  return (
    <section className="bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-[var(--amber)] sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
