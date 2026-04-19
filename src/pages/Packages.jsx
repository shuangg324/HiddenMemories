import { useCallback, useEffect } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faMagic,
  faStar,
  faGem,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../utils/modalContext';

/* Shared scroll-reveal — same pattern as Home */
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
            el.style.opacity = '';
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

const HOW_IT_WORKS = [
  { step: '1', text: <><b>Choose the Basic Package:</b> Every event starts with our dry hire package.</> },
  { step: '2', text: <><b>Select add-ons:</b> Pick extras that suit your event needs.</> },
  { step: '3', text: <><b>Get a quote:</b> Fill out our inquiry form and receive a personalised estimate.</> },
  { step: '4', text: <><b>Enjoy your event:</b> We handle the setup so you can focus on making memories.</> },
];

const BASIC_ITEMS = [
  'Bar setup & breakdown',
  'Cups, napkins & straws',
  'Basic mixers',
  'Basic garnishes',
  'Custom cocktail menu',
  'Certified & insured bartenders',
  '5 hours of service',
];

const ADDON_ITEMS = [
  { label: 'Mixers',            desc: 'A variety of non-alcoholic options — soda, juice, tonic water and more.' },
  { label: 'Garnishes',         desc: 'Fresh fruit, herbs, edible flowers and specialty toppings.' },
  { label: 'Water Station',     desc: 'Chilled water dispensers placed around your venue.' },
  { label: 'Ice Service',       desc: 'Specialty ice for perfectly crafted drinks.' },
  { label: 'Glassware Upgrade', desc: 'Swap disposable cups for elegant stemware.' },
  { label: 'Extra Bartender',   desc: 'Additional staff recommended for 75+ guests.' },
  { label: 'And more',          desc: 'Ask us about additional options to enhance your event.' },
];

/* ═══════════════════════════════════════════════════════════ */
const Packages = () => {
  const { openModal } = useModal();

  useScrollReveal();

  const handleContactClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    openModal();
  }, [openModal]);

  return (
    <div className="App">
      <section id="packages-page">

        <div className="container">
          <div className="row dark-mode-white">

            {/* ── Header ── */}
            <div className="packages-header" data-animate="fade-in-up">

              <span className="eyebrow">Our Offering</span>
              <h1 className="section__title">Packages &amp; pricing</h1>
              <p className="packages__header">
                Take the guesswork out of planning. Start with our essentials,
                then build exactly the bar experience your event deserves.
              </p>
            </div>

            {/* ── How It Works ── */}
            <div
              className="how-it-works enhanced-section"
              data-animate="fade-in-up"
              data-delay="1"
            >
              <div className="section-header">
                <FontAwesomeIcon icon={faMagic} className="section-icon" />
                <p className="italic package__title enhanced-title">How it works</p>
              </div>
              <div className="steps-container">
                {HOW_IT_WORKS.map(({ step, text }, i) => (
                  <div
                    key={i}
                    className="step-item"
                    data-animate="fade-in-left"
                    data-delay={i + 2}
                  >
                    <span className="step-number">{step}</span>
                    <FontAwesomeIcon icon={faCheck} className="step-check" />
                    <div>{text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Package Cards ── */}
            <div className="package__list enhanced-packages">

              {/* Basic */}
              <div
                className="package enhanced-package basic-package"
                data-animate="scale-in"
                data-delay="6"
              >
                <div className="package-icon-header">
                  <FontAwesomeIcon icon={faStar} className="package-main-icon" />
                  <span className="package-badge">Essential</span>
                </div>

                <p className="italic package__title enhanced-package-title">Basic Package</p>
                <p className="package__description">
                  Our foundational dry hire model — everything you need for a stylish,
                  professional bar setup.
                  <br />
                  <strong style={{ color: 'var(--accent)' }}>Starting at $1,000</strong> for 5 hours of service.
                </p>

                <ul className="package__items enhanced-items">
                  {BASIC_ITEMS.map((item, i) => (
                    <li key={i} style={{ '--i': i }}>
                      <FontAwesomeIcon icon={faCheck} className="item-check" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add-ons */}
              <div
                className="package enhanced-package premium-package"
                data-animate="scale-in"
                data-delay="7"
              >
                <div className="package-icon-header">
                  <FontAwesomeIcon icon={faGem} className="package-main-icon premium-icon" />
                  <span className="package-badge premium-badge">Customize</span>
                </div>

                <p className="italic package__title enhanced-package-title">
                  Tailor your event with add-ons
                </p>
                <p className="package__description">
                  Layer on exactly what your event needs — nothing more, nothing less.
                </p>

                <ul className="package__items enhanced-items premium-items">
                  {ADDON_ITEMS.map(({ label, desc }, i) => (
                    <li key={i} style={{ '--i': i }}>
                      <FontAwesomeIcon icon={faCheck} className="item-check premium-check" />
                      <span><b>{label}:</b> {desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* ── CTA ── */}
            <div className="contact__cta" data-animate="fade-in-up" data-delay="9">
              <div className="packages-cta-enhanced">

                <div className="packages-cta__header">
                  <h3 className="packages-cta__title">Ready to build your perfect bar?</h3>
                  <p className="packages-cta__subtitle">Book your 2025 date before they're gone</p>
                </div>

                <div className="packages-cta__stats">
                  <div className="stat-item">
                    <span className="stat-number">5+</span>
                    <span className="stat-label">Years experience</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">LA</span>
                    <span className="stat-label">County &amp; beyond</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">✓</span>
                    <span className="stat-label">Licensed &amp; insured</span>
                  </div>
                </div>

                <div className="packages-cta__buttons">
                  <button
                    onClick={handleContactClick}
                    className="packages-cta__button packages-cta__button--primary"
                  >
                    <FontAwesomeIcon icon={faMagic} />
                    <span>Get your free quote</span>
                  </button>
                  <a
                    href="tel:+16263674586"
                    className="packages-cta__button packages-cta__button--secondary"
                  >
                    <FontAwesomeIcon icon={faPhone} />
                    <span>Call or text (626) 367-4586</span>
                  </a>
                </div>

                <p className="packages-cta__guarantee">
                  Free consultation · Custom pricing · No hidden fees
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
