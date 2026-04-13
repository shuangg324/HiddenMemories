import { Link } from 'react-router-dom';
import { useModal } from '../utils/modalContext';

const NAV = [
  { label: 'Home',     to: '/' },
  { label: 'Gallery',  to: '/gallery' },
  { label: 'Packages', to: '/packages' },
  { label: 'Quote',    to: '/quote' },
  { label: 'Contact',  to: '/contact' },
];

const Footer = () => {
  const { openModal } = useModal();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner container">

        {/* Brand */}
        <div className="site-footer__brand">
          <span className="site-footer__name">Hidden Memories</span>
          <p className="site-footer__tagline">
            Bespoke mobile bartending&nbsp;·&nbsp;LA County &amp; surrounding areas
          </p>
          <a href="tel:+16263674586" className="site-footer__phone">
            (626) 367-4586
          </a>
        </div>

        {/* Nav */}
        <nav className="site-footer__nav" aria-label="Footer navigation">
          {NAV.map(({ label, to }) => (
            <Link key={to} to={to} className="site-footer__link">
              {label}
            </Link>
          ))}
          <button className="site-footer__link" onClick={openModal}>
            About
          </button>
        </nav>

      </div>

      {/* Bottom bar */}
      <div className="site-footer__bottom container">
        <span className="site-footer__copy">
          &copy; {year} Hidden Memories Bar. Licensed &amp; insured.
        </span>
        <span className="site-footer__legal">
          Serving Los Angeles County, CA
        </span>
      </div>
    </footer>
  );
};

export default Footer;
