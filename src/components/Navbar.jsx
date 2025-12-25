import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Логотип + Telegram-ссылка слева */}
        <div className="d-flex align-items-center">
          {/* Название Donza */}
          <Link className="navbar-brand me-3" to="/">
            Donza
          </Link>

          {/* Кнопка Telegram-канала сразу после названия */}
          <a
            href="https://t.me/твой_канал" // ← Замени на реальную ссылку, например https://t.me/donzashop
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-info btn-sm d-flex align-items-center"
            style={{
              fontSize: '0.9rem',
              padding: '6px 12px',
              borderRadius: '6px'
            }}
          >
            <i className="bi bi-telegram me-2" style={{ fontSize: '1.2rem' }}></i>
            Наш Telegram
          </a>
        </div>

        {/* Основное меню справа */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Главная</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">Магазин</Link>
            </li>
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
