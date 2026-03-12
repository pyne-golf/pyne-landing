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

/* ── Card 1: Live Scoring ── */
export const LiveScoringScreen = () => (
  <div style={wrap}>
    <Header title="Clubturnier 2024 — Herren HCP 18–36" badge="● LIVE" badgeLive />
    <div style={{ padding: '4px 10px', display: 'flex', gap: '4px', borderBottom: `1px solid ${C.border}`, background: '#f3f4f6' }}>
      {['#', 'Spieler', 'HCP', 'Score'].map((h, i) => (
        <span key={h} style={{ fontSize: '6px', fontWeight: 600, color: C.muted, flex: i === 1 ? 1 : 'none', width: i !== 1 ? '22px' : undefined, textAlign: i > 1 ? 'right' as const : 'left' as const }}>
          {h}
        </span>
      ))}
    </div>
    <div style={{ flex: 1, overflow: 'hidden' }}>
      {[
        { r: 1, name: 'T. Müller', hcp: '12', score: '-4', lead: true },
        { r: 2, name: 'K. Schmidt', hcp: '18', score: '-2' },
        { r: 3, name: 'A. Weber', hcp: '24', score: '±0' },
        { r: 4, name: 'M. Fischer', hcp: '15', score: '+1' },
        { r: 5, name: 'J. Becker', hcp: '21', score: '+2' },
        { r: 6, name: 'P. Lenz', hcp: '9', score: '+3' },
      ].map(p => (
        <div key={p.r} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 10px', background: p.lead ? C.greenLight : 'transparent', borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: '7px', color: p.lead ? C.green : C.muted, fontWeight: 700, width: '22px' }}>{p.r}</span>
          <span style={{ flex: 1, fontSize: '7px', color: C.text, fontWeight: p.lead ? 600 : 400 }}>{p.name}</span>
          <span style={{ fontSize: '6px', color: C.muted, width: '22px', textAlign: 'right' }}>{p.hcp}</span>
          <span style={{ fontSize: '7px', color: p.lead ? C.green : C.text, fontWeight: 700, width: '22px', textAlign: 'right' }}>{p.score}</span>
        </div>
      ))}
    </div>
    <Footer items={['18 Spieler', '9 / 18 Löcher', 'Loch 9 aktiv']} />
  </div>
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

/* ── Card 3: Erinnerungen & No-Show ── */
export const ErinnerungenScreen = () => (
  <div style={wrap}>
    <Header title="Buchungen & Erinnerungen" badge="HEUTE" />
    <div style={{ flex: 1, overflow: 'hidden' }}>
      {[
        { time: '08:30', name: 'T. Müller', status: 'Bestätigt', sent: true },
        { time: '10:00', name: 'K. Schmidt', status: 'Erinnerung gesendet', sent: true },
        { time: '11:30', name: 'A. Weber', status: 'Erinnerung gesendet', sent: true },
        { time: '13:00', name: 'M. Fischer', status: 'Ausstehend', sent: false },
        { time: '14:30', name: 'J. Becker', status: 'Ausstehend', sent: false },
        { time: '16:00', name: 'P. Lenz', status: 'Warteliste', sent: false },
      ].map(b => (
        <div key={b.time} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 10px', borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: '7px', color: C.muted, width: '28px', fontVariantNumeric: 'tabular-nums' }}>{b.time}</span>
          <span style={{ flex: 1, fontSize: '7px', color: C.text, fontWeight: 500 }}>{b.name}</span>
          <span style={{
            fontSize: '6px', padding: '1px 5px', borderRadius: '3px',
            color: b.sent ? C.green : b.status === 'Warteliste' ? '#92400e' : C.muted,
            background: b.sent ? C.greenLight : b.status === 'Warteliste' ? 'rgba(146,64,14,0.08)' : '#f3f4f6',
          }}>
            {b.status}
          </span>
        </div>
      ))}
    </div>
    <Footer items={['6 Buchungen', '3 Erinnerungen gesendet', '0 No-Shows']} />
  </div>
);

/* ── Card 4: Echtzeit-Analytics ── */
export const AnalyticsScreen = () => {
  const bars = [62, 78, 85, 70, 91, 87, 74];
  const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  return (
    <div style={wrap}>
      <Header title="Echtzeit-Analytics" badge="DIESE WOCHE" />
      <div style={{ display: 'flex', gap: '1px', padding: '8px 10px 4px' }}>
        {[
          { v: '87%', l: 'Auslastung', up: true },
          { v: '€ 2.140', l: 'Umsatz heute', up: true },
          { v: '3', l: 'Abwanderungs-Risiko', up: false },
        ].map(s => (
          <div key={s.l} style={{ flex: 1, padding: '6px 8px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '5px', margin: '0 2px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: s.up ? C.green : '#dc2626' }}>{s.v}</div>
            <div style={{ fontSize: '5.5px', color: C.muted, marginTop: '1px' }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: '6px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px' }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <div style={{ width: '100%', height: `${h * 0.6}px`, background: i === 4 ? C.green : C.greenLight, borderRadius: '2px 2px 0 0', transition: 'height 0.3s' }} />
              <span style={{ fontSize: '5.5px', color: C.muted }}>{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <Footer items={['↑ 12% vs. Vorwoche', 'CSV Export', '18 Plätze']} />
    </div>
  );
};

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
