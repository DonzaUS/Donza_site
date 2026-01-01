import { useState } from "react";

export default function Shop() {
  const items = [
    { uc: 325, price: 450 },
    { uc: 660, price: 820 },
    { uc: 1320, price: 1600 },
    { uc: 1800, price: 2050 },
    { uc: 3850, price: 3995 },
    { uc: 8100, price: 7900 },
    { uc: 16200, price: 15800 },
    { uc: 24300, price: 23700 },
    { uc: 32400, price: 31600 },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [gameId, setGameId] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = (item) => {
    setSelectedItem(item);
    setGameId("");
    setLoading(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setGameId("");
  };

  const handlePay = async (method) => {
    if (!selectedItem) return;

    if (!gameId.trim()) {
      alert("Введите ваш игровой ID!");
      return;
    }

    setLoading(true);

    try {
      const orderId = `order-${selectedItem.uc}-${Date.now()}`;

      const response = await fetch("https://api.donza.site/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedItem.price,
          orderId,
          gameId: gameId.trim(),
          uc: selectedItem.uc,
          method,
        }),
      });

      const data = await response.json();

      if (data.success) {
        window.open(data.link, '_blank', 'noopener,noreferrer'); // Открывает в новой вкладке — без попапа
      } else {
        alert(data.error || "Ошибка создания заказа");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка соединения с сервером");
    } finally {
      setLoading(false);
    }
  };

  // Остальной return без изменений — оставляю как есть
  return (
    <div style={{ minHeight: "100vh", padding: "50px 15px" }}>
      {/* ... весь return из твоего кода ... */}
    </div>
  );
}