import { useCurrency } from '../context/CurrencyContext';

const ProductPrice = ({ usdPrice }) => {
  const { rate, loading } = useCurrency();

  if (loading && rate === null) {
    return <span>---</span>;
  }

  const currentRate = rate !== null ? rate : 90;
  return <>{Math.round(usdPrice * currentRate)} ₽</>;
};

export default ProductPrice;