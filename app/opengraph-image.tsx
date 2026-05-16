import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'StartSmart Battery & Electrical Qatar';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#111111',
          gap: 24,
        }}
      >
        {/* Accent bar top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, backgroundColor: '#FFD600' }} />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: '2px solid rgba(255,214,0,0.4)',
            borderRadius: 9999,
            padding: '8px 20px',
            fontSize: 18,
            fontWeight: 600,
            color: '#FFD600',
            backgroundColor: 'rgba(255,214,0,0.08)',
          }}
        >
          ⚡ Qatar — 24/7 Service
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 80, fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
            Battery <span style={{ color: '#FFD600' }}>Dead?</span>
          </div>
          <div style={{ fontSize: 52, fontWeight: 800, color: '#FFD600', lineHeight: 1 }}>
            We Come to You
          </div>
        </div>

        {/* Subtext */}
        <div style={{ fontSize: 24, color: '#888888', textAlign: 'center' }}>
          On-demand battery replacement · 30 minutes · 24/7 across Qatar
        </div>

        {/* URL */}
        <div style={{ position: 'absolute', bottom: 32, fontSize: 18, color: '#555555' }}>
          startsmartqatar.com
        </div>

        {/* Accent bar bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 8, backgroundColor: '#FFD600' }} />
      </div>
    ),
    { ...size }
  );
}
