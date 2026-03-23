let cachedRate = null;
let cacheTime = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 час

export const getUsdRate = async () => {
  // Если курс в кэше и не устарел
  if (cachedRate && cacheTime && (Date.now() - cacheTime) < CACHE_DURATION) {
    return cachedRate;
  }

  try {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    cachedRate = data.Valute.USD.Value;
    cacheTime = Date.now();
    return cachedRate;
  } catch (error) {
    console.error('Ошибка получения курса:', error);
    return cachedRate || 90; // возвращаем кэшированный или дефолтный
  }
};