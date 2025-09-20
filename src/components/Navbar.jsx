import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Donza</Link>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Главная</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">Магазин</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/privacy">Политика</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/terms">Соглашение</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

