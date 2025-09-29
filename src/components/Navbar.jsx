import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Логотип / название */}
        <Link className="navbar-brand" to="/">Donza</Link>

        {/* Основное меню */}
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Главная</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">Магазин</Link>
            </li>

            {/* Кнопка поддержки в стиле обычного пункта меню */}
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://t.me/Dimon_sopr"
                target="_blank"
                rel="noreferrer"
              >
                Поддержка
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

