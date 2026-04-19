import { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import '../App.css';

function useAnimatedValue(target, duration = 400) {
  const [display, setDisplay] = useState(target);
  const rafRef  = useRef(null);
  const fromRef = useRef(target);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    const from  = fromRef.current;
    const start = performance.now();
    const tick  = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (target - from) * ease));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}


/* ── Add-on definitions ───────────────────────────────────────── */
const ADDONS = [
  { key: 'mixers',         name: 'Premium Mixers',      desc: 'Soda, juice, tonic & more',       price: 5,   perGuest: true,  per75: false },
  { key: 'garnishes',      name: 'Specialty Garnishes',  desc: 'Fresh fruit, herbs & flowers',    price: 2,   perGuest: true,  per75: false },
  { key: 'waterStation',   name: 'Water Station',        desc: 'Chilled dispensers at venue',     price: 2,   perGuest: true,  per75: false },
  { key: 'ice',            name: 'Ice Service',          desc: 'Specialty ice for cocktails',     price: 2,   perGuest: true,  per75: false },
  { key: 'glassware',      name: 'Glassware Upgrade',    desc: 'Elegant stemware instead of cups',price: 5,   perGuest: true,  per75: false },
  { key: 'extraBartender', name: 'Extra Bartender',      desc: 'Recommended for 75+ guests',     price: 300, perGuest: false, per75: true  },
];

/* ── SVG checkmark ────────────────────────────────────────────── */
function CheckIcon({ checked }) {
  return (
    <svg
      className={`qc-check-icon${checked ? ' qc-check-icon--on' : ''}`}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <rect className="qc-check-bg" x="0.5" y="0.5" width="17" height="17" rx="4.5" />
      <path
        className="qc-check-path"
        d="M4.5 9l3 3 6-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Calculator ───────────────────────────────────────────────── */
const QuoteCalculator = () => {
  const pageRef = useRef(null);
  const [guests,  setGuests]  = useState('');
  const [hours,   setHours]   = useState(5);
  const [addOns,  setAddOns]  = useState([]);

  /* Sequential stagger reveal */
  useEffect(() => {
    const items = pageRef.current?.querySelectorAll('.qc-item') ?? [];
    items.forEach((el, i) => {
      setTimeout(() => el.classList.add('qc-item--visible'), i * 110);
    });
  }, []);

  const BASE       = 1000;
  const EXTRA_HOUR = 150;

  const fmt = useCallback((n) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD',
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(n),
  []);

  const quote = useMemo(() => {
    const g = parseInt(guests) || 0;
    let total = BASE;
    const items = [];

    if (hours > 5) {
      const extra = (hours - 5) * EXTRA_HOUR;
      total += extra;
      items.push({ label: `+${hours - 5} extra hour${hours - 5 > 1 ? 's' : ''}`, amount: extra });
    }

    addOns.forEach((key) => {
      const a = ADDONS.find(x => x.key === key);
      if (!a) return;
      if (a.per75) {
        const n = Math.floor(g / 75);
        const cost = a.price * n;
        if (n > 0) { total += cost; items.push({ label: `${a.name} ×${n}`, amount: cost }); }
      } else {
        const cost = a.perGuest ? a.price * g : a.price;
        total += cost;
        items.push({ label: a.name, amount: cost });
      }
    });

    return { total, items, guests: g };
  }, [guests, hours, addOns]);

  const toggleAddon = useCallback((key) => {
    setAddOns(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  }, []);

  const step = (delta) => {
    setGuests(prev => {
      const next = Math.max(0, Math.min(500, (parseInt(prev) || 0) + delta));
      return String(next);
    });
  };

  const hasGuests         = parseInt(guests) > 0;
  const warnBartender     = hasGuests && parseInt(guests) > 75 && !addOns.includes('extraBartender');
  const animatedTotal     = useAnimatedValue(quote.total);

  return (
    <div className="qc-page" ref={pageRef}>

      {/* ── Header ── */}
      <header className="qc-header qc-item">
        <span className="eyebrow">Estimate</span>
        <h1 className="qc-header__title">Quote calculator</h1>
        <p className="qc-header__sub">
          Adjust the details below to see your instant estimate.
        </p>
      </header>

      <div className="qc-grid">

        {/* ── Inputs ── */}
        <div className="qc-inputs qc-item">

          {/* Guests */}
          <div className="qc-block">
            <span className="qc-block__label">Number of guests</span>
            <div className="qc-stepper">
              <button
                className="qc-stepper__btn"
                onClick={() => step(-5)}
                aria-label="Decrease guests by 5"
              >−</button>
              <input
                type="number"
                className="qc-stepper__input"
                value={guests}
                onChange={e => {
                  const v = e.target.value;
                  if (v === '' || (parseInt(v) >= 0 && parseInt(v) <= 500)) setGuests(v);
                }}
                placeholder="0"
                min="0"
                max="500"
                aria-label="Guest count"
              />
              <button
                className="qc-stepper__btn"
                onClick={() => step(5)}
                aria-label="Increase guests by 5"
              >+</button>
            </div>
          </div>

          {/* Hours */}
          <div className="qc-block">
            <span className="qc-block__label">Hours of service</span>
            <div className="qc-pills" role="group" aria-label="Service hours">
              {[5, 6, 7, 8].map(h => (
                <button
                  key={h}
                  className={`qc-pill${hours === h ? ' qc-pill--on' : ''}`}
                  onClick={() => setHours(h)}
                  aria-pressed={hours === h}
                >
                  {h}h
                  {h === 5 && <span className="qc-pill__tag">standard</span>}
                  {h > 5 && <span className="qc-pill__tag">+{fmt((h - 5) * EXTRA_HOUR)}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div className="qc-block">
            <span className="qc-block__label">
              Add-ons <span className="qc-block__hint">— optional</span>
            </span>
            <div className="qc-addons">
              {ADDONS.map(({ key, name, desc, price, perGuest, per75 }) => {
                const on       = addOns.includes(key);
                const priceStr = per75
                  ? `$${price} / bartender`
                  : perGuest
                  ? `$${price} / guest`
                  : fmt(price);
                return (
                  <button
                    key={key}
                    className={`qc-addon${on ? ' qc-addon--on' : ''}`}
                    onClick={() => toggleAddon(key)}
                    aria-pressed={on}
                  >
                    <CheckIcon checked={on} />
                    <div className="qc-addon__body">
                      <span className="qc-addon__name">{name}</span>
                      <span className="qc-addon__desc">{desc}</span>
                    </div>
                    <span className="qc-addon__price">{priceStr}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Live estimate ── */}
        <aside className="qc-result qc-item">
          <div className="qc-result__inner">

            <span className="qc-result__eyebrow">Estimated total</span>

            <div className="qc-result__amount">
              {hasGuests ? fmt(animatedTotal) : '—'}
            </div>

            {hasGuests && (
              <p className="qc-result__meta">
                {quote.guests} guests · {hours} hours
              </p>
            )}

            {/* Breakdown */}
            {hasGuests && (
              <div className="qc-breakdown">
                <div className="qc-breakdown__row">
                  <span>Base package (5 hrs)</span>
                  <span>{fmt(BASE)}</span>
                </div>
                {quote.items.map((item, i) => (
                  <div key={i} className="qc-breakdown__row qc-breakdown__row--addon">
                    <span>{item.label}</span>
                    <span>{fmt(item.amount)}</span>
                  </div>
                ))}
                <div className="qc-breakdown__total">
                  <span>Total</span>
                  <span>{fmt(quote.total)}</span>
                </div>
              </div>
            )}

            {/* Bartender tip */}
            {warnBartender && (
              <p className="qc-tip">
                For {quote.guests} guests, we recommend adding an extra bartender.
              </p>
            )}

            {!hasGuests && (
              <p className="qc-empty">
                Enter your guest count to see an instant estimate.
              </p>
            )}

            <a href="/contact" className="qc-cta">Book a consultation</a>

            <p className="qc-disclaimer">
              Final pricing may vary. Contact us for a personalized quote.
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default QuoteCalculator;
