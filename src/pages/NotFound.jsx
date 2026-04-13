import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="notfound">
    <div className="notfound__inner">
      <span className="notfound__code">404</span>
      <h1 className="notfound__title">Page not found</h1>
      <p className="notfound__sub">
        Looks like this page got lost at the bottom of a glass.
      </p>
      <Link to="/" className="btn-primary notfound__btn">
        Back to home
      </Link>
    </div>
  </div>
);

export default NotFound;
