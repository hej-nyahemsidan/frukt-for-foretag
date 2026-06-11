/**
 * VideoEmbed - YouTube responsive embed with VideoObject JSON-LD for SEO.
 * Drop on product pages, blog posts and landing pages once videos are uploaded.
 *
 * Usage:
 *   <VideoEmbed
 *     youtubeId="dQw4w9WgXcQ"
 *     title="Så funkar vår fruktkorg på kontoret"
 *     description="Visning av Fruktkorg Original levererad till ett Stockholmskontor."
 *     uploadDate="2026-08-15"
 *   />
 */
interface VideoEmbedProps {
  youtubeId: string;
  title: string;
  description: string;
  /** ISO date string, e.g. "2026-08-15" */
  uploadDate: string;
  /** Optional custom thumbnail URL. Defaults to YouTube hqdefault. */
  thumbnailUrl?: string;
  /** Optional duration in ISO 8601, e.g. "PT1M30S" */
  duration?: string;
}

const VideoEmbed = ({
  youtubeId,
  title,
  description,
  uploadDate,
  thumbnailUrl,
  duration,
}: VideoEmbedProps) => {
  const thumb = thumbnailUrl || `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
  const contentUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description,
    thumbnailUrl: thumb,
    uploadDate,
    contentUrl,
    embedUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Vitaminkorgen',
      logo: {
        '@type': 'ImageObject',
        url: 'https://vitaminkorgen.se/favicon.png',
      },
    },
  };
  if (duration) jsonLd.duration = duration;

  return (
    <div className="my-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative w-full overflow-hidden rounded-2xl shadow-lg" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={embedUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoEmbed;