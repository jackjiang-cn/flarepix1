import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "filled" | "outline";
  className?: string;
};

export default function CtaButton({
  href,
  children,
  variant = "filled",
  className = "",
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-7 py-3 text-sm font-medium transition-colors";
  const filled = "bg-[var(--amber)] text-black hover:bg-amber-400";
  const outline =
    "border border-[var(--amber)] text-[var(--amber)] hover:bg-[var(--amber)] hover:text-black";

  return (
    <Link
      href={href}
      className={`${base} ${variant === "filled" ? filled : outline} ${className}`}
    >
      {children}
    </Link>
  );
}
