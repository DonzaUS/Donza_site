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

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url('photo_1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '50px 15px',
      }}
    >
      <div className="container">
        <h2 className="text-center mb-4 text-white">Магазин UC</h2>
        <div className="row g-4">
          {items.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="card h-100 text-center shadow-sm"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.4)', // чёрный с прозрачностью 60%
                  backdropFilter: 'blur(5px)',
                  borderRadius: '10px',
                  color: '#fff', // текст белый для контраста
                }}
              >
                <div className="card-body">
                  <h5 className="card-title">{item.uc} UC</h5>
                  <p className="card-text">{item.price} ₽</p>
                  <button className="btn btn-success">Купить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
