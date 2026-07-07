// Reusable responsive YouTube embed (16:9, privacy-friendly nocookie domain).
// `id` is the 11-char video id from youtu.be/<id> or watch?v=<id>.
export default function YouTubeEmbed({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-[var(--surface)]">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
