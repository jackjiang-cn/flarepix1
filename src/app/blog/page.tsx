import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { blogPosts } from "@/config/blog-posts";

export const metadata: Metadata = {
  title: "Blog — FlarePix",
  description:
    "Tips, guides, and insights on product photography, AI imagery, and ecommerce visuals.",
  alternates: {
    canonical: "https://flarepix.com/blog",
  },
  openGraph: {
    title: "Blog — FlarePix",
    description:
      "Tips, guides, and insights on product photography, AI imagery, and ecommerce visuals.",
    url: "https://flarepix.com/blog",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FlarePix Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — FlarePix",
    description:
      "Tips, guides, and insights on product photography, AI imagery, and ecommerce visuals.",
    images: ["/og-image.jpg"],
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "FlarePix Blog",
  url: "https://flarepix.com/blog",
  description:
    "Tips, guides, and insights on product photography, AI imagery, and ecommerce visuals.",
  publisher: {
    "@type": "Organization",
    name: "FlarePix",
    url: "https://flarepix.com",
  },
  blogPost: blogPosts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    url: `https://flarepix.com/blog/${p.slug}`,
    datePublished: p.date,
    author: { "@type": "Organization", name: p.author },
  })),
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="mt-4 text-[var(--muted)]">
          Tips, guides, and insights on product visuals for ecommerce
        </p>

        <div className="mt-12 space-y-10">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="border-b border-black/[0.08] pb-10"
            >
              <p className="text-xs text-[var(--muted)]">
                {formatDate(post.date)} · {post.readTime}
              </p>
              <h2 className="mt-1 text-lg font-semibold">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-[var(--amber)] transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
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
