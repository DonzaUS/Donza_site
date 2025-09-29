import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="text-center mt-auto"
      style={{
        backgroundColor: "transparent", // убираем фон самого футера
      }}
    >
      {/* Ссылки без фона */}
      <div
        className="py-3"
        style={{
          backgroundColor: "transparent",
        }}
      >
        <Link
          to="/terms"
          className="d-block text-decoration-none mb-2"
          style={{
            color: "rgba(255,255,255,0.40)",
            backgroundColor: "transparent",
          }}
        >
          Пользовательское соглашение
        </Link>
        <Link
          to="/privacy"
          className="d-block text-decoration-none"
          style={{
            color: "rgba(255, 255, 255, 0.40)",
            backgroundColor: "transparent",
          }}
        >
          Политика конфиденциальности
        </Link>
      </div>

      {/* Тёмная полоса только под копирайт */}
      <div
        className="text-white py-2"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }} // можно и полностью transparent
      >
        © {new Date().getFullYear()} Donza. Все права защищены.
      </div>
    </footer>
  );
}
