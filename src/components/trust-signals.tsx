import { contact } from "@/config/contact";

export default function TrustSignals() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6">
          <p className="text-sm font-medium text-[var(--amber)]">Phone</p>
          <p className="mt-2 text-sm text-[var(--muted)]">{contact.phone}</p>
        </div>
        <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6">
          <p className="text-sm font-medium text-[var(--amber)]">Email</p>
          <p className="mt-2 text-sm text-[var(--muted)]">{contact.email}</p>
        </div>
        <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6">
          <p className="text-sm font-medium text-[var(--amber)]">Location</p>
          <p className="mt-2 text-sm text-[var(--muted)]">{contact.address}</p>
        </div>
      </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { name: "Product Photography", note: "Kitchen scales, body fat monitors, and fitness electronics for Amazon listings" },
          { name: "Brand Films", note: "Kids toys, play sets, and lifestyle shoots for brand and launch videos" },
          { name: "AI Imagery", note: "Home goods, tissue packaging, and household products — lifestyle and on-model AI scenes" },
        ].map((cat) => (
          <div key={cat.name} className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-4">
            <p className="text-sm font-medium text-[var(--foreground)]">{cat.name}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">{cat.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}