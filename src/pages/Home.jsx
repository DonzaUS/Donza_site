import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url("/photo_1.jpg")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 16px",
        textAlign: "center"
      }}
    >
      <h1 className="display-4 text-warning">Добро пожаловать в Donza</h1>
      <p className="lead text-light mb-4">
        У нас вы можете приобрести игровую валюту (UC) по выгодным ценам.
      </p>
      <Link to="/shop" className="btn btn-primary btn-lg">
        Перейти в магазин
      </Link>
    </div>
  );
}
