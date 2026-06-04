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
          { name: "Electronic scales", note: "kitchen and body weight scales for Amazon listing videos" },
          { name: "Children's toys", note: "kids toys and play sets for brand films and lifestyle photography" },
          { name: "Tissue products", note: "facial tissue, paper towels, and household tissue packaging photography" },
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