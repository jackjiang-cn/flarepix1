import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Blog — FlarePix",
  description:
    "Tips, guides, and insights on product photography, AI imagery, and ecommerce visuals.",
  alternates: {
    canonical: "https://flarepix.com/blog",
  },
};

const posts = [
  {
    title: "Why AI Product Images Convert Better in 2026",
    date: "May 20, 2026",
    excerpt:
      "AI-generated lifestyle imagery is outperforming traditional product photos. Here's what the data shows and how to use it for your Amazon listings.",
  },
  {
    title: "Ghost Mannequin vs Flat Lay: Which One for Your Brand?",
    date: "May 10, 2026",
    excerpt:
      "Both are essential for apparel brands, but they serve different purposes. A practical guide to choosing the right format for each product type.",
  },
  {
    title: "How to Prepare Your Products for a Photo Shoot",
    date: "April 28, 2026",
    excerpt:
      "Shipping products to a studio? Here's a checklist to make sure your items arrive ready to photograph — no delays, no reshoots.",
  },
  {
    title: "Amazon Product Photography Requirements in 2026",
    date: "April 15, 2026",
    excerpt:
      "Amazon's image guidelines keep evolving. Stay compliant and optimize your listings with the latest technical and creative requirements.",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="mt-4 text-[var(--muted)]">
          Tips, guides, and insights on product visuals for ecommerce
        </p>

        <div className="mt-12 space-y-10">
          {posts.map((post) => (
            <article
              key={post.title}
              className="border-b border-white/[0.06] pb-10"
            >
              <p className="text-xs text-[var(--muted)]">{post.date}</p>
              <h2 className="mt-1 text-lg font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
