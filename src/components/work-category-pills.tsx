"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type Tab = {
  slug: string;
  label: string;
  count: number;
};

type Props = {
  tabs: Tab[];
  activeCategory: string;
  targetId: string;
  queryParam: string;
};

export default function WorkCategoryPills({
  tabs,
  activeCategory,
  targetId,
  queryParam,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const buildHref = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(queryParam, slug);
    return `${pathname}?${params.toString()}`;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const href = buildHref(slug);
    startTransition(() => {
      router.push(href, { scroll: false });
      requestAnimationFrame(() => {
        document
          .getElementById(targetId)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  return (
    <div
      className={`mt-4 flex flex-wrap gap-3 transition-opacity ${
        pending ? "opacity-60" : ""
      }`}
    >
      <a
        href={buildHref("all")}
        onClick={(e) => handleClick(e, "all")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          activeCategory === "all"
            ? "bg-[var(--amber)] text-black"
            : "bg-[var(--surface)] text-[var(--muted)] hover:text-white"
        }`}
      >
        All
      </a>
      {tabs.map((cat) => (
        <a
          key={cat.slug}
          href={buildHref(cat.slug)}
          onClick={(e) => handleClick(e, cat.slug)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === cat.slug
              ? "bg-[var(--amber)] text-black"
              : "bg-[var(--surface)] text-[var(--muted)] hover:text-white"
          }`}
        >
          {cat.label}
          {cat.count > 0 && (
            <span className="ml-1 opacity-60">({cat.count})</span>
          )}
        </a>
      ))}
    </div>
  );
}
