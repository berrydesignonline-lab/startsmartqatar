interface Props {
  query: string;   // e.g. "Al Rayyan, Qatar"
  title: string;   // accessible iframe title, e.g. "Service area map — Al Rayyan"
  heading: string; // visible section heading
  note: string;    // short line under the heading
  rtl?: boolean;
}

/**
 * Lightweight Google Maps embed for a city service area.
 * Uses the keyless `?output=embed` form so no API key/billing is required.
 * Lazy-loaded so it never blocks page render or Core Web Vitals.
 */
export default function CityMap({ query, title, heading, note, rtl }: Props) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=11&output=embed`;
  return (
    <section style={{ padding: '2rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ fontFamily: rtl ? 'var(--font-cairo)' : 'var(--font-inter)', fontWeight: 800, fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)', margin: '0 0 0.5rem', color: 'var(--c-text, #111)' }}>
        {heading}
      </h2>
      <p style={{ fontFamily: rtl ? 'var(--font-cairo)' : 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--c-muted, #555)', margin: '0 0 1rem' }}>
        {note}
      </p>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid var(--c-border, #ddd)' }}>
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          allowFullScreen
        />
      </div>
    </section>
  );
}
