import { useState } from 'react';

export default function Shop() {
  const items = [
    { uc: 325, price: 425 },
    { uc: 660, price: 850 },
    { uc: 1320, price: 1700 },
    { uc: 1800, price: 2125 },
    { uc: 3850, price: 3995 },
    { uc: 8100, price: 7990 },
    { uc: 16200, price: 15980 },
    { uc: 24300, price: 23970 },
    { uc: 32400, price: 31960 },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [gameId, setGameId] = useState('');
  const [loading, setLoading] = useState(false);

  const openModal = (item) => {
    setSelectedItem(item);
    setGameId('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setGameId('');
  };

  const handlePayment = async (method) => {
    if (!selectedItem) return;

    // Проверка на игровой ID
    if (!gameId.trim()) {
      alert('Введите ваш игровой ID!');
      return;
    }

    setLoading(true);

    try {
      const orderId = `order-${selectedItem.uc}-${Date.now()}`;

      // Лог для проверки — что отправляем на сервер
      console.log('Отправляем на сервер:', {
        amount: selectedItem.price,
        orderId,
        method,
        gameId: gameId.trim(),
        uc: selectedItem.uc
      });

      const response = await fetch('https://api.donza.site/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedItem.price,
          orderId,
          method,
          email: 'client@telegram.org',
          gameId: gameId.trim(),
          uc: selectedItem.uc
        })
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = data.link; // Переход на оплату
      } else {
        alert(data.error || 'Ошибка создания заказа');
      }
    } catch (error) {
      console.error('Ошибка при оплате:', error);
      alert('Ошибка соединения с сервером. Попробуйте позже.');
    } finally {
      setLoading(false);
      closeModal();
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
                  <p className="card-text">{item.price} ₽</p>
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
              maxWidth: '450px',
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
              {selectedItem.uc} UC ({selectedItem.price} ₽)
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

            <p style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#666' }}>
              Выберите способ оплаты:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button className="btn btn-primary" onClick={() => handlePayment(44)} disabled={loading}>
                {loading ? 'Загрузка...' : 'СБП (QR-код)'}
              </button>
              <button className="btn btn-success" onClick={() => handlePayment(36)} disabled={loading}>
                {loading ? 'Загрузка...' : 'Банковская карта'}
              </button>
              <button className="btn btn-info" onClick={() => handlePayment(43)} disabled={loading}>
                {loading ? 'Загрузка...' : 'SberPay'}
              </button>
              <button className="btn btn-warning" onClick={() => handlePayment(45)} disabled={loading}>
                {loading ? 'Загрузка...' : 'Тинькофф Pay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}