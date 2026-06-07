import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaButton from "@/components/cta-button";
import { blogPosts, getPostBySlug, getRelatedPosts, type ContentBlock, type RelatedService } from "@/config/blog-posts";
import { cdnUrl } from "@/config/cdn";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — FlarePix Blog`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    alternates: { canonical: `https://flarepix.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [cdnUrl(post.heroImage)],
    },
  };
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const renderBlock = (block: ContentBlock, i: number) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={i} className="mt-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          {block.text}
        </p>
      );
    case "heading":
      if (block.level === 2) {
        return (
          <h2
            key={i}
            id={block.id}
            className="mt-12 text-2xl font-semibold tracking-tight sm:text-3xl scroll-mt-24"
          >
            {block.text}
          </h2>
        );
      }
      return (
        <h3 key={i} id={block.id} className="mt-8 text-xl font-semibold tracking-tight">
          {block.text}
        </h3>
      );
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          key={i}
          className={`mt-5 space-y-2 text-base text-[var(--muted)] sm:text-lg ${
            block.ordered ? "list-decimal" : "list-disc"
          } pl-6`}
        >
          {block.items.map((item, j) => (
            <li key={j} className="leading-relaxed">
              {item}
            </li>
          ))}
        </Tag>
      );
    }
    case "quote":
      return (
        <blockquote
          key={i}
          className="mt-8 border-l-2 border-[var(--amber)] pl-6 italic text-[var(--foreground)]/90"
        >
          <p className="text-lg leading-relaxed sm:text-xl">"{block.text}"</p>
          {block.cite && (
            <cite className="mt-2 block text-sm not-italic text-[var(--muted)]">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );
    case "video":
      return (
        <video
          key={i}
          controls
          preload="metadata"
          className="mt-6 w-full rounded-xl"
          src={block.src}
          title={block.title}
        />
      );
  }
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const related = getRelatedPosts(slug, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: cdnUrl(post.heroImage),
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      description: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "FlarePix",
      url: "https://flarepix.com",
      logo: {
        "@type": "ImageObject",
        url: "https://media.flarepix.com/logo/flarepix-logo-800.png",
      },
    },
    dateModified: post.date,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://flarepix.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://flarepix.com/blog" },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://flarepix.com/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
        />

        <Link
          href="/blog"
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          &larr; All posts
        </Link>

        <article className="mt-6">
          <header>
            <p className="text-sm text-[var(--muted)]">
              {formatDate(post.date)} · {post.readTime}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-[var(--muted)]">{post.excerpt}</p>
            <p className="mt-4 text-sm text-[var(--muted)]">
              By{" "}
              <span className="font-semibold text-[var(--foreground)]">
                {post.author}
              </span>{" "}
              · {post.authorRole}
            </p>
          </header>

          <div className="mt-10 w-full overflow-hidden rounded-2xl bg-[var(--surface)]">
            <Image
              src={cdnUrl(post.heroImage)}
              alt={post.heroAlt}
              width={1200}
              height={630}
              className="w-full h-auto rounded-2xl"
              priority
            />
          </div>

          <div className="prose-content">
            {post.content.map((block, i) => renderBlock(block, i))}
          </div>

          <div className="mt-16 rounded-2xl border border-black/[0.08] bg-[var(--surface)] p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              About the author
            </p>
            <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
              {post.author}
            </p>
            <p className="text-sm text-[var(--muted)]">{post.authorRole}</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              {post.authorBio}
            </p>
          </div>

          {post.relatedServices.length > 0 && (
            <div className="mt-6 rounded-2xl border border-black/[0.08] bg-[var(--surface)] p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                Related services
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.relatedServices.map((s: RelatedService) => (
                  <Link
                    key={s.href}
                    href={`${s.href}?utm_source=blog&utm_medium=internal_link&utm_content=${post.slug}&utm_campaign=blog_cta`}
                    className="rounded-full border border-black/[0.12] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--amber)] hover:text-[var(--amber)]"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 rounded-2xl border border-black/[0.08] bg-[var(--surface)] p-8 text-center">
            <h2 className="text-xl font-semibold">Need visuals for your products?</h2>
            <p className="mt-2 text-[var(--muted)]">
              We help ecommerce and Amazon brands ship photo, video, and AI imagery fast.
            </p>
            <div className="mt-6">
              <Link
                href={`/contact?utm_source=blog&utm_medium=cta&utm_content=${post.slug}&utm_campaign=blog_cta`}
                className="inline-flex items-center justify-center rounded-lg bg-[var(--amber)] px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-[#a37e4a]"
              >
                Get a quote
              </Link>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="mt-20 border-t border-black/[0.08] pt-12">
            <h2 className="text-xl font-semibold">Related posts</h2>
            <div className="mt-6 space-y-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block"
                >
                  <p className="text-xs text-[var(--muted)]">{formatDate(p.date)}</p>
                  <h3 className="mt-1 text-base font-semibold group-hover:text-[var(--amber)] transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted)] line-clamp-2">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
