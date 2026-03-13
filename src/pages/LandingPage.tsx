import { useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { translations } from '@/i18n/translations';
import '@/styles/landing.css';
import pyneLogo from '@/assets/pyne_horizontal_white.png';
import pyneIcon from '@/assets/pyne_icon_white.png';
import imacPng from '@/assets/iMac.svg';
import macbookPng from '@/assets/macbook_pro.svg';
import screenshotSocial from '@/assets/social_feed.png';
import screenshotMeinClub from '@/assets/mein_club.png';
import screenshotLiveScoring1 from '@/assets/live_scoring1.png';
import screenshotLiveScoring2 from '@/assets/live_scoring2.png';
import screenshotLiveScoring3 from '@/assets/live_scoring3.png';
import screenshotLiveScoring4 from '@/assets/live_scoring4.png';
import screenshotRanking1 from '@/assets/ranking1.png';
import screenshotRanking2 from '@/assets/ranking2.png';
import screenshotRanking3 from '@/assets/ranking3.png';
import screenshotClubFinder from '@/assets/club_finder.png';
import { Users, Trophy, Cloud, Clock, TrendingUp, Plug, Radio, BarChart2, Home, MapPin, MessageSquare } from 'lucide-react';
import { GaesteScreen, LiveScoringScreen, ErinnerungenScreen, AnalyticsScreen, ComingSoonScreen } from '@/components/ClubScreens';

type Lang = 'de' | 'en';

const PhoneSlideshow = ({ images, active }: { images: string[]; active: boolean }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!active) { setIdx(0); return; }
    const id = setInterval(() => setIdx(i => (i + 1) % images.length), 1900);
    return () => clearInterval(id);
  }, [active, images.length]);
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: `${images.length * 100}%`,
        transform: `translateY(-${idx * (100 / images.length)}%)`,
        transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt="" className="pscreen-img" style={{ height: `${100 / images.length}%`, flexShrink: 0 }} />
        ))}
      </div>
    </div>
  );
};

const LandingPage = ({ initialLang }: { initialLang?: Lang }) => {
  const [searchParams] = useSearchParams();
  const [lang, setLang] = useState<Lang>(() => {
    if (initialLang) return initialLang;
    const param = searchParams.get('lang');
    if (param === 'en' || param === 'de') return param;
    return 'de';
  });
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
  const [phoneHovered, setPhoneHovered] = useState(false);
  const [phoneTime, setPhoneTime] = useState(() => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  });
  const fadeRefs = useRef<(HTMLElement | null)[]>([]);
  const heroFadeRefs = useRef<(HTMLElement | null)[]>([]);

  const t = useCallback((key: string) => translations[lang]?.[key] || key, [lang]);

  // Live clock for golfer phone status bar
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setPhoneTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

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
              <a className={`lang-btn ${lang === 'de' ? 'active' : ''}`} href="/">DE</a>
              <span className="lang-sep">|</span>
              <a className={`lang-btn ${lang === 'en' ? 'active' : ''}`} href="/en">EN</a>
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
            <a className={`lang-btn ${lang === 'de' ? 'active' : ''}`} href="/">DE</a>
            <span className="lang-sep">|</span>
            <a className={`lang-btn ${lang === 'en' ? 'active' : ''}`} href="/en">EN</a>
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
          <span>{t('hero-scroll')}</span>
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

            {/* LEFT: iMac + MacBook device mockup */}
            <div className="clubs-left fade" ref={addFadeRef}>
              <div className="club-device-glow"></div>

              {/* SVG chroma key filter — strips solid green from device PNGs */}
              <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
                <defs>
                  <filter id="chromaKeyGreen" colorInterpolationFilters="sRGB">
                    <feColorMatrix in="SourceGraphic" result="gMask" type="matrix"
                      values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  -1 2 -1 0 0" />
                    <feColorMatrix in="gMask" result="invMask" type="matrix"
                      values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -1 1" />
                    <feComposite in="SourceGraphic" in2="invMask" operator="in" />
                  </filter>
                </defs>
              </svg>

              <div className="club-device-scene">

                {/* iMac — back, larger */}
                <div className="club-imac-wrap">
                  <div className="club-imac-screens">
                    <div className={`cscreen${activeClubCard === 0 ? ' cscreen-visible' : ''}`}><GaesteScreen /></div>
                    <div className={`cscreen${activeClubCard === 1 ? ' cscreen-visible' : ''}`}><LiveScoringScreen /></div>
                    <div className={`cscreen${activeClubCard === 2 ? ' cscreen-visible' : ''}`}><ErinnerungenScreen /></div>
                    <div className={`cscreen${activeClubCard === 3 ? ' cscreen-visible' : ''}`}><AnalyticsScreen /></div>
                    <div className={`cscreen${activeClubCard === 4 ? ' cscreen-visible' : ''}`}><ComingSoonScreen /></div>
                  </div>
                  <img src={imacPng} alt="" className="club-device-frame" style={{ filter: 'url(#chromaKeyGreen)' }} aria-hidden="true" />
                </div>

                {/* MacBook — front-right, covering bottom-right corner of iMac */}
                <div className="club-macbook-wrap">
                  <div className="club-macbook-screens">
                    <div className={`cscreen${activeClubCard === 0 ? ' cscreen-visible' : ''}`}><GaesteScreen /></div>
                    <div className={`cscreen${activeClubCard === 1 ? ' cscreen-visible' : ''}`}><LiveScoringScreen /></div>
                    <div className={`cscreen${activeClubCard === 2 ? ' cscreen-visible' : ''}`}><ErinnerungenScreen /></div>
                    <div className={`cscreen${activeClubCard === 3 ? ' cscreen-visible' : ''}`}><AnalyticsScreen /></div>
                    <div className={`cscreen${activeClubCard === 4 ? ' cscreen-visible' : ''}`}><ComingSoonScreen /></div>
                  </div>
                  <img src={macbookPng} alt="" className="club-device-frame" style={{ filter: 'url(#chromaKeyGreen)' }} aria-hidden="true" />
                </div>

                {/* Phone popup — Erinnerungen card only (card 2) */}
                <div className={`club-phone-scene${activeClubCard === 2 ? ' club-phone-visible' : ''}`}>
                  <div className="club-phone-label">
                    <span className="club-phone-label-title">{t('phone-label-title')}</span>
                    <span className="club-phone-label-sub">{t('phone-label-sub')}</span>
                  </div>
                  <div className="cph-frame">
                    <div className="cph-island"></div>
                    <div className="cph-screen">

                      {/* Status bar — 44px safe area above chat header */}
                      <div className="cph-status-bar">
                        <span className="cph-status-time">9:41</span>
                        <div className="cph-status-icons">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                            <rect x="0" y="4" width="2" height="4" rx="0.5" fill="white" fillOpacity="0.4"/>
                            <rect x="2.5" y="2.5" width="2" height="5.5" rx="0.5" fill="white" fillOpacity="0.6"/>
                            <rect x="5" y="1" width="2" height="7" rx="0.5" fill="white" fillOpacity="0.8"/>
                            <rect x="7.5" y="0" width="2" height="8" rx="0.5" fill="white"/>
                          </svg>
                          <svg width="10" height="8" viewBox="0 0 12 9" fill="none" aria-hidden="true">
                            <path d="M6 2C7.8 2 9.4 2.8 10.5 4L12 2.3C10.5 0.9 8.4 0 6 0C3.6 0 1.5 0.9 0 2.3L1.5 4C2.6 2.8 4.2 2 6 2Z" fill="white" fillOpacity="0.5"/>
                            <path d="M6 5C7 5 7.9 5.4 8.5 6.1L10 4.4C9 3.5 7.6 3 6 3C4.4 3 3 3.5 2 4.4L3.5 6.1C4.1 5.4 5 5 6 5Z" fill="white" fillOpacity="0.75"/>
                            <circle cx="6" cy="8.5" r="1.5" fill="white"/>
                          </svg>
                          <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden="true">
                            <rect x="0.5" y="0.5" width="18" height="9" rx="2.5" stroke="white" strokeOpacity="0.35"/>
                            <rect x="1.5" y="1.5" width="15" height="7" rx="1.5" fill="white"/>
                            <path d="M20 3.5V6.5C20.8 6.2 21.5 5.7 21.5 5C21.5 4.3 20.8 3.8 20 3.5Z" fill="white" fillOpacity="0.4"/>
                          </svg>
                        </div>
                      </div>

                      {/* Chat header */}
                      <div className="cph-header">
                        <div className="cph-avatar">P</div>
                        <div className="cph-header-info">
                          <span className="cph-header-name">GC Musterstadt</span>
                          <span className="cph-header-sub">{t('phone-your-club')}</span>
                        </div>
                        <div className="cph-header-dot"></div>
                      </div>

                      {/* Messages */}
                      <div className="cph-messages">
                        <div className="cph-ts">{t('phone-ts1')}</div>
                        <div className="cph-c">{t('phone-msg1')}</div>
                        <div className="cph-ts">{t('phone-ts2')}</div>
                        <div className="cph-p">{t('phone-reply1')}</div>
                        <div className="cph-ts">{t('phone-ts3')}</div>
                        <div className="cph-c">{t('phone-msg2')}</div>
                        <div className="cph-quick">
                          <button type="button" className="cph-quick-yes">{t('phone-btn-yes')}</button>
                          <button type="button" className="cph-quick-no">{t('phone-btn-no')}</button>
                        </div>
                        <div className="cph-ts">{t('phone-ts4')}</div>
                        <div className="cph-p">{t('phone-reply2')}</div>
                        <div className="cph-c">{t('phone-msg3')}</div>
                        <div className="cph-ts">{t('phone-ts5')}</div>
                        <div className="cph-c">{t('phone-msg4')}</div>
                      </div>

                      {/* Input bar */}
                      <div className="cph-input">
                        <div className="cph-input-field">{t('phone-input-placeholder')}</div>
                        <div className="cph-input-send">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>

                      {/* Home indicator — 34px safe area below input */}
                      <div className="cph-home">
                        <div className="cph-home-bar"></div>
                      </div>

                    </div>
                  </div>
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
                  <div className="cfc-icon"><Users size={20} strokeWidth={1.75} /></div>
                  <div className="cfc-title">{t('c1-title')}</div>
                  <div className="cfc-desc">{t('c1-desc')}</div>
                </div>
                <div className={`cfc-card${activeClubCard === 1 ? ' cfc-active' : ''}`} onMouseEnter={() => setActiveClubCard(1)}>
                  <div className="cfc-icon"><Trophy size={20} strokeWidth={1.75} /></div>
                  <div className="cfc-title">{t('c2-title')}</div>
                  <div className="cfc-desc">{t('c2-desc')}</div>
                </div>
                <div className={`cfc-card${activeClubCard === 2 ? ' cfc-active' : ''}`} onMouseEnter={() => setActiveClubCard(2)}>
                  <div className="cfc-icon"><Clock size={20} strokeWidth={1.75} /></div>
                  <div className="cfc-title">{t('c4-title')}</div>
                  <div className="cfc-desc">{t('c4-desc')}</div>
                </div>
                <div className={`cfc-card${activeClubCard === 3 ? ' cfc-active' : ''}`} onMouseEnter={() => setActiveClubCard(3)}>
                  <div className="cfc-icon"><TrendingUp size={20} strokeWidth={1.75} /></div>
                  <div className="cfc-title">{t('c5-title')}</div>
                  <div className="cfc-desc">{t('c5-desc')}</div>
                </div>
                <div className={`cfc-card${activeClubCard === 4 ? ' cfc-active' : ''}`} onMouseEnter={() => setActiveClubCard(4)}>
                  <div className="cfc-icon"><Plug size={20} strokeWidth={1.75} /></div>
                  <div className="cfc-title">
                    {t('c6-title')}
                    <span className="cfc-coming-soon">{t('coming-soon')}</span>
                  </div>
                  <div className="cfc-desc">{t('c6-desc')}</div>
                </div>
              </div>

              {/* Cloud / DSGVO banner — no screen interaction */}
              <div className="cfc-cloud-banner fade d3" ref={addFadeRef}>
                <div className="cfc-cloud-banner-icon">
                  <Cloud size={18} strokeWidth={1.75} />
                </div>
                <div className="cfc-cloud-banner-body">
                  <div className="cfc-cloud-banner-title">{t('c3-title')}</div>
                  <div className="cfc-cloud-banner-desc">{t('c3-desc')}</div>
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
                {/* Card 0: Neuigkeiten */}
                <div
                  className={`golfer-feature-card${activeGolferCard === 0 ? ' gfc-active' : ''}`}
                  onMouseEnter={() => setActiveGolferCard(0)}
                >
                  <div className="gfc-icon"><MessageSquare size={20} strokeWidth={1.75} aria-hidden="true" /></div>
                  <div className="gfc-body">
                    <div className="gfc-title">{t('g1-title')}</div>
                    <div className="gfc-desc">{t('g1-desc')}</div>
                  </div>
                  <div className="gfc-arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>

                {/* Card 1: Mein Club */}
                <div
                  className={`golfer-feature-card${activeGolferCard === 1 ? ' gfc-active' : ''}`}
                  onMouseEnter={() => setActiveGolferCard(1)}
                >
                  <div className="gfc-icon"><Home size={20} strokeWidth={1.75} aria-hidden="true" /></div>
                  <div className="gfc-body">
                    <div className="gfc-title">{t('g2-title')}</div>
                    <div className="gfc-desc">{t('g2-desc')}</div>
                  </div>
                  <div className="gfc-arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>

                {/* Card 2: Live Scoring */}
                <div
                  className={`golfer-feature-card${activeGolferCard === 2 ? ' gfc-active' : ''}`}
                  onMouseEnter={() => setActiveGolferCard(2)}
                >
                  <div className="gfc-icon"><Radio size={20} strokeWidth={1.75} aria-hidden="true" /></div>
                  <div className="gfc-body">
                    <div className="gfc-title">{t('g3-title')}</div>
                    <div className="gfc-desc">{t('g3-desc')}</div>
                  </div>
                  <div className="gfc-arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>

                {/* Card 3: Rangliste */}
                <div
                  className={`golfer-feature-card${activeGolferCard === 3 ? ' gfc-active' : ''}`}
                  onMouseEnter={() => setActiveGolferCard(3)}
                >
                  <div className="gfc-icon"><BarChart2 size={20} strokeWidth={1.75} aria-hidden="true" /></div>
                  <div className="gfc-body">
                    <div className="gfc-title">{t('g4-title')}</div>
                    <div className="gfc-desc">{t('g4-desc')}</div>
                  </div>
                  <div className="gfc-arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>

                {/* Card 4: Clubsuche */}
                <div
                  className={`golfer-feature-card${activeGolferCard === 4 ? ' gfc-active' : ''}`}
                  onMouseEnter={() => setActiveGolferCard(4)}
                >
                  <div className="gfc-icon"><MapPin size={20} strokeWidth={1.75} aria-hidden="true" /></div>
                  <div className="gfc-body">
                    <div className="gfc-title">{t('g5-title')}</div>
                    <div className="gfc-desc">{t('g5-desc')}</div>
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
              <div className="phone-scene" onMouseEnter={() => setPhoneHovered(true)} onMouseLeave={() => setPhoneHovered(false)}>
                <div className="phone-frame">
                  <div className="phone-btn-vol-up"></div>
                  <div className="phone-btn-vol-down"></div>
                  <div className="phone-btn-power"></div>
                  <div className="phone-dynamic-island"></div>
                  <div className="phone-screen">

                    {/* Fixed status bar overlay — above all screens */}
                    <div className="phone-status-overlay" aria-hidden="true">
                      <span className="phone-status-time">{phoneTime}</span>
                      <div className="phone-status-icons">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <rect x="0" y="4" width="2" height="4" rx="0.5" fill="white" fillOpacity="0.4"/>
                          <rect x="2.5" y="2.5" width="2" height="5.5" rx="0.5" fill="white" fillOpacity="0.6"/>
                          <rect x="5" y="1" width="2" height="7" rx="0.5" fill="white" fillOpacity="0.8"/>
                          <rect x="7.5" y="0" width="2" height="8" rx="0.5" fill="white"/>
                        </svg>
                        <svg width="10" height="8" viewBox="0 0 12 9" fill="none">
                          <path d="M6 2C7.8 2 9.4 2.8 10.5 4L12 2.3C10.5 0.9 8.4 0 6 0C3.6 0 1.5 0.9 0 2.3L1.5 4C2.6 2.8 4.2 2 6 2Z" fill="white" fillOpacity="0.5"/>
                          <path d="M6 5C7 5 7.9 5.4 8.5 6.1L10 4.4C9 3.5 7.6 3 6 3C4.4 3 3 3.5 2 4.4L3.5 6.1C4.1 5.4 5 5 6 5Z" fill="white" fillOpacity="0.75"/>
                          <circle cx="6" cy="8.5" r="1.5" fill="white"/>
                        </svg>
                        <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
                          <rect x="0.5" y="0.5" width="18" height="9" rx="2.5" stroke="white" strokeOpacity="0.35"/>
                          <rect x="1.5" y="1.5" width="15" height="7" rx="1.5" fill="white"/>
                          <path d="M20 3.5V6.5C20.8 6.2 21.5 5.7 21.5 5C21.5 4.3 20.8 3.8 20 3.5Z" fill="white" fillOpacity="0.4"/>
                        </svg>
                      </div>
                    </div>

                    {/* Screen 0: Neuigkeiten */}
                    <div className={`pscreen pscreen-0${activeGolferCard === 0 ? ' pscreen-visible' : ''}`}>
                      <img src={screenshotSocial} alt="Neuigkeiten" className="pscreen-img" />
                    </div>

                    {/* Screen 1: Mein Club */}
                    <div className={`pscreen pscreen-1${activeGolferCard === 1 ? ' pscreen-visible' : ''}`}>
                      <img src={screenshotMeinClub} alt="Mein Club" className="pscreen-img" />
                    </div>

                    {/* Screen 2: Live Scoring — 4 slides */}
                    <div className={`pscreen pscreen-2${activeGolferCard === 2 ? ' pscreen-visible' : ''}`}>
                      <PhoneSlideshow
                        images={[screenshotLiveScoring1, screenshotLiveScoring2, screenshotLiveScoring3, screenshotLiveScoring4]}
                        active={activeGolferCard === 2 && !phoneHovered}
                      />
                    </div>

                    {/* Screen 3: Rangliste — 3 slides */}
                    <div className={`pscreen pscreen-3${activeGolferCard === 3 ? ' pscreen-visible' : ''}`}>
                      <PhoneSlideshow
                        images={[screenshotRanking1, screenshotRanking2, screenshotRanking3]}
                        active={activeGolferCard === 3 && !phoneHovered}
                      />
                    </div>

                    {/* Screen 4: Clubsuche */}
                    <div className={`pscreen pscreen-4${activeGolferCard === 4 ? ' pscreen-visible' : ''}`}>
                      <img src={screenshotClubFinder} alt="Clubsuche" className="pscreen-img" />
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
            <a href="/nutzungsbedingungen" className="footer-link">{t('footer-terms')}</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
