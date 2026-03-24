import { useState, useEffect } from 'react';

const ProductPrice = ({ usdPrice }) => {
  const [rubPrice, setRubPrice] = useState(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await fetch('https://donza-webhook.onrender.com/api/rate');
        const data = await response.json();
        if (data.success) {
          setRubPrice(Math.round(usdPrice * data.rate));
        } else {
          setRubPrice(usdPrice * 90);
        }
      } catch (error) {
        console.error('Ошибка получения курса:', error);
        setRubPrice(usdPrice * 90);
      }
    };
    
    fetchRate();
  }, [usdPrice]);

  if (rubPrice === null) {
    return <span>---</span>;
  }

  return <>{rubPrice} ₽</>;
};

export default ProductPrice;