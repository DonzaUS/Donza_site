import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRateFromServer = async () => {
    try {
      const response = await fetch('https://donza-webhook.onrender.com/api/rate');
      const data = await response.json();
      if (data.success) {
        const newRate = data.rate;
        setRate(newRate);
        
        // Сохраняем в localStorage
        localStorage.setItem('cachedRate', newRate);
        localStorage.setItem('cachedRateTime', Date.now().toString());
        
        return newRate;
      }
      return null;
    } catch (error) {
      console.error('Ошибка получения курса:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadRate = async () => {
      // Проверяем localStorage
      const cachedRate = localStorage.getItem('cachedRate');
      const cachedTime = localStorage.getItem('cachedRateTime');
      const FOUR_HOURS = 4 * 60 * 60 * 1000;
      
      // Если есть свежий кэш (меньше 4 часов)
      if (cachedRate && cachedTime && (Date.now() - parseInt(cachedTime)) < FOUR_HOURS) {
        console.log('📦 Используем кэш браузера, курс:', cachedRate);
        setRate(parseFloat(cachedRate));
        setLoading(false);
        
        // В фоне обновляем курс
        fetchRateFromServer().then(newRate => {
          if (newRate && newRate !== parseFloat(cachedRate)) {
            console.log('🔄 Курс обновлен в фоне:', newRate);
            setRate(newRate);
          }
        });
        return;
      }
      
      // Нет кэша или устарел - ждем сервер
      console.log('🌐 Загружаем курс с сервера...');
      const serverRate = await fetchRateFromServer();
      
      if (serverRate) {
        setRate(serverRate);
      } else {
        const oldCachedRate = localStorage.getItem('cachedRate');
        if (oldCachedRate) {
          setRate(parseFloat(oldCachedRate));
        } else {
          setRate(90);
        }
      }
      
      setLoading(false);
    };
    
    loadRate();
  }, []);

  const refreshRate = async () => {
    setLoading(true);
    await fetchRateFromServer();
    setLoading(false);
  };

  return (
    <CurrencyContext.Provider value={{ rate, loading, refreshRate }}>
      {children}
    </CurrencyContext.Provider>
  );
};