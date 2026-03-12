import { useEffect, useRef, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { translations } from '@/i18n/translations';
import '@/styles/landing.css';
import pyneLogo from '@/assets/pyne_horizontal_white.png';
import pyneIcon from '@/assets/pyne_icon_white.png';

type Lang = 'de' | 'en';

const LandingPage = () => {
  const [lang, setLang] = useState<Lang>('de');
  const [navScrolled, setNavScrolled] = useState(false);
  const [clubEmail, setClubEmail] = useState('');
  const [golferEmail, setGolferEmail] = useState('');
  const [clubMsg, setClubMsg] = useState<{ text: string; type: string }>({ text: '', type: '' });
  const [golferMsg, setGolferMsg] = useState<{ text: string; type: string }>({ text: '', type: '' });
  const [clubLoading, setClubLoading] = useState(false);
  const [golferLoading, setGolferLoading] = useState(false);
  const [activeWl, setActiveWl] = useState<'club' | 'golfer'>('club');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGolferCard, setActiveGolferCard] = useState(0);
  const [activeClubCard, setActiveClubCard] = useState(0);
  const [currentTime, setCurrentTime] = useState(() => {
    const n = new Date();
    return `${n.getHours()}:${String(n.getMinutes()).padStart(2, '0')}`;
  });
  const fadeRefs = useRef<(HTMLElement | null)[]>([]);
  const heroFadeRefs = useRef<(HTMLElement | null)[]>([]);

  const t = useCallback((key: string) => translations[lang]?.[key] || key, [lang]);

  // Nav scroll effect
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // JS-ready class
  useEffect(() => {
    document.documentElement.classList.add('js-ready');
    return () => document.documentElement.classList.remove('js-ready');
  }, []);

  // Live clock
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setCurrentTime(`${n.getHours()}:${String(n.getMinutes()).padStart(2, '0')}`);
    };
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  // Hero fade-in
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        heroFadeRefs.current.forEach(el => el?.classList.add('visible'));
      });
    });
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -56px 0px' }
    );

    fadeRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addFadeRef = (el: HTMLElement | null) => {
    if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el);
  };
  const addHeroFadeRef = (el: HTMLElement | null) => {
    if (el && !heroFadeRefs.current.includes(el)) heroFadeRefs.current.push(el);
  };

  const submitWaitlist = async (type: 'club' | 'golfer') => {
    const isClub = type === 'club';
    const email = isClub ? clubEmail : golferEmail;
    const setMsg = isClub ? setClubMsg : setGolferMsg;
    const setLoading = isClub ? setClubLoading : setGolferLoading;
    const setEmail = isClub ? setClubEmail : setGolferEmail;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg({ text: t('wl-invalid'), type: 'err' });
      return;
    }

    setLoading(true);
    setMsg({ text: '', type: '' });

    try {
      const { error } = await supabase.from('waitlist_signups').insert([{ email, type }]);
      if (error) {
        if (error.code === '23505') {
          setMsg({ text: isClub ? t('wl-clubs-dup') : t('wl-golfers-dup'), type: 'ok' });
        } else {
          throw error;
        }
      } else {
        setEmail('');
        setMsg({ text: isClub ? t('wl-clubs-ok') : t('wl-golfers-ok'), type: 'ok' });
      }
    } catch (err) {
      console.error('[Pyne waitlist]', err);
      setMsg({ text: t('wl-err'), type: 'err' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* NAV */}
      <nav className={`nav ${navScrolled ? 'scrolled' : ''}`} id="nav">
        <div className="nav-inner">
          <a href="#" className="logo" aria-label="Pyne" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img src={pyneLogo} alt="Pyne" className="logo-img" />
          </a>

          <div className="nav-links">
            <a href="#clubs" className="nav-link">{t('nav-clubs')}</a>
            <a href="#golfers" className="nav-link">{t('nav-golfers')}</a>
          </div>

          <div className="nav-right">
            <a href="#waitlist-clubs" className="nav-cta">{t('nav-cta')}</a>

            <div className="lang-toggle">
              <button className={`lang-btn ${lang === 'de' ? 'active' : ''}`} onClick={() => setLang('de')}>DE</button>
              <span className="lang-sep">|</span>
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            </div>
          </div>

          <button
            className="nav-mobile-btn"
            aria-label="Menü"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(o => !o)}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        <div className={`mobile-menu${mobileMenuOpen ? ' mobile-menu--open' : ''}`}>
          <a href="#clubs" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>{t('nav-clubs')}</a>
          <a href="#golfers" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>{t('nav-golfers')}</a>
          <a href="#waitlist-clubs" className="mobile-menu-cta" onClick={() => setMobileMenuOpen(false)}>{t('nav-cta')}</a>
          <div className="mobile-menu-lang">
            <button className={`lang-btn ${lang === 'de' ? 'active' : ''}`} onClick={() => setLang('de')}>DE</button>
            <span className="lang-sep">|</span>
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <svg className="hero-topo" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <radialGradient id="topoFade" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="rgba(13,31,21,0)"/>
              <stop offset="100%" stopColor="rgba(10,26,16,0.97)"/>
            </radialGradient>
          </defs>
          <g stroke="#1E5C3A" strokeWidth="0.8" fill="none" opacity="0.55">
            <path d="M-80,450 C180,370 340,510 560,430 S820,350 1020,468 S1220,388 1520,445"/>
            <path d="M-80,478 C160,398 360,542 580,454 S840,368 1000,496 S1240,410 1520,472"/>
            <path d="M-80,422 C200,342 320,482 540,408 S800,332 1040,440 S1260,366 1520,418"/>
            <path d="M-80,506 C140,428 380,574 600,478 S862,382 980,524 S1260,432 1520,498"/>
            <path d="M-80,394 C220,314 300,454 520,386 S780,314 1060,412 S1280,344 1520,390"/>
            <path d="M-80,534 C120,458 400,606 620,502 S884,404 960,552 S1280,454 1520,524"/>
            <path d="M-80,366 C240,286 280,426 500,364 S760,296 1080,384 S1300,322 1520,362"/>
            <path d="M-80,562 C100,488 420,638 640,526 S906,426 940,580 S1300,476 1520,550"/>
            <path d="M-80,340 C260,260 260,400 480,342 S740,278 1100,356 S1320,300 1520,334"/>
            <path d="M-80,590 C80,518 440,670 660,550 S928,448 920,608 S1320,498 1520,576"/>
            <path d="M-80,312 C280,232 240,374 460,318 S720,260 1120,328 S1340,278 1520,306"/>
            <path d="M-80,618 C60,548 460,702 680,574 S950,470 900,636 S1340,520 1520,602"/>
            <path d="M-80,284 C300,204 220,348 440,294 S700,242 1140,300 S1360,256 1520,278"/>
            <path d="M-80,646 C40,578 480,734 700,598 S972,492 880,664 S1360,542 1520,628"/>
            <path d="M-80,256 C320,176 200,322 420,270 S680,224 1160,272 S1380,234 1520,250"/>
          </g>
          <g stroke="#1E5C3A" strokeWidth="0.5" fill="none" opacity="0.25">
            <path d="M280,-40 C310,120 290,300 318,480 S298,660 285,900"/>
            <path d="M560,-40 C590,130 570,310 598,490 S578,670 565,900"/>
            <path d="M840,-40 C870,140 850,320 878,500 S858,680 845,900"/>
            <path d="M1120,-40 C1150,150 1130,330 1158,510 S1138,690 1125,900"/>
          </g>
          <rect x="0" y="0" width="1440" height="900" fill="url(#topoFade)" opacity="0.6"/>
        </svg>

        <div className="hero-glow"></div>

        <div className="hero-content">
          <div className="hero-badge fade d1" ref={addHeroFadeRef}>
            <span className="badge-dot"></span>
            <span>{t('hero-badge')}</span>
          </div>

          <h1 className="hero-h1 fade d2" ref={addHeroFadeRef} dangerouslySetInnerHTML={{ __html: t('hero-h1') }} />

          <p className="hero-sub fade d3" ref={addHeroFadeRef}>
            {t('hero-sub')}
          </p>

          <div className="hero-ctas fade d4" ref={addHeroFadeRef}>
            <button type="button" className="btn btn-green" onClick={() => { setActiveWl('club'); document.getElementById('waitlist-clubs')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span>{t('cta-club')}</span>
              <svg className="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button type="button" className="btn btn-outline-white" onClick={() => { setActiveWl('golfer'); document.getElementById('waitlist-clubs')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span>{t('cta-golfer')}</span>
              <svg className="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="hero-scroll" aria-hidden="true">
          <div className="scroll-track"></div>
          <span>Weiter</span>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem pyne-section">
        <div className="container">
          <div className="problem-intro fade" ref={addFadeRef}>
            <div className="eyebrow" style={{ color: 'var(--muted)' }}>{t('problem-eyebrow')}</div>
            <h2 className="section-h2" dangerouslySetInnerHTML={{ __html: t('problem-h2') }} />
          </div>

          <div className="problem-cols">
            <div className="problem-col fade" ref={addFadeRef}>
              <span className="problem-tag clubs">{t('problem-club-tag')}</span>
              <h3 className="problem-h3">{t('problem-club-h3')}</h3>
              <p className="problem-body">{t('problem-club-body')}</p>
            </div>

            <div className="problem-divider-v"></div>

            <div className="problem-col fade d2" ref={addFadeRef}>
              <span className="problem-tag golfers">{t('problem-golfer-tag')}</span>
              <h3 className="problem-h3">{t('problem-golfer-h3')}</h3>
              <p className="problem-body">{t('problem-golfer-body')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="solution">
        <div className="solution-noise"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="eyebrow fade" ref={addFadeRef} style={{ color: 'rgba(255,255,255,0.45)' }}>{t('solution-eyebrow')}</div>
          <h2 className="solution-h2 fade d1" ref={addFadeRef} dangerouslySetInnerHTML={{ __html: t('solution-h2') }} />
          <p className="solution-sub fade d2" ref={addFadeRef}>{t('solution-sub')}</p>
        </div>
      </section>

      {/* FOR CLUBS */}
      <section className="clubs-section pyne-section" id="clubs">
        <div className="container">
          <div className="clubs-split">

            {/* LEFT: 3D iMac */}
            <div className="clubs-left fade" ref={addFadeRef}>
              <div className="imac-ambient"></div>
              <div className="imac-scene">
                <div className="imac-wrapper">
                  <div className="imac-monitor">
                    <div className="imac-glare"></div>
                    <div className="imac-cam"></div>
                    <div className="imac-screen">
                      <div className="imac-dashboard">

                        {/* Persistent top bar */}
                        <div className="idb-topbar">
                          <div className="idb-brand">pyne</div>
                          <div className="idb-stats-bar">
                            <div className="idb-stat-item"><span className="idb-val">74</span><span className="idb-lbl">Runden heute</span></div>
                            <div className="idb-stat-sep"></div>
                            <div className="idb-stat-item"><span className="idb-val">812</span><span className="idb-lbl">Mitglieder</span></div>
                            <div className="idb-stat-sep"></div>
                            <div className="idb-stat-item"><span className="idb-val">€ 18.4k</span><span className="idb-lbl">Monatsumsatz</span></div>
                          </div>
                        </div>

                        {/* Body: persistent sidebar + switching screens */}
                        <div className="idb-body">
                          <div className="idb-sidebar">
                            {['Startzeiten','Zahlungen','Analytics','Engagement','Buchungen','Integrationen'].map((label, i) => (
                              <div key={i} className={`idb-nav${activeClubCard === i ? ' idb-nav-active' : ''}`}>{label}</div>
                            ))}
                          </div>
                          <div className="idb-screens">

                            {/* Screen 0: Tee Sheet */}
                            <div className={`cds-screen${activeClubCard === 0 ? ' cds-visible' : ''}`}>
                              <div className="idb-sheet-days">
                                <div className="idb-time-head"></div>
                                {['Mo','Di','Mi','Do','Fr','Sa','So'].map(d => <div key={d} className="idb-day-head">{d}</div>)}
                              </div>
                              {([
                                ['06:00',[0,0,1,0,0,2,1]],
                                ['07:00',[1,2,1,0,1,3,2]],
                                ['08:00',[2,1,3,1,2,3,3]],
                                ['09:00',[3,2,3,2,3,3,3]],
                                ['10:00',[2,3,2,3,2,3,2]],
                                ['11:00',[1,2,1,2,1,3,2]],
                                ['12:00',[0,1,0,1,1,2,1]],
                                ['13:00',[1,0,1,0,2,3,2]],
                              ] as [string, number[]][]).map(([time, slots]) => (
                                <div key={time} className="idb-sheet-row">
                                  <div className="idb-time-label">{time}</div>
                                  {slots.map((lvl, idx) => <div key={idx} className={`idb-cell idb-cell-${lvl}`}></div>)}
                                </div>
                              ))}
                            </div>

                            {/* Screen 1: Payments */}
                            <div className={`cds-screen${activeClubCard === 1 ? ' cds-visible' : ''}`}>
                              <div className="cds-section-title">Zahlungsübersicht</div>
                              <div className="cds-bar-chart">
                                {([55,72,61,88,79,95] as number[]).map((h, i) => (
                                  <div key={i} className="cds-bar-col">
                                    <div className="cds-bar" style={{ height: `${h}%` }}></div>
                                    <div className="cds-bar-lbl">{['Okt','Nov','Dez','Jan','Feb','Mär'][i]}</div>
                                  </div>
                                ))}
                              </div>
                              <div className="cds-tx-list">
                                {([
                                  {name:'M. Richter', amt:'€ 420', tag:'Mitglied', ok:true},
                                  {name:'T. Hoffmann', amt:'€ 85', tag:'Greenfee', ok:true},
                                  {name:'K. Wagner', amt:'€ 210', tag:'Pro Shop', ok:true},
                                  {name:'H. Bauer', amt:'€ 420', tag:'Mitglied', ok:false},
                                ]).map((r, i) => (
                                  <div key={i} className="cds-tx-row">
                                    <div className="cds-tx-av">{r.name.split(' ').map((n: string) => n[0]).join('')}</div>
                                    <div className="cds-tx-info">
                                      <span className="cds-tx-name">{r.name}</span>
                                      <span className="cds-tx-tag">{r.tag}</span>
                                    </div>
                                    <div className="cds-tx-amt">{r.amt}</div>
                                    <div className={`cds-tx-status${r.ok ? ' cds-ok' : ' cds-pend'}`}>{r.ok ? '✓' : '···'}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Screen 2: Analytics */}
                            <div className={`cds-screen${activeClubCard === 2 ? ' cds-visible' : ''}`}>
                              <div className="cds-kpi-grid">
                                <div className="cds-kpi"><span className="cds-kpi-val">€ 18.4k</span><span className="cds-kpi-lbl">Umsatz</span><span className="cds-kpi-delta cds-up">↑ 12%</span></div>
                                <div className="cds-kpi"><span className="cds-kpi-val">87%</span><span className="cds-kpi-lbl">Auslastung</span><span className="cds-kpi-delta cds-up">↑ 5%</span></div>
                                <div className="cds-kpi"><span className="cds-kpi-val">14</span><span className="cds-kpi-lbl">Neue Mitgl.</span><span className="cds-kpi-delta cds-up">↑ 3</span></div>
                                <div className="cds-kpi"><span className="cds-kpi-val">2.1%</span><span className="cds-kpi-lbl">No-Show</span><span className="cds-kpi-delta cds-dn">↓ 0.4%</span></div>
                              </div>
                              <div className="cds-sparkline">
                                <svg viewBox="0 0 220 64" preserveAspectRatio="none" style={{ width: '100%', height: '64px' }}>
                                  <defs>
                                    <linearGradient id="sgr" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#34d399" stopOpacity="0.3"/>
                                      <stop offset="100%" stopColor="#34d399" stopOpacity="0"/>
                                    </linearGradient>
                                  </defs>
                                  <path d="M0,52 C30,46 50,40 75,32 S115,20 145,15 S185,10 220,6" stroke="#34d399" strokeWidth="1.5" fill="none"/>
                                  <path d="M0,52 C30,46 50,40 75,32 S115,20 145,15 S185,10 220,6 L220,64 L0,64Z" fill="url(#sgr)"/>
                                </svg>
                              </div>
                            </div>

                            {/* Screen 3: Engagement */}
                            <div className={`cds-screen${activeClubCard === 3 ? ' cds-visible' : ''}`}>
                              <div className="cds-section-title">Mitglieder-Engagement</div>
                              <div className="cds-eng-stats">
                                <div className="cds-eng-stat"><span className="cds-eng-val">847</span><span className="cds-eng-lbl">Pushes versendet</span></div>
                                <div className="cds-eng-stat"><span className="cds-eng-val">91%</span><span className="cds-eng-lbl">Öffnungsrate</span></div>
                                <div className="cds-eng-stat"><span className="cds-eng-val">23</span><span className="cds-eng-lbl">Jetzt aktiv</span></div>
                              </div>
                              <div className="cds-notif-list">
                                {([
                                  {msg:'Tee-Time Erinnerung — Sa 08:30', time:'Heute'},
                                  {msg:'Turnier: Clubmeisterschaft offen', time:'Gestern'},
                                  {msg:'Neue Zahlungsmethode verfügbar', time:'Mo'},
                                  {msg:'Saisonkarte verlängert', time:'So'},
                                ]).map((n, i) => (
                                  <div key={i} className="cds-notif-row">
                                    <div className="cds-notif-dot"></div>
                                    <span className="cds-notif-msg">{n.msg}</span>
                                    <span className="cds-notif-time">{n.time}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Screen 4: Booking Management */}
                            <div className={`cds-screen${activeClubCard === 4 ? ' cds-visible' : ''}`}>
                              <div className="cds-section-title">Buchungen — Heute</div>
                              <div className="cds-booking-list">
                                {([
                                  {time:'07:00', name:'A. Müller', holes:'18 Loch', status:'Eingecheckt'},
                                  {time:'07:14', name:'B. Schmidt', holes:'9 Loch', status:'Eingecheckt'},
                                  {time:'08:00', name:'C. Becker', holes:'18 Loch', status:'Bestätigt'},
                                  {time:'08:28', name:'D. Fischer', holes:'18 Loch', status:'Bestätigt'},
                                  {time:'09:00', name:'E. Meyer', holes:'9 Loch', status:'Ausstehend'},
                                ]).map((b, i) => (
                                  <div key={i} className="cds-booking-row">
                                    <span className="cds-bk-time">{b.time}</span>
                                    <span className="cds-bk-name">{b.name}</span>
                                    <span className="cds-bk-holes">{b.holes}</span>
                                    <span className={`cds-bk-chip${b.status === 'Eingecheckt' ? ' chip-in' : b.status === 'Bestätigt' ? ' chip-ok' : ' chip-pend'}`}>{b.status}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Screen 5: Integrations */}
                            <div className={`cds-screen${activeClubCard === 5 ? ' cds-visible' : ''}`}>
                              <div className="cds-section-title">Integrationen</div>
                              <div className="cds-int-grid">
                                {([
                                  {name:'Stripe', lbl:'Zahlungen', on:true},
                                  {name:'DGV', lbl:'Handicap', on:true},
                                  {name:'Lexware', lbl:'Buchhaltung', on:true},
                                  {name:'KABA', lbl:'Zugang', on:true},
                                  {name:'Golf Post', lbl:'Medien', on:false},
                                  {name:'Trackman', lbl:'Simulator', on:false},
                                ]).map((it, i) => (
                                  <div key={i} className={`cds-int-tile${it.on ? ' int-on' : ''}`}>
                                    <div className="cds-int-logo">{it.name.slice(0, 2).toUpperCase()}</div>
                                    <div className="cds-int-name">{it.name}</div>
                                    <div className="cds-int-lbl">{it.lbl}</div>
                                    <div className={`cds-int-dot${it.on ? ' int-dot-on' : ''}`}></div>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="imac-neck"></div>
                  <div className="imac-base"></div>
                </div>
              </div>

              {/* MacBook — same cloud content, cloud-native proof */}
              <div className="macbook-float">
                <div className="macbook-wrapper">
                  <div className="macbook-lid">
                    <div className="macbook-cam"></div>
                    <div className="macbook-screen">
                      <div className="macbook-db-scale">
                        <div className="imac-dashboard">
                          <div className="idb-topbar">
                            <div className="idb-brand">pyne</div>
                            <div className="idb-stats-bar">
                              <div className="idb-stat-item"><span className="idb-val">74</span><span className="idb-lbl">Runden heute</span></div>
                              <div className="idb-stat-sep"></div>
                              <div className="idb-stat-item"><span className="idb-val">812</span><span className="idb-lbl">Mitglieder</span></div>
                              <div className="idb-stat-sep"></div>
                              <div className="idb-stat-item"><span className="idb-val">€ 18.4k</span><span className="idb-lbl">Monatsumsatz</span></div>
                            </div>
                          </div>
                          <div className="idb-body">
                            <div className="idb-sidebar">
                              {['Startzeiten','Zahlungen','Analytics','Engagement','Buchungen','Integrationen'].map((label, i) => (
                                <div key={i} className={`idb-nav${activeClubCard === i ? ' idb-nav-active' : ''}`}>{label}</div>
                              ))}
                            </div>
                            <div className="idb-screens">
                              <div className={`cds-screen${activeClubCard === 0 ? ' cds-visible' : ''}`}>
                                <div className="idb-sheet-days">
                                  <div className="idb-time-head"></div>
                                  {['Mo','Di','Mi','Do','Fr','Sa','So'].map(d => <div key={`mb-${d}`} className="idb-day-head">{d}</div>)}
                                </div>
                                {(['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00'] as string[]).map((time, ri) => (
                                  <div key={`mb-r${ri}`} className="idb-sheet-row">
                                    <div className="idb-time-label">{time}</div>
                                    {([[0,0,1,0,0,2,1],[1,2,1,0,1,3,2],[2,1,3,1,2,3,3],[3,2,3,2,3,3,3],[2,3,2,3,2,3,2],[1,2,1,2,1,3,2],[0,1,0,1,1,2,1],[1,0,1,0,2,3,2]] as number[][])[ri].map((lvl, ci) => (
                                      <div key={ci} className={`idb-cell idb-cell-${lvl}`}></div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                              <div className={`cds-screen${activeClubCard === 1 ? ' cds-visible' : ''}`}>
                                <div className="cds-section-title">Zahlungsübersicht</div>
                                <div className="cds-bar-chart">
                                  {([55,72,61,88,79,95] as number[]).map((h, i) => (
                                    <div key={i} className="cds-bar-col"><div className="cds-bar" style={{ height: `${h}%` }}></div><div className="cds-bar-lbl">{['Okt','Nov','Dez','Jan','Feb','Mär'][i]}</div></div>
                                  ))}
                                </div>
                                <div className="cds-tx-list">
                                  {([{name:'M. Richter',amt:'€ 420',tag:'Mitglied',ok:true},{name:'T. Hoffmann',amt:'€ 85',tag:'Greenfee',ok:true},{name:'K. Wagner',amt:'€ 210',tag:'Pro Shop',ok:true},{name:'H. Bauer',amt:'€ 420',tag:'Mitglied',ok:false}]).map((r,i) => (
                                    <div key={i} className="cds-tx-row"><div className="cds-tx-av">{r.name.split(' ').map((n:string)=>n[0]).join('')}</div><div className="cds-tx-info"><span className="cds-tx-name">{r.name}</span><span className="cds-tx-tag">{r.tag}</span></div><div className="cds-tx-amt">{r.amt}</div><div className={`cds-tx-status${r.ok?' cds-ok':' cds-pend'}`}>{r.ok?'✓':'···'}</div></div>
                                  ))}
                                </div>
                              </div>
                              <div className={`cds-screen${activeClubCard === 2 ? ' cds-visible' : ''}`}>
                                <div className="cds-kpi-grid">
                                  <div className="cds-kpi"><span className="cds-kpi-val">€ 18.4k</span><span className="cds-kpi-lbl">Umsatz</span><span className="cds-kpi-delta cds-up">↑ 12%</span></div>
                                  <div className="cds-kpi"><span className="cds-kpi-val">87%</span><span className="cds-kpi-lbl">Auslastung</span><span className="cds-kpi-delta cds-up">↑ 5%</span></div>
                                  <div className="cds-kpi"><span className="cds-kpi-val">14</span><span className="cds-kpi-lbl">Neue Mitgl.</span><span className="cds-kpi-delta cds-up">↑ 3</span></div>
                                  <div className="cds-kpi"><span className="cds-kpi-val">2.1%</span><span className="cds-kpi-lbl">No-Show</span><span className="cds-kpi-delta cds-dn">↓ 0.4%</span></div>
                                </div>
                                <div className="cds-sparkline">
                                  <svg viewBox="0 0 220 64" preserveAspectRatio="none" style={{ width: '100%', height: '64px' }}>
                                    <defs><linearGradient id="sgr2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#34d399" stopOpacity="0.3"/><stop offset="100%" stopColor="#34d399" stopOpacity="0"/></linearGradient></defs>
                                    <path d="M0,52 C30,46 50,40 75,32 S115,20 145,15 S185,10 220,6" stroke="#34d399" strokeWidth="1.5" fill="none"/>
                                    <path d="M0,52 C30,46 50,40 75,32 S115,20 145,15 S185,10 220,6 L220,64 L0,64Z" fill="url(#sgr2)"/>
                                  </svg>
                                </div>
                              </div>
                              <div className={`cds-screen${activeClubCard === 3 ? ' cds-visible' : ''}`}>
                                <div className="cds-section-title">Mitglieder-Engagement</div>
                                <div className="cds-eng-stats">
                                  <div className="cds-eng-stat"><span className="cds-eng-val">847</span><span className="cds-eng-lbl">Pushes versendet</span></div>
                                  <div className="cds-eng-stat"><span className="cds-eng-val">91%</span><span className="cds-eng-lbl">Öffnungsrate</span></div>
                                  <div className="cds-eng-stat"><span className="cds-eng-val">23</span><span className="cds-eng-lbl">Jetzt aktiv</span></div>
                                </div>
                                <div className="cds-notif-list">
                                  {([{msg:'Tee-Time Erinnerung — Sa 08:30',time:'Heute'},{msg:'Turnier: Clubmeisterschaft offen',time:'Gestern'},{msg:'Neue Zahlungsmethode verfügbar',time:'Mo'},{msg:'Saisonkarte verlängert',time:'So'}]).map((n,i)=>(
                                    <div key={i} className="cds-notif-row"><div className="cds-notif-dot"></div><span className="cds-notif-msg">{n.msg}</span><span className="cds-notif-time">{n.time}</span></div>
                                  ))}
                                </div>
                              </div>
                              <div className={`cds-screen${activeClubCard === 4 ? ' cds-visible' : ''}`}>
                                <div className="cds-section-title">Buchungen — Heute</div>
                                <div className="cds-booking-list">
                                  {([{time:'07:00',name:'A. Müller',holes:'18 Loch',status:'Eingecheckt'},{time:'07:14',name:'B. Schmidt',holes:'9 Loch',status:'Eingecheckt'},{time:'08:00',name:'C. Becker',holes:'18 Loch',status:'Bestätigt'},{time:'08:28',name:'D. Fischer',holes:'18 Loch',status:'Bestätigt'},{time:'09:00',name:'E. Meyer',holes:'9 Loch',status:'Ausstehend'}]).map((b,i)=>(
                                    <div key={i} className="cds-booking-row"><span className="cds-bk-time">{b.time}</span><span className="cds-bk-name">{b.name}</span><span className="cds-bk-holes">{b.holes}</span><span className={`cds-bk-chip${b.status==='Eingecheckt'?' chip-in':b.status==='Bestätigt'?' chip-ok':' chip-pend'}`}>{b.status}</span></div>
                                  ))}
                                </div>
                              </div>
                              <div className={`cds-screen${activeClubCard === 5 ? ' cds-visible' : ''}`}>
                                <div className="cds-section-title">Integrationen</div>
                                <div className="cds-int-grid">
                                  {([{name:'Stripe',lbl:'Zahlungen',on:true},{name:'DGV',lbl:'Handicap',on:true},{name:'Lexware',lbl:'Buchhaltung',on:true},{name:'KABA',lbl:'Zugang',on:true},{name:'Golf Post',lbl:'Medien',on:false},{name:'Trackman',lbl:'Simulator',on:false}]).map((it,i)=>(
                                    <div key={i} className={`cds-int-tile${it.on?' int-on':''}`}><div className="cds-int-logo">{it.name.slice(0,2).toUpperCase()}</div><div className="cds-int-name">{it.name}</div><div className="cds-int-lbl">{it.lbl}</div><div className={`cds-int-dot${it.on?' int-dot-on':''}`}></div></div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="macbook-hinge"></div>
                  <div className="macbook-base"></div>
                </div>
              </div>
            </div>

            {/* RIGHT: Header + Feature cards */}
            <div className="clubs-right">
              <div className="clubs-header fade d1" ref={addFadeRef}>
                <div className="eyebrow" style={{ color: 'var(--green)' }}>{t('clubs-eyebrow')}</div>
                <h2 className="section-h2">{t('clubs-h2')}</h2>
                <p className="section-lead">{t('clubs-lead')}</p>
              </div>

              <div className="cfc-grid fade d2" ref={addFadeRef}>
                <div className={`cfc-card${activeClubCard === 0 ? ' cfc-active' : ''}`} onMouseEnter={() => setActiveClubCard(0)}>
                  <div className="cfc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/><path d="M8 15l2.5 2.5L16 12"/></svg></div>
                  <div className="cfc-title">{t('c1-title')}</div>
                  <div className="cfc-desc">{t('c1-desc')}</div>
                </div>
                <div className={`cfc-card${activeClubCard === 1 ? ' cfc-active' : ''}`} onMouseEnter={() => setActiveClubCard(1)}>
                  <div className="cfc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 11h20"/><path d="M6.5 16l2.5 2.5 5-5"/></svg></div>
                  <div className="cfc-title">{t('c2-title')}</div>
                  <div className="cfc-desc">{t('c2-desc')}</div>
                </div>
                <div className={`cfc-card${activeClubCard === 2 ? ' cfc-active' : ''}`} onMouseEnter={() => setActiveClubCard(2)}>
                  <div className="cfc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="2,13 5,13 7.5,6 10.5,19 13.5,10 15.5,15 18,13 22,13"/></svg></div>
                  <div className="cfc-title">{t('c3-title')}</div>
                  <div className="cfc-desc">{t('c3-desc')}</div>
                </div>
                <div className={`cfc-card${activeClubCard === 3 ? ' cfc-active' : ''}`} onMouseEnter={() => setActiveClubCard(3)}>
                  <div className="cfc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/><circle cx="18.5" cy="3.5" r="2.5"/></svg></div>
                  <div className="cfc-title">{t('c4-title')}</div>
                  <div className="cfc-desc">{t('c4-desc')}</div>
                </div>
                <div className={`cfc-card${activeClubCard === 4 ? ' cfc-active' : ''}`} onMouseEnter={() => setActiveClubCard(4)}>
                  <div className="cfc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/><path d="M8 15l2.5 2.5L16 12"/></svg></div>
                  <div className="cfc-title">{t('c5-title')}</div>
                  <div className="cfc-desc">{t('c5-desc')}</div>
                </div>
                <div className={`cfc-card${activeClubCard === 5 ? ' cfc-active' : ''}`} onMouseEnter={() => setActiveClubCard(5)}>
                  <div className="cfc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path d="M5.8 7.2L10.1 10.6M18.2 7.2L13.9 10.6M5.8 16.8L10.1 13.4M18.2 16.8L13.9 13.4"/></svg></div>
                  <div className="cfc-title">{t('c6-title')}</div>
                  <div className="cfc-desc">{t('c6-desc')}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOR GOLFERS */}
      <section className="golfers-section pyne-section" id="golfers">
        <div className="container">
          <div className="golfers-split">

            {/* LEFT: Header + Feature cards */}
            <div className="golfers-left">
              <div className="golfers-header fade" ref={addFadeRef}>
                <div className="eyebrow" style={{ color: 'var(--green)' }}>{t('golfers-eyebrow')}</div>
                <h2 className="section-h2">{t('golfers-h2')}</h2>
                <p className="section-lead">{t('golfers-lead')}</p>
              </div>

              <div className="golfer-feature-list fade d1" ref={addFadeRef}>
                {/* Card 0: Sofortbuchung */}
                <div
                  className={`golfer-feature-card${activeGolferCard === 0 ? ' gfc-active' : ''}`}
                  onMouseEnter={() => setActiveGolferCard(0)}
                >
                  <div className="gfc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="17" rx="2"/>
                      <path d="M8 2v4M16 2v4M3 10h18"/>
                      <path d="M8 15l2.5 2.5L16 12"/>
                    </svg>
                  </div>
                  <div className="gfc-body">
                    <div className="gfc-title">{t('g1-title')}</div>
                    <div className="gfc-desc">{t('g1-desc')}</div>
                  </div>
                  <div className="gfc-arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>

                {/* Card 1: Digitales Spielerprofil */}
                <div
                  className={`golfer-feature-card${activeGolferCard === 1 ? ' gfc-active' : ''}`}
                  onMouseEnter={() => setActiveGolferCard(1)}
                >
                  <div className="gfc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    </svg>
                  </div>
                  <div className="gfc-body">
                    <div className="gfc-title">{t('g2-title')}</div>
                    <div className="gfc-desc">{t('g2-desc')}</div>
                  </div>
                  <div className="gfc-arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>

                {/* Card 2: Turniere & Events */}
                <div
                  className={`golfer-feature-card${activeGolferCard === 2 ? ' gfc-active' : ''}`}
                  onMouseEnter={() => setActiveGolferCard(2)}
                >
                  <div className="gfc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 4h10v5a5 5 0 01-10 0V4z"/>
                      <path d="M5 4H3a2 2 0 000 4c0 2 1.5 3.5 4 4.5"/>
                      <path d="M19 4h2a2 2 0 010 4c0 2-1.5 3.5-4 4.5"/>
                      <path d="M10 17v1a2 2 0 004 0v-1"/>
                      <path d="M7.5 21h9"/>
                    </svg>
                  </div>
                  <div className="gfc-body">
                    <div className="gfc-title">{t('g3-title')}</div>
                    <div className="gfc-desc">{t('g3-desc')}</div>
                  </div>
                  <div className="gfc-arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>

                {/* Card 3: Community */}
                <div
                  className={`golfer-feature-card${activeGolferCard === 3 ? ' gfc-active' : ''}`}
                  onMouseEnter={() => setActiveGolferCard(3)}
                >
                  <div className="gfc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="9" cy="7" r="3"/>
                      <circle cx="17" cy="9" r="2.5"/>
                      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6"/>
                      <path d="M17 12c2.5 0 5 1.8 5 4"/>
                    </svg>
                  </div>
                  <div className="gfc-body">
                    <div className="gfc-title">{t('g4-title')}</div>
                    <div className="gfc-desc">{t('g4-desc')}</div>
                  </div>
                  <div className="gfc-arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: 3D Phone mockup */}
            <div className="golfers-right fade d2" ref={addFadeRef}>
              <div className={`phone-ambient phone-ambient-${activeGolferCard}`}></div>
              <div className="phone-scene">
                <div className="phone-frame">
                  <div className="phone-btn-vol-up"></div>
                  <div className="phone-btn-vol-down"></div>
                  <div className="phone-btn-power"></div>
                  <div className="phone-dynamic-island"></div>
                  <div className="phone-screen">

                    {/* Screen 0: Instant Booking */}
                    <div className={`pscreen pscreen-0${activeGolferCard === 0 ? ' pscreen-visible' : ''}`}>
                      <div className="ps-statusbar">
                        <span>{currentTime}</span>
                        <span className="ps-sb-icons">
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor"><rect x="0" y="3" width="2" height="7" rx="0.5"/><rect x="3" y="2" width="2" height="8" rx="0.5"/><rect x="6" y="0" width="2" height="10" rx="0.5"/><rect x="9" y="1" width="2" height="9" rx="0.5"/></svg>
                          <svg width="22" height="12" viewBox="0 0 22 12" fill="none"><rect x="0.5" y="0.5" width="18" height="11" rx="2.5" stroke="currentColor" strokeOpacity="0.45"/><rect x="1.5" y="1.5" width="16" height="9" rx="1.5" fill="currentColor"/><path d="M20 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </span>
                      </div>
                      <div className="ps-body">
                        <div className="ps-eyebrow">Montag, 12. März</div>
                        <div className="ps-title">Tee-Times</div>
                        <div className="ps-dates">
                          <div className="ps-date-chip">Mo<br/><strong>12</strong></div>
                          <div className="ps-date-chip ps-date-active">Di<br/><strong>13</strong></div>
                          <div className="ps-date-chip">Mi<br/><strong>14</strong></div>
                          <div className="ps-date-chip">Do<br/><strong>15</strong></div>
                        </div>
                        <div className="ps-avail-label">
                          <span className="ps-dot-green"></span>8 verfügbar
                        </div>
                        <div className="ps-slots">
                          <div className="ps-slot ps-slot-avail">08:00</div>
                          <div className="ps-slot ps-slot-taken">08:30</div>
                          <div className="ps-slot ps-slot-avail">09:00</div>
                          <div className="ps-slot ps-slot-avail">09:30</div>
                          <div className="ps-slot ps-slot-avail ps-slot-sel">10:00 ✓</div>
                          <div className="ps-slot ps-slot-taken">10:30</div>
                        </div>
                        <div className="ps-course-row">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.69 2 6 4.69 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6z"/></svg>
                          Golfclub München · Hole 1–18
                        </div>
                        <div className="ps-cta-btn">Jetzt buchen →</div>
                      </div>
                    </div>

                    {/* Screen 1: Player Profile */}
                    <div className={`pscreen pscreen-1${activeGolferCard === 1 ? ' pscreen-visible' : ''}`}>
                      <div className="ps-statusbar ps-statusbar-light">
                        <span>{currentTime}</span>
                        <span className="ps-sb-icons">
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor"><rect x="0" y="3" width="2" height="7" rx="0.5"/><rect x="3" y="2" width="2" height="8" rx="0.5"/><rect x="6" y="0" width="2" height="10" rx="0.5"/><rect x="9" y="1" width="2" height="9" rx="0.5"/></svg>
                          <svg width="22" height="12" viewBox="0 0 22 12" fill="none"><rect x="0.5" y="0.5" width="18" height="11" rx="2.5" stroke="currentColor" strokeOpacity="0.45"/><rect x="1.5" y="1.5" width="16" height="9" rx="1.5" fill="currentColor"/><path d="M20 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </span>
                      </div>
                      <div className="ps-body ps-body-profile">
                        <div className="ps-avatar">MM</div>
                        <div className="ps-profile-name">Max Müller</div>
                        <div className="ps-hcp-badge">HCP 12.4</div>
                        <div className="ps-stats-row">
                          <div className="ps-stat"><div className="ps-stat-val">48</div><div className="ps-stat-lbl">Runden</div></div>
                          <div className="ps-stat-div"></div>
                          <div className="ps-stat"><div className="ps-stat-val">61%</div><div className="ps-stat-lbl">GIR</div></div>
                          <div className="ps-stat-div"></div>
                          <div className="ps-stat"><div className="ps-stat-val">32</div><div className="ps-stat-lbl">Putts</div></div>
                        </div>
                        <div className="ps-rounds-label">Letzte Runden</div>
                        <div className="ps-round-row"><span>GC München</span><span className="ps-score ps-score-pos">+2</span></div>
                        <div className="ps-round-row"><span>GC Hamburg</span><span className="ps-score ps-score-even">E</span></div>
                        <div className="ps-round-row"><span>GC Berlin</span><span className="ps-score ps-score-neg">-1</span></div>
                        <div className="ps-clubs-row">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.69 2 6 4.69 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6z"/></svg>
                          Überall verfügbar · 3 Clubs verbunden
                        </div>
                      </div>
                    </div>

                    {/* Screen 2: Tournaments */}
                    <div className={`pscreen pscreen-2${activeGolferCard === 2 ? ' pscreen-visible' : ''}`}>
                      <div className="ps-statusbar">
                        <span>{currentTime}</span>
                        <span className="ps-sb-icons">
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor"><rect x="0" y="3" width="2" height="7" rx="0.5"/><rect x="3" y="2" width="2" height="8" rx="0.5"/><rect x="6" y="0" width="2" height="10" rx="0.5"/><rect x="9" y="1" width="2" height="9" rx="0.5"/></svg>
                          <svg width="22" height="12" viewBox="0 0 22 12" fill="none"><rect x="0.5" y="0.5" width="18" height="11" rx="2.5" stroke="currentColor" strokeOpacity="0.45"/><rect x="1.5" y="1.5" width="16" height="9" rx="1.5" fill="currentColor"/><path d="M20 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </span>
                      </div>
                      <div className="ps-body">
                        <div className="ps-title">Turniere</div>
                        <div className="ps-filter-row">
                          <span className="ps-filter ps-filter-active">Alle</span>
                          <span className="ps-filter">Club</span>
                          <span className="ps-filter">Offen</span>
                        </div>
                        <div className="ps-event-card">
                          <div className="ps-event-badge ps-badge-gold">🏆</div>
                          <div className="ps-event-info">
                            <div className="ps-event-name">Club Championship</div>
                            <div className="ps-event-date">15. März · GC München</div>
                          </div>
                          <div className="ps-event-status ps-status-reg">Angemeldet</div>
                        </div>
                        <div className="ps-event-card">
                          <div className="ps-event-badge ps-badge-blue">⛳</div>
                          <div className="ps-event-info">
                            <div className="ps-event-name">Frühjahrsturnier</div>
                            <div className="ps-event-date">28. März · GC Hamburg</div>
                          </div>
                          <div className="ps-event-status ps-status-open">Anmelden</div>
                        </div>
                        <div className="ps-event-card">
                          <div className="ps-event-badge ps-badge-purple">🎯</div>
                          <div className="ps-event-info">
                            <div className="ps-event-name">Stadtmeisterschaft</div>
                            <div className="ps-event-date">5. April · GC Berlin</div>
                          </div>
                          <div className="ps-event-status ps-status-open">Anmelden</div>
                        </div>
                        <div className="ps-live-row">
                          <span className="ps-dot-live"></span>Live-Ranglisten inklusive
                        </div>
                      </div>
                    </div>

                    {/* Screen 3: Community */}
                    <div className={`pscreen pscreen-3${activeGolferCard === 3 ? ' pscreen-visible' : ''}`}>
                      <div className="ps-statusbar">
                        <span>{currentTime}</span>
                        <span className="ps-sb-icons">
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor"><rect x="0" y="3" width="2" height="7" rx="0.5"/><rect x="3" y="2" width="2" height="8" rx="0.5"/><rect x="6" y="0" width="2" height="10" rx="0.5"/><rect x="9" y="1" width="2" height="9" rx="0.5"/></svg>
                          <svg width="22" height="12" viewBox="0 0 22 12" fill="none"><rect x="0.5" y="0.5" width="18" height="11" rx="2.5" stroke="currentColor" strokeOpacity="0.45"/><rect x="1.5" y="1.5" width="16" height="9" rx="1.5" fill="currentColor"/><path d="M20 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </span>
                      </div>
                      <div className="ps-body">
                        <div className="ps-title">Community</div>
                        <div className="ps-community-sub">Mitspieler in deiner Nähe</div>
                        <div className="ps-player-row">
                          <div className="ps-player-av" style={{ background: 'linear-gradient(135deg,#3DAD6B,#1E5C3A)' }}>TK</div>
                          <div className="ps-player-info"><div className="ps-player-name">Thomas K.</div><div className="ps-player-meta">HCP 14 · 2 km</div></div>
                          <div className="ps-player-btn">+</div>
                        </div>
                        <div className="ps-player-row">
                          <div className="ps-player-av" style={{ background: 'linear-gradient(135deg,#6B8FE8,#3D5CBB)' }}>AS</div>
                          <div className="ps-player-info"><div className="ps-player-name">Anna S.</div><div className="ps-player-meta">HCP 9 · 5 km</div></div>
                          <div className="ps-player-btn">+</div>
                        </div>
                        <div className="ps-player-row">
                          <div className="ps-player-av" style={{ background: 'linear-gradient(135deg,#E88B6B,#BB5C3D)' }}>DM</div>
                          <div className="ps-player-info"><div className="ps-player-name">David M.</div><div className="ps-player-meta">HCP 18 · 8 km</div></div>
                          <div className="ps-player-btn">+</div>
                        </div>
                        <div className="ps-group-card">
                          <div className="ps-group-avs">
                            <div className="ps-gav" style={{ background: 'linear-gradient(135deg,#3DAD6B,#1E5C3A)' }}>TK</div>
                            <div className="ps-gav" style={{ background: 'linear-gradient(135deg,#6B8FE8,#3D5CBB)', marginLeft: '-8px' }}>AS</div>
                            <div className="ps-gav" style={{ background: 'linear-gradient(135deg,#E88B6B,#BB5C3D)', marginLeft: '-8px' }}>DM</div>
                          </div>
                          <div className="ps-group-cta-btn">Gruppe erstellen →</div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section className="waitlist-section" id="waitlist-clubs">
        {/* Toggle bar */}
        <div className="wl-toggle-bar">
          <div className="wl-toggle-pill">
            <button
              className={`wl-tab ${activeWl === 'club' ? 'wl-tab-active' : ''}`}
              onClick={() => setActiveWl('club')}
            >
              {t('wl-toggle-club')}
            </button>
            <button
              className={`wl-tab ${activeWl === 'golfer' ? 'wl-tab-active' : ''}`}
              onClick={() => setActiveWl('golfer')}
            >
              {t('wl-toggle-golfer')}
            </button>
          </div>
        </div>

        <div className="waitlist-split">
          {/* LEFT: Clubs (dark) */}
          <div
            className={`wl-panel wl-dark ${activeWl === 'club' ? 'wl-active' : 'wl-inactive'}`}
            onClick={activeWl !== 'club' ? () => setActiveWl('club') : undefined}
            role={activeWl !== 'club' ? 'button' : undefined}
            tabIndex={activeWl !== 'club' ? 0 : undefined}
            onKeyDown={activeWl !== 'club' ? (e) => e.key === 'Enter' && setActiveWl('club') : undefined}
            aria-label={activeWl !== 'club' ? t('wl-toggle-club') : undefined}
          >
            <div className="wl-inactive-label" aria-hidden="true">
              <span className="wl-inactive-eyebrow">{t('wl-clubs-eyebrow')}</span>
              <span className="wl-inactive-name">{t('wl-toggle-club')}</span>
            </div>

            <div className="wl-content-wrap">
              <div className="wl-panel-inner fade" ref={addFadeRef}>
                <div className="wl-eyebrow">{t('wl-clubs-eyebrow')}</div>
                <h2 className="wl-h2">{t('wl-clubs-h2')}</h2>
                <p className="wl-sub">{t('wl-clubs-sub')}</p>

                <div className="wl-form">
                  <div className="wl-input-row">
                    <input
                      type="email"
                      className="wl-input"
                      value={clubEmail}
                      onChange={(e) => setClubEmail(e.target.value)}
                      placeholder={t('wl-clubs-placeholder')}
                      autoComplete="email"
                      aria-label="E-Mail-Adresse Ihres Clubs"
                      onKeyDown={(e) => e.key === 'Enter' && submitWaitlist('club')}
                    />
                    <button
                      type="button"
                      className="wl-btn"
                      onClick={() => submitWaitlist('club')}
                      disabled={clubLoading}
                    >
                      {clubLoading ? (
                        <span className="spin"></span>
                      ) : (
                        <>
                          <span>{t('wl-clubs-btn')}</span>
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className={`wl-msg ${clubMsg.type}`} role="status" aria-live="polite">{clubMsg.text}</div>

                <div className="wl-note">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M8 5v3.5l2 2"/></svg>
                  <span>{t('wl-clubs-note')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Golfers (light) */}
          <div
            className={`wl-panel wl-light ${activeWl === 'golfer' ? 'wl-active' : 'wl-inactive'}`}
            id="waitlist-golfers"
            onClick={activeWl !== 'golfer' ? () => setActiveWl('golfer') : undefined}
            role={activeWl !== 'golfer' ? 'button' : undefined}
            tabIndex={activeWl !== 'golfer' ? 0 : undefined}
            onKeyDown={activeWl !== 'golfer' ? (e) => e.key === 'Enter' && setActiveWl('golfer') : undefined}
            aria-label={activeWl !== 'golfer' ? t('wl-toggle-golfer') : undefined}
          >
            <div className="wl-inactive-label" aria-hidden="true">
              <span className="wl-inactive-eyebrow">{t('wl-golfers-eyebrow')}</span>
              <span className="wl-inactive-name">{t('wl-toggle-golfer')}</span>
            </div>

            <div className="wl-content-wrap">
              <div className="wl-panel-inner fade d1" ref={addFadeRef}>
                <div className="wl-eyebrow">{t('wl-golfers-eyebrow')}</div>
                <h2 className="wl-h2" dangerouslySetInnerHTML={{ __html: t('wl-golfers-h2') }} />
                <p className="wl-sub">{t('wl-golfers-sub')}</p>

                <div className="wl-form">
                  <div className="wl-input-row">
                    <input
                      type="email"
                      className="wl-input"
                      value={golferEmail}
                      onChange={(e) => setGolferEmail(e.target.value)}
                      placeholder={t('wl-golfers-placeholder')}
                      autoComplete="email"
                      aria-label="Ihre E-Mail-Adresse"
                      onKeyDown={(e) => e.key === 'Enter' && submitWaitlist('golfer')}
                    />
                    <button
                      type="button"
                      className="wl-btn"
                      onClick={() => submitWaitlist('golfer')}
                      disabled={golferLoading}
                    >
                      {golferLoading ? (
                        <span className="spin"></span>
                      ) : (
                        <>
                          <span>{t('wl-golfers-btn')}</span>
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className={`wl-msg ${golferMsg.type}`} role="status" aria-live="polite">{golferMsg.text}</div>

                <div className="wl-note">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M8 1l1.5 4.5H14L10.5 8.5 12 13 8 10.5 4 13l1.5-4.5L2 5.5h4.5z"/></svg>
                  <span>{t('wl-golfers-note')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pyne-footer">
        <div className="footer-inner">
          <img src={pyneIcon} alt="Pyne" className="footer-icon" />
          <span className="footer-copy">{t('footer-copy')}</span>
          <div className="footer-links">
            <a href="/impressum" className="footer-link">{t('footer-imprint')}</a>
            <a href="/datenschutz" className="footer-link">{t('footer-privacy')}</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
