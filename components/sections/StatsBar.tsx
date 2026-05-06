interface Stat {
  number: string;
  label: string;
}

const STATS: Stat[] = [
  { number: '30',       label: 'دقيقة وصول | Min Delivery' },
  { number: '24/7',     label: 'متاحون دائماً | Always Available' },
  { number: 'All Qatar', label: 'تغطية كاملة | Full Coverage' },
];

export default function StatsBar() {
  return (
    <div
      role="region"
      aria-label="Service stats"
      style={{
        backgroundColor: '#FFD600',
        height: '80px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
      }}
    >
      {STATS.map((stat, i) => (
        <div
          key={stat.number}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            borderLeft: i > 0 ? '1px solid rgba(17,17,17,0.2)' : 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 800,
              fontSize: '1.75rem',
              lineHeight: 1,
              color: '#111111',
            }}
          >
            {stat.number}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-cairo), var(--font-inter), sans-serif',
              fontWeight: 400,
              fontSize: '0.75rem',
              lineHeight: 1.3,
              color: '#111111',
              textAlign: 'center',
              padding: '0 0.5rem',
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
