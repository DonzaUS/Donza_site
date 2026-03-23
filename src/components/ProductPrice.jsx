import { useState, useEffect } from 'react';
import { getUsdRate } from '../utils/currency';

const ProductPrice = ({ usdPrice }) => {
  const [rubPrice, setRubPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const rate = await getUsdRate();
        const rubAmount = usdPrice * rate;
        setRubPrice(Math.round(rubAmount));
      } catch (error) {
        console.error('Ошибка:', error);
        setRubPrice(usdPrice * 90);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [usdPrice]);

  if (loading) {
    return <span>...</span>;
  }

  return (
    <>
      {rubPrice} ₽
    </>
  );
};

export default ProductPrice;