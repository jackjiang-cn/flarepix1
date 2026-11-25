"use client";

export default function AnalyticsSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("flarepix:open-analytics-preferences"))}
      className={`cursor-pointer transition-colors hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)] ${className}`}
    >
      Analytics settings
    </button>
  );
}
