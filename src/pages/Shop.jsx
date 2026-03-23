import { useState } from 'react';
import ProductPrice from '../components/ProductPrice'; // 👈 Импортируем компонент

export default function Shop() {
  // 👇 МЕНЯЕМ: теперь цены в ДОЛЛАРАХ, а не в рублях
  const items = [
    { uc: 325, usdPrice: 4.44 },    // было 400₽ (при курсе 90)
    { uc: 660, usdPrice: 8.67 },     // было 780₽
    { uc: 1320, usdPrice: 17.11 },   // было 1540₽
    { uc: 1800, usdPrice: 22.00 },   // было 1980₽
    { uc: 3850, usdPrice: 42.22 },   // было 3800₽
    { uc: 8100, usdPrice: 84.44 },   // было 7600₽
    { uc: 16200, usdPrice: 168.89 }, // было 15200₽
    { uc: 24300, usdPrice: 253.33 }, // было 22800₽
    { uc: 32400, usdPrice: 337.78 }, // было 30400₽
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [gameId, setGameId] = useState('');
  const [loading, setLoading] = useState(false);

  // ← Флаг: true — показываем карты, false — скрываем (только СБП)
  const showCardPayments = false;

  const openModal = (item) => {
    setSelectedItem(item);
    setGameId('');
    setLoading(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setGameId('');
  };

  // 👇 НОВАЯ ФУНКЦИЯ для получения актуальной цены в рублях
  const getCurrentRubPrice = async (usdPrice) => {
    try {
      const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
      const data = await response.json();
      const rate = data.Valute.USD.Value;
      return Math.round(usdPrice * rate);
    } catch (error) {
      return Math.round(usdPrice * 90);
    }
  };

  const handlePay = async (method) => {
    if (!selectedItem) return;

    if (!gameId.trim()) {
      alert('Введите ваш игровой ID!');
      return;
    }

    setLoading(true);

    try {
      const orderId = `order-${selectedItem.uc}-${Date.now()}`;
      
      // 👇 Получаем актуальную цену в рублях перед отправкой
      const currentRubPrice = await getCurrentRubPrice(selectedItem.usdPrice);

      const response = await fetch('https://donza-webhook.onrender.com/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: currentRubPrice,  // 👈 Отправляем актуальную цену
          orderId,
          gameId: gameId.trim(),
          uc: selectedItem.uc,
          method
        }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.replace(data.link);
      } else {
        alert(data.error || 'Ошибка создания заказа');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '50px 15px' }}>
      <div className="container">
        <h2 className="text-center mb-4 text-white">Магазин UC</h2>
        <div className="row g-4">
          {items.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="card h-100 text-center shadow-sm"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(5px)',
                  borderRadius: '10px',
                  color: '#fff',
                }}
              >
                <div className="card-body">
                  <h5 className="card-title">{item.uc} UC</h5>
                  <p className="card-text">
                    <ProductPrice usdPrice={item.usdPrice} />  {/* 👈 ЗАМЕНИЛИ */}
                  </p>
                  <button
                    className="btn btn-success"
                    onClick={() => openModal(item)}
                  >
                    Купить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedItem && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '30px',
              maxWidth: '600px',
              width: '90%',
              textAlign: 'center',
              color: '#333',
              position: 'relative',
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>

            <h4 style={{ marginBottom: '20px' }}>
              {selectedItem.uc} UC (<ProductPrice usdPrice={selectedItem.usdPrice} />)  {/* 👈 ЗАМЕНИЛИ */}
            </h4>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Введите ваш игровой ID (куда зачислить UC):
              </label>
              <input
                type="text"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                placeholder="Ваш ID / ник / UID"
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '1rem',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => handlePay(44)}
                disabled={loading || !gameId.trim()}
              >
                {loading ? 'Загрузка...' : 'СБП (QR-код)'}
              </button>

              {showCardPayments && (
                <button
                  className="btn btn-success btn-lg"
                  onClick={() => handlePay(36)}
                  disabled={loading || !gameId.trim()}
                >
                  {loading ? 'Загрузка...' : 'Банковская карта'}
                </button>
              )}

              {showCardPayments && (
                <button
                  className="btn btn-info btn-lg"
                  onClick={() => handlePay(41)}
                  disabled={loading || !gameId.trim()}
                >
                  {loading ? 'Загрузка...' : 'VISA / MasterCard KZT'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}