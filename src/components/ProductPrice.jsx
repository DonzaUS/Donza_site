import { useCurrency } from '../context/CurrencyContext';

const ProductPrice = ({ usdPrice }) => {
  const { rate, loading } = useCurrency();

  if (loading && rate === null) {
    return (
      <div className="skeleton-shimmer">
        <style>{`
          .skeleton-shimmer {
            display: inline-block;
            width: 70px;
            height: 28px;
            background: linear-gradient(
              110deg,
              rgba(255, 255, 255, 0.15) 0%,
              rgba(255, 255, 255, 0.35) 20%,
              rgba(255, 255, 255, 0.15) 40%,
              rgba(255, 255, 255, 0.35) 60%,
              rgba(255, 255, 255, 0.15) 80%,
              rgba(255, 255, 255, 0.35) 100%
            );
            background-size: 200% 100%;
            animation: shimmer 1.8s infinite linear;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }
          
          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `}</style>
      </div>
    );
  }

  const currentRate = rate !== null ? rate : 90;
  return <>{Math.round(usdPrice * currentRate)} ₽</>;
};

export default ProductPrice;