const C = {
  bg: '#f8fafb',
  surface: '#ffffff',
  green: '#1e5c3a',
  greenLight: 'rgba(30,92,58,0.08)',
  greenAccent: '#22c55e',
  border: '#e5e7eb',
  text: '#111827',
  muted: '#6b7280',
  small: '#9ca3af',
  live: '#ef4444',
};

const wrap: React.CSSProperties = {
  width: '100%', height: '100%', background: C.bg,
  display: 'flex', flexDirection: 'column', overflow: 'hidden',
  fontFamily: "'Inter', system-ui, sans-serif",
};

const hdr = (title: string, badge?: string): React.CSSProperties & { _badge?: string; _title?: string } =>
  ({ _title: title, _badge: badge } as any);

import React from 'react';
import pyneLogo from '@/assets/pyne_horizontal_white.png';
import turnierPng from '@/assets/tournaments.png';
import guestMgmtPng from '@/assets/guest_management.png';
import analyticsPng from '@/assets/analytics.png';
import notificationsPng from '@/assets/notifications.png';

/* ── Shared sub-components ── */

const Header = ({ title, badge, badgeLive }: { title: string; badge?: string; badgeLive?: boolean }) => (
  <div style={{ padding: '8px 10px 6px', background: C.surface, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: '6px' }}>
    {badge && (
      <span style={{ fontSize: '6px', fontWeight: 700, letterSpacing: '0.06em', color: badgeLive ? C.live : C.green, background: badgeLive ? 'rgba(239,68,68,0.1)' : C.greenLight, padding: '2px 5px', borderRadius: '3px' }}>
        {badge}
      </span>
    )}
    <span style={{ fontSize: '9px', fontWeight: 600, color: C.text }}>{title}</span>
  </div>
);

const Footer = ({ items }: { items: string[] }) => (
  <div style={{ padding: '5px 10px', background: C.surface, borderTop: `1px solid ${C.border}`, display: 'flex', gap: '10px' }}>
    {items.map(s => <span key={s} style={{ fontSize: '6px', color: C.muted }}>{s}</span>)}
  </div>
);

/* ── Card 0: Gäste-Management ── */
export const GaesteScreen = () => (
  <img src={guestMgmtPng} alt="Gäste-Management" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
);

/* ── Card 1: Live Scoring ── */
export const LiveScoringScreen = () => (
  <img src={turnierPng} alt="Live Scoring" style={{ width: '100%', height: '100%', objectFit: 'fill', display: 'block' }} />
);

/* ── Card 2: Cloud & DSGVO ── */
export const CloudScreen = () => (
  <div style={wrap}>
    <Header title="Cloud & Datenschutz" badge="DSGVO" />
    <div style={{ flex: 1, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {[
        'EU-Hosting (Frankfurt)',
        'DSGVO-konform zertifiziert',
        'SSL / TLS 1.3 Verschlüsselung',
        'Tägliches automatisches Backup',
        'Zwei-Faktor-Authentifizierung',
      ].map(item => (
        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 8px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '5px' }}>
          <span style={{ fontSize: '8px', color: C.greenAccent, fontWeight: 700 }}>✓</span>
          <span style={{ flex: 1, fontSize: '7px', color: C.text }}>{item}</span>
          <span style={{ fontSize: '6px', color: C.green, background: C.greenLight, padding: '1px 4px', borderRadius: '3px' }}>Aktiv</span>
        </div>
      ))}
    </div>
    <div style={{ padding: '6px 10px', background: C.surface, borderTop: `1px solid ${C.border}`, display: 'flex', gap: '8px' }}>
      {[{ v: '99.9%', l: 'Uptime' }, { v: '0', l: 'Incidents' }, { v: 'EU', l: 'Datenstandort' }].map(s => (
        <div key={s.l} style={{ textAlign: 'center' as const }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: C.green }}>{s.v}</div>
          <div style={{ fontSize: '6px', color: C.muted }}>{s.l}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ── Card 2: Erinnerungen & No-Show ── */
export const ErinnerungenScreen = () => (
  <img src={notificationsPng} alt="Erinnerungen" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
);

/* ── Card 3: Echtzeit-Analytics ── */
export const AnalyticsScreen = () => (
  <img src={analyticsPng} alt="Analytics" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
);

/* ── Coming Soon screen ── */
export const ComingSoonScreen = () => (
  <div className="cs-screen">
    <img src={pyneLogo} alt="Pyne" className="cs-logo" />
    <div className="cs-bar-wrap">
      <div className="cs-bar-fill" />
    </div>
    <span className="cs-label">Coming soon</span>
  </div>
);

/* ── Card 5: Offene Integrationen ── */
export const IntegrationenScreen = () => (
  <div style={wrap}>
    <Header title="Verbundene Apps & Integrationen" badge="API" />
    <div style={{ flex: 1, padding: '6px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {[
        { name: 'DATEV Buchhaltung', cat: 'Buchhaltung', on: true },
        { name: 'Golfmanager Access', cat: 'Zugangskontrolle', on: true },
        { name: 'TrackMan Simulator', cat: 'Simulator', on: true },
        { name: 'Stripe Payments', cat: 'Zahlungen', on: true },
        { name: 'Custom Webhook', cat: 'REST API', on: true },
      ].map(app => (
        <div key={app.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 8px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '5px' }}>
          <div style={{ width: '22px', height: '22px', background: C.greenLight, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '8px', color: C.green, fontWeight: 700 }}>{app.name[0]}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '7px', fontWeight: 600, color: C.text }}>{app.name}</div>
            <div style={{ fontSize: '5.5px', color: C.muted }}>{app.cat}</div>
          </div>
          <div style={{ width: '28px', height: '14px', background: C.green, borderRadius: '7px', position: 'relative' as const }}>
            <div style={{ position: 'absolute' as const, right: '2px', top: '2px', width: '10px', height: '10px', background: '#fff', borderRadius: '50%' }} />
          </div>
        </div>
      ))}
    </div>
    <Footer items={['5 Apps verbunden', 'REST API aktiv', 'Keine Gebühren']} />
  </div>
);
