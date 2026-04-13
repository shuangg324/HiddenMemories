import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import emailjs from 'emailjs-com';
import '../App.css';

/* ── Calendar icon ───────────────────────────────────────── */
const CalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="cal-svg-icon">
    <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 1v4M11 1v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

/* ── Calendar picker ─────────────────────────────────────── */
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const DAY_NAMES = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const CalendarPicker = ({ value, onChange, disabled, id }) => {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const selectedDate = value ? new Date(value + 'T00:00:00') : null;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState(selectedDate || new Date());
  const [pos,  setPos]  = useState({ top: 0, left: 0, width: 0 });
  const triggerRef      = useRef(null);
  const dropdownRef     = useRef(null);

  /* Position dropdown below trigger */
  const openCalendar = () => {
    if (disabled) return;
    if (!open && triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 8, left: r.left, width: r.width });
    }
    setOpen(v => !v);
  };

  /* Close on outside click or scroll */
  useEffect(() => {
    if (!open) return;
    const onMouse = (e) => {
      if (
        triggerRef.current  && !triggerRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) setOpen(false);
    };
    const onScroll = () => setOpen(false);
    document.addEventListener('mousedown', onMouse);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('mousedown', onMouse);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [open]);

  const year        = view.getFullYear();
  const month       = view.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay    = new Date(year, month, 1).getDay();

  const prevMonth = () => setView(new Date(year, month - 1, 1));
  const nextMonth = () => setView(new Date(year, month + 1, 1));

  const handleDay = (day) => {
    const d = new Date(year, month, day);
    if (d < today) return;
    const yyyy = d.getFullYear();
    const mm   = String(d.getMonth() + 1).padStart(2, '0');
    const dd   = String(d.getDate()).padStart(2, '0');
    onChange(`${yyyy}-${mm}-${dd}`);
    setOpen(false);
  };

  const displayValue = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  const dropdown = (
    <div
      ref={dropdownRef}
      className="cal-dropdown"
      role="dialog"
      aria-label="Date picker"
      style={{ top: pos.top, left: pos.left, minWidth: Math.max(pos.width, 320) }}
    >
      <div className="cal-header">
        <button type="button" className="cal-nav" onClick={prevMonth} aria-label="Previous month">‹</button>
        <span className="cal-month-year">{MONTHS[month]} {year}</span>
        <button type="button" className="cal-nav" onClick={nextMonth} aria-label="Next month">›</button>
      </div>

      <div className="cal-grid">
        {DAY_NAMES.map(d => (
          <span key={d} className="cal-day-name">{d}</span>
        ))}

        {Array.from({ length: firstDay }, (_, i) => (
          <span key={`e${i}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day        = i + 1;
          const d          = new Date(year, month, day);
          const isPast     = d < today;
          const isToday    = d.toDateString() === today.toDateString();
          const isSelected = selectedDate &&
            d.getFullYear() === selectedDate.getFullYear() &&
            d.getMonth()    === selectedDate.getMonth()    &&
            d.getDate()     === selectedDate.getDate();

          return (
            <button
              key={day}
              type="button"
              className={`cal-day${isPast ? ' cal-day--past' : ''}${isSelected ? ' cal-day--selected' : ''}${isToday ? ' cal-day--today' : ''}`}
              onClick={() => handleDay(day)}
              disabled={isPast}
              tabIndex={isPast ? -1 : 0}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="cal-wrap">
      <button
        ref={triggerRef}
        id={id}
        type="button"
        className={`cf-input cal-trigger${open ? ' cal-trigger--open' : ''}${!displayValue ? ' cal-trigger--empty' : ''}`}
        onClick={openCalendar}
        disabled={disabled}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span>{displayValue || 'Select a date'}</span>
        <CalIcon />
      </button>

      {open && createPortal(dropdown, document.body)}
    </div>
  );
};

/* ── Toast notification ──────────────────────────────────── */
const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className={`contact-toast contact-toast--${toast.type}`} role="alert" aria-live="polite">
      <span className="contact-toast__icon" aria-hidden="true">
        {toast.type === 'success' ? '✓' : '!'}
      </span>
      <div className="contact-toast__body">
        <p className="contact-toast__title">
          {toast.type === 'success' ? 'Message sent!' : 'Something went wrong'}
        </p>
        <p className="contact-toast__msg">{toast.message}</p>
      </div>
      <button className="contact-toast__close" onClick={onClose} aria-label="Dismiss">×</button>
    </div>
  );
};

/* ── Main form ───────────────────────────────────────────── */
const WeddingContactForm = () => {
  const [formData, setFormData] = useState({
    firstName:   '',
    partnerName: '',
    email:       '',
    phone:       '',
    eventDate:   '',
    venue:       '',
    guestCount:  '',
    interested:  '',
    stage:       '',
    hearAbout:   '',
    moodboard:   '',
    message:     '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast]               = useState(null);
  const formRef = useRef(null);
  const pageRef = useRef(null);

  const closeToast = useCallback(() => setToast(null), []);

  /* Sequential stagger reveal */
  useEffect(() => {
    const items = pageRef.current?.querySelectorAll('.contact-item') ?? [];
    items.forEach((el, i) => {
      setTimeout(() => el.classList.add('contact-item--visible'), i * 85);
    });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (value) => {
    setFormData(prev => ({ ...prev, eventDate: value }));
    document.getElementById('eventDate')?.closest('.cf-field')?.classList.remove('cf-field--error');
  };

  const validateAndScrollToError = () => {
    const required = [
      { id: 'firstName',  label: 'Your name' },
      { id: 'email',      label: 'Email' },
      { id: 'phone',      label: 'Phone' },
      { id: 'eventDate',  label: 'Event date' },
      { id: 'interested', label: 'Interested in' },
      { id: 'stage',      label: 'Planning stage' },
      { id: 'hearAbout',  label: 'How you found us' },
    ];

    for (const field of required) {
      const value = formData[field.id];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        const el = document.getElementById(field.id);
        if (el) {
          el.closest('.cf-field')?.classList.add('cf-field--error');
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.focus();
        }
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAndScrollToError()) return;
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_t3znxtz',
        'template_eph0ydf',
        {
          user_name:      formData.firstName,
          partner_name:   formData.partnerName,
          user_email:     formData.email,
          phone:          formData.phone,
          event_date:     formData.eventDate,
          venue:          formData.venue,
          guest_count:    formData.guestCount,
          interested_in:  formData.interested,
          planning_stage: formData.stage,
          heard_about:    formData.hearAbout,
          moodboard_link: formData.moodboard,
          message: `Name: ${formData.firstName} | Partner: ${formData.partnerName} | Email: ${formData.email} | Phone: ${formData.phone} | Date: ${formData.eventDate} | Venue: ${formData.venue} | Guests: ${formData.guestCount} | Interested: ${formData.interested} | Stage: ${formData.stage} | Found us: ${formData.hearAbout} | Moodboard: ${formData.moodboard} | Message: ${formData.message}`,
          to_email: 'hiddenmemoriesbar@gmail.com',
        },
        '7j7vJcTfHGJ0hv0R4'
      );
      setToast({ type: 'success', message: 'We received your inquiry and will be in touch soon.' });
      setFormData({
        firstName: '', partnerName: '', email: '', phone: '',
        eventDate: '', venue: '', guestCount: '', interested: '',
        stage: '', hearAbout: '', moodboard: '', message: '',
      });
    } catch {
      setToast({ type: 'error', message: 'Please email us directly at hiddenmemoriesbar@gmail.com' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page" ref={pageRef}>
      <Toast toast={toast} onClose={closeToast} />

      {/* ── Left panel ── */}
      <aside className="contact-panel contact-item">
        <div className="contact-panel__inner">
          <span className="eyebrow">Get in touch</span>
          <h1 className="contact-panel__title">
            Let's make your event unforgettable
          </h1>
          <p className="contact-panel__sub">
            Tell us about your vision. We'll craft a custom experience tailored to your event.
          </p>

          <div className="contact-panel__details">
            <a href="tel:+16263674586" className="contact-panel__detail">
              <span className="contact-panel__detail-label">Phone</span>
              <span className="contact-panel__detail-value">(626) 367-4586</span>
            </a>
            <a href="mailto:hiddenmemoriesbar@gmail.com" className="contact-panel__detail">
              <span className="contact-panel__detail-label">Email</span>
              <span className="contact-panel__detail-value">hiddenmemoriesbar@gmail.com</span>
            </a>
            <div className="contact-panel__detail">
              <span className="contact-panel__detail-label">Service area</span>
              <span className="contact-panel__detail-value">Los Angeles County &amp; beyond</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Form ── */}
      <main className="contact-form-side">
        <form ref={formRef} id="contactForm" onSubmit={handleSubmit} noValidate>

          {/* 01 — About you */}
          <fieldset className="cf-section contact-item">
            <legend className="cf-section__legend">
              <span className="cf-section__num">01</span>
              About you
            </legend>

            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="firstName" className="cf-label">
                  Your name <span className="cf-required" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="cf-input"
                  placeholder="First and last name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="cf-field">
                <label htmlFor="partnerName" className="cf-label">
                  Partner's name
                </label>
                <input
                  type="text"
                  id="partnerName"
                  className="cf-input"
                  placeholder="If applicable"
                  value={formData.partnerName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="email" className="cf-label">
                  Email <span className="cf-required" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="cf-input"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="cf-field">
                <label htmlFor="phone" className="cf-label">
                  Phone <span className="cf-required" aria-hidden="true">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="cf-input"
                  placeholder="(000) 000-0000"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </fieldset>

          {/* 02 — Your event */}
          <fieldset className="cf-section contact-item">
            <legend className="cf-section__legend">
              <span className="cf-section__num">02</span>
              Your event
            </legend>

            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="eventDate" className="cf-label">
                  Event date <span className="cf-required" aria-hidden="true">*</span>
                </label>
                <CalendarPicker
                  id="eventDate"
                  value={formData.eventDate}
                  onChange={handleDateChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="cf-field">
                <label htmlFor="guestCount" className="cf-label">Estimated guests</label>
                <select
                  id="guestCount"
                  className="cf-input"
                  value={formData.guestCount}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="">Select a range</option>
                  <option value="1-25">1–25</option>
                  <option value="26-50">26–50</option>
                  <option value="51-75">51–75</option>
                  <option value="76-100">76–100</option>
                  <option value="101-150">101–150</option>
                  <option value="151-200">151–200</option>
                  <option value="200+">200+</option>
                </select>
              </div>
            </div>

            <div className="cf-field">
              <label htmlFor="venue" className="cf-label">Venue</label>
              <input
                type="text"
                id="venue"
                className="cf-input"
                placeholder="Where will your event take place?"
                value={formData.venue}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </fieldset>

          {/* 03 — What you need */}
          <fieldset className="cf-section contact-item">
            <legend className="cf-section__legend">
              <span className="cf-section__num">03</span>
              What you need
            </legend>

            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="interested" className="cf-label">
                  Interested in <span className="cf-required" aria-hidden="true">*</span>
                </label>
                <select
                  id="interested"
                  className="cf-input"
                  required
                  value={formData.interested}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="" disabled>Select</option>
                  <option value="openBar">Open bar</option>
                  <option value="CustomMenu">Custom set menu</option>
                  <option value="NoABV">Non-alcoholic drinks</option>
                  <option value="Beer_Wine">Beer / wine</option>
                  <option value="other">Other — let me know below</option>
                </select>
              </div>
              <div className="cf-field">
                <label htmlFor="stage" className="cf-label">
                  Planning stage <span className="cf-required" aria-hidden="true">*</span>
                </label>
                <select
                  id="stage"
                  className="cf-input"
                  required
                  value={formData.stage}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="" disabled>Select</option>
                  <option value="justExploring">Just exploring</option>
                  <option value="startingPlanning">Starting to plan</option>
                  <option value="vendorShopping">Shopping for vendors</option>
                  <option value="final">Ready to book</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* 04 — Anything else */}
          <fieldset className="cf-section contact-item">
            <legend className="cf-section__legend">
              <span className="cf-section__num">04</span>
              Anything else
            </legend>

            <div className="cf-field">
              <label htmlFor="hearAbout" className="cf-label">
                How did you find us? <span className="cf-required" aria-hidden="true">*</span>
              </label>
              <select
                id="hearAbout"
                className="cf-input"
                required
                value={formData.hearAbout}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="" disabled>Select</option>
                <option value="google">Google</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="theknot">The Knot / Thumbtack</option>
                <option value="referral">Friend or vendor referral</option>
                <option value="pastClient">Past client</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="cf-field">
              <label htmlFor="moodboard" className="cf-label">Mood board or Pinterest link</label>
              <input
                type="text"
                id="moodboard"
                className="cf-input"
                placeholder="Share a link to your inspiration"
                value={formData.moodboard}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="cf-field">
              <label htmlFor="message" className="cf-label">Message</label>
              <textarea
                id="message"
                className="cf-input cf-textarea"
                placeholder="Tell us more about your event, your style, or any questions you have"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </fieldset>

          {/* Submit */}
          <div className="cf-submit-row contact-item">
            <p className="cf-note">Fields marked * are required</p>
            <button
              type="submit"
              className="cf-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending…' : 'Send inquiry'}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default WeddingContactForm;
