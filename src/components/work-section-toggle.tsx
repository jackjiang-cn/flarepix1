"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

type Props = {
  label: string;
  queryParam: string;
  clearParams: string[];
};

export default function WorkSectionToggle({
  label,
  queryParam,
  clearParams,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.has(queryParam);

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isOpen) {
      params.delete(queryParam);
    } else {
      clearParams.forEach((p) => params.delete(p));
      params.set(queryParam, "all");
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <button
      onClick={handleClick}
      aria-expanded={isOpen}
      className={`inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors ${
        isOpen
          ? "border-[var(--amber)] bg-[var(--amber)] text-black"
          : "border-white/[0.08] bg-[var(--surface)] text-[var(--muted)] hover:text-white"
      }`}
    >
      {label}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
}
