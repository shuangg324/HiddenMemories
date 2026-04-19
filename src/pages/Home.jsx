import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useModal } from '../utils/modalContext';

/* Local assets */
import setupNight   from '../assets/Setup at night.jpg';
import brideImg     from '../assets/Bride.jpg';
import barSetupImg  from '../assets/Bar Setup.jpg';
import poolPartyImg from '../assets/Pool Party.jpg';

/* ─── Scroll-reveal hook ─────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el    = entry.target;
          const type  = el.dataset.animate;
          const delay = el.dataset.delay ? parseInt(el.dataset.delay, 10) * 80 : 0;
          setTimeout(() => {
            el.classList.add(`animate-${type}`);
            el.style.opacity    = '';
            el.style.visibility = '';
          }, delay);
          observer.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    );

    const els = document.querySelectorAll('[data-animate]');
    els.forEach((el) => {
      el.style.opacity = '0';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}

/* ─── Services data ──────────────────────────────────────── */
const SERVICES = [
  {
    num:   '01',
    label: 'Weddings',
    title: 'Your perfect day, perfectly poured',
    desc:  'From champagne towers to custom signature cocktails, we craft a bar experience as memorable as the vows. Every detail — glassware, garnishes, menu — tailored to your vision.',
    img:   brideImg,
    to:    '/packages',
  },
  {
    num:   '02',
    label: 'Corporate Events',
    title: 'Drinks that close the deal',
    desc:  'Impress clients and reward your team with a sophisticated mobile bar. We bring the polish of a five-star venue to your venue — without the venue pricing.',
    img:   barSetupImg,
    to:    '/packages',
  },
  {
    num:   '03',
    label: 'Private Parties',
    title: 'Every occasion deserves craft',
    desc:  'Birthday dinners, pool parties, anniversary celebrations — no event too intimate, none too extravagant. We show up fully equipped and ready to delight.',
    img:   poolPartyImg,
    to:    '/packages',
  },
];

const PX = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&fit=crop`;

/* ─── Cocktails grid data ─────────────────────────────────── */
const COCKTAILS = [
  { name: 'Signature pour',    img: PX(10331392) },
  { name: 'Garden in bloom',   img: PX(34913279) },
  { name: 'Café rose',         img: PX(34358624) },
  { name: 'Florals & spirits', img: PX(2466321)  },
  { name: 'Evening service',   img: PX(10595450) },
];

/* ─── Marquee items ───────────────────────────────────────── */
const MARQUEE = [
  'Weddings', 'Corporate Events', 'Private Parties',
  'Pool Parties', 'Anniversary Dinners', 'Birthdays',
  'LA County', 'Licensed & Insured', 'Custom Menus',
];

/* ═══════════════════════════════════════════════════════════ */
const Home = () => {
  const { openModal } = useModal();
  const navigate      = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);

  useScrollReveal();

  const handleBook = useCallback(() => {
    window.scrollTo(0, 0);
    openModal();
  }, [openModal]);

  /* Marquee doubled for seamless loop */
  const marqueeItems = [...MARQUEE, ...MARQUEE];

  return (
    <div className="App">

      {/* ══════════════════════════════
          HERO
          ══════════════════════════════ */}
      <section className="hero" aria-label="Hero">
        {/* Rising carbonation bubbles */}
        <div className="hero__bubbles" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className={`bubble bubble--${i}`} />
          ))}
        </div>

        {/* Left — text content */}
        <div className="hero__content">
          <div className="hero__eyebrow" aria-label="Badge">
            <span>★</span>
            Premium Mobile Bar · LA County
            <span>★</span>
          </div>

          <h1 className="hero__title">
            Hidden<br />
            <em>Memories</em>
          </h1>

          <p className="hero__sub">
            Bespoke cocktails and sophisticated bartending for the moments that matter most. We bring the bar to you, beautifully.
          </p>

          <div className="hero__actions">
            <button className="btn-primary" onClick={handleBook}>
              Book your event
            </button>
            <Link to="/gallery" className="btn-ghost">
              View gallery
            </Link>
          </div>

          <div className="hero__trust" aria-label="Trust indicators">
            <div className="hero__trust-item">
              <span className="hero__trust-value">5+</span>
              <span className="hero__trust-label">Years of craft</span>
            </div>
            <div className="hero__trust-item">
              <span className="hero__trust-value">LA</span>
              <span className="hero__trust-label">County &amp; beyond</span>
            </div>
            <div className="hero__trust-item">
              <span className="hero__trust-value">✓</span>
              <span className="hero__trust-label">Licensed &amp; insured</span>
            </div>
          </div>

          <div className="hero__scroll" aria-hidden="true">
            <span className="hero__scroll-line" />
            <span className="hero__scroll-text">scroll to explore</span>
          </div>
        </div>

        {/* Right — full-height photo */}
        <div className="hero__visual" aria-hidden="true">
          <img
            src={setupNight}
            alt="Bar setup at night"
            className="hero__img"
            onLoad={() => setImgLoaded(true)}
            style={imgLoaded ? {} : { opacity: 0 }}
          />
          <div className="hero__img-overlay" />
        </div>

      </section>

      {/* ══════════════════════════════
          MARQUEE STRIP
          ══════════════════════════════ */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════
          SERVICES
          ══════════════════════════════ */}
      <section className="services" aria-label="Services">
        <div className="container">

          <div className="services__header" data-animate="fade-in-up">
            <span className="eyebrow">What we do</span>
            <h2 className="section__title">Every event, exactly right</h2>
            <p className="services__subtitle">
              From intimate dinners to 300-guest weddings, we show up fully prepared
              and leave nothing to chance.
            </p>
          </div>

          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="service-panel"
              data-animate="fade-in-up"
              data-delay={i + 1}
            >
              <div className="service-panel__meta">
                <span className="service-panel__num" aria-hidden="true">{s.num}</span>
                <span className="service-panel__label">{s.label}</span>
              </div>

              <div className="service-panel__body">
                <h3 className="service-panel__title">{s.title}</h3>
                <p className="service-panel__desc">{s.desc}</p>
                <Link to={s.to} className="service__link">
                  See packages
                  <span className="service__link-arrow" aria-hidden="true">↗</span>
                </Link>
              </div>

              <div className="service-panel__visual">
                <img src={s.img} alt={s.label} className="service-panel__img" loading="lazy" />
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ══════════════════════════════
          COCKTAIL SHOWCASE
          ══════════════════════════════ */}
      <section className="cocktails" aria-label="Cocktail gallery preview">
        <div className="container">

          <div className="cocktails__header">
            <div data-animate="fade-in-left">
              <span className="eyebrow">The craft</span>
              <h2 className="cocktails__title">
                Made with intention,<br />served with care
              </h2>
            </div>
            <Link to="/gallery" className="btn-ghost" data-animate="fade-in-right">
              View full gallery
            </Link>
          </div>

        </div>

        {/* Film strip — bleeds edge to edge */}
        <div className="cocktails__film-wrap" data-animate="fade-in-up">
          <div className="cocktails__film">
            {COCKTAILS.map((c, i) => (
              <div
                key={i}
                className={`cocktail-frame cocktail-frame--${i}`}
                onClick={() => navigate('/gallery')}
                role="button"
                tabIndex={0}
                aria-label={`View ${c.name} in gallery`}
                onKeyDown={(e) => e.key === 'Enter' && navigate('/gallery')}
              >
                <img src={c.img} alt={c.name} className="cocktail-frame__img" loading="lazy" />
                <div className="cocktail-frame__label" aria-hidden="true">
                  <span>{c.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA
          ══════════════════════════════ */}
      <section className="home-cta" aria-label="Call to action">
        <div className="home-cta__bg" aria-hidden="true" />
        <div className="home-cta__glow" aria-hidden="true" />

        <div className="home-cta__content">
          <div data-animate="fade-in-up">
            <span className="eyebrow">Ready to begin?</span>
            <h2 className="home-cta__title">
              Let's make it<br /><em>unforgettable</em>
            </h2>
            <p className="home-cta__sub">
              Tell us about your event and we'll craft a custom package.
              
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={handleBook}>
                Get a free quote
              </button>
              <a href="tel:+16263674586" className="btn-ghost">
                (626) 367-4586
              </a>
            </div>
            <p className="home-cta__note">
              Free consultation · Custom pricing · No obligations
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
