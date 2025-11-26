import { Country, TemperatureColors, WeatherConfig } from '../../core/interfaces/weather.interface';

// Константы для погодных кодов
export const WEATHER_CODE_CLEAR = 0;
export const WEATHER_CODE_PARTLY_CLOUDY = 1;
export const WEATHER_CODE_CLOUDY = 2;
export const WEATHER_CODE_OVERCAST = 3;
export const WEATHER_CODE_FOG = 45;
export const WEATHER_CODE_DEPOSITING_RIME_FOG = 48;
export const WEATHER_CODE_LIGHT_DRIZZLE = 51;
export const WEATHER_CODE_MODERATE_DRIZZLE = 53;
export const WEATHER_CODE_DENSE_DRIZZLE = 55;
export const WEATHER_CODE_LIGHT_RAIN = 61;
export const WEATHER_CODE_MODERATE_RAIN = 63;
export const WEATHER_CODE_HEAVY_RAIN = 65;
export const WEATHER_CODE_LIGHT_SNOW = 71;
export const WEATHER_CODE_MODERATE_SNOW = 73;
export const WEATHER_CODE_HEAVY_SNOW = 75;
export const WEATHER_CODE_SNOW_GRAINS = 77;
export const WEATHER_CODE_LIGHT_SHOWER = 80;
export const WEATHER_CODE_MODERATE_SHOWER = 81;
export const WEATHER_CODE_VIOLENT_SHOWER = 82;
export const WEATHER_CODE_LIGHT_SNOW_SHOWER = 85;
export const WEATHER_CODE_HEAVY_SNOW_SHOWER = 86;
export const WEATHER_CODE_THUNDERSTORM = 95;
export const WEATHER_CODE_THUNDERSTORM_HAIL = 96;
export const WEATHER_CODE_HEAVY_THUNDERSTORM_HAIL = 99;

export const WEATHER_ICONS: Record<number, string> = {
  [WEATHER_CODE_CLEAR]: '☀️',
  [WEATHER_CODE_PARTLY_CLOUDY]: '🌤️',
  [WEATHER_CODE_CLOUDY]: '⛅',
  [WEATHER_CODE_OVERCAST]: '☁️',
  [WEATHER_CODE_FOG]: '🌫️',
  [WEATHER_CODE_DEPOSITING_RIME_FOG]: '🌫️',
  [WEATHER_CODE_LIGHT_DRIZZLE]: '🌦️',
  [WEATHER_CODE_MODERATE_DRIZZLE]: '🌦️',
  [WEATHER_CODE_DENSE_DRIZZLE]: '🌦️',
  [WEATHER_CODE_LIGHT_RAIN]: '🌧️',
  [WEATHER_CODE_MODERATE_RAIN]: '🌧️',
  [WEATHER_CODE_HEAVY_RAIN]: '🌧️',
  [WEATHER_CODE_LIGHT_SNOW]: '❄️',
  [WEATHER_CODE_MODERATE_SNOW]: '❄️',
  [WEATHER_CODE_HEAVY_SNOW]: '❄️',
  [WEATHER_CODE_SNOW_GRAINS]: '🌨️',
  [WEATHER_CODE_LIGHT_SHOWER]: '🌦️',
  [WEATHER_CODE_MODERATE_SHOWER]: '🌧️',
  [WEATHER_CODE_VIOLENT_SHOWER]: '⛈️',
  [WEATHER_CODE_LIGHT_SNOW_SHOWER]: '🌨️',
  [WEATHER_CODE_HEAVY_SNOW_SHOWER]: '🌨️',
  [WEATHER_CODE_THUNDERSTORM]: '⛈️',
  [WEATHER_CODE_THUNDERSTORM_HAIL]: '⛈️',
  [WEATHER_CODE_HEAVY_THUNDERSTORM_HAIL]: '⛈️',
};

export const WEATHER_DESCRIPTIONS: Record<number, string> = {
  [WEATHER_CODE_CLEAR]: 'Ясно',
  [WEATHER_CODE_PARTLY_CLOUDY]: 'Преимущественно ясно',
  [WEATHER_CODE_CLOUDY]: 'Переменная облачность',
  [WEATHER_CODE_OVERCAST]: 'Пасмурно',
  [WEATHER_CODE_FOG]: 'Туман',
  [WEATHER_CODE_DEPOSITING_RIME_FOG]: 'Туман с инеем',
  [WEATHER_CODE_LIGHT_DRIZZLE]: 'Легкая морось',
  [WEATHER_CODE_MODERATE_DRIZZLE]: 'Умеренная морось',
  [WEATHER_CODE_DENSE_DRIZZLE]: 'Сильная морось',
  [WEATHER_CODE_LIGHT_RAIN]: 'Небольшой дождь',
  [WEATHER_CODE_MODERATE_RAIN]: 'Умеренный дождь',
  [WEATHER_CODE_HEAVY_RAIN]: 'Сильный дождь',
  [WEATHER_CODE_LIGHT_SNOW]: 'Небольшой снег',
  [WEATHER_CODE_MODERATE_SNOW]: 'Умеренный снег',
  [WEATHER_CODE_HEAVY_SNOW]: 'Сильный снег',
  [WEATHER_CODE_SNOW_GRAINS]: 'Снежные зерна',
  [WEATHER_CODE_LIGHT_SHOWER]: 'Небольшой ливень',
  [WEATHER_CODE_MODERATE_SHOWER]: 'Умеренный ливень',
  [WEATHER_CODE_VIOLENT_SHOWER]: 'Сильный ливень',
  [WEATHER_CODE_LIGHT_SNOW_SHOWER]: 'Небольшой снегопад',
  [WEATHER_CODE_HEAVY_SNOW_SHOWER]: 'Сильный снегопад',
  [WEATHER_CODE_THUNDERSTORM]: 'Гроза',
  [WEATHER_CODE_THUNDERSTORM_HAIL]: 'Гроза с градом',
  [WEATHER_CODE_HEAVY_THUNDERSTORM_HAIL]: 'Сильная гроза с градом',
};

// Константы для температурных диапазонов
export const TEMPERATURE_RANGES = {
  EXTREME_HEAT: 30,
  HOT: 25,
  WARM: 20,
  MILD: 15,
  COOL: 10,
  COLD: 5,
  CHILLY: 0,
  FREEZING: -5,
  VERY_COLD: -10,
  ARCTIC: -Infinity,
} as const;

export const TEMPERATURE_COLORS: TemperatureColors = {
  hot: '#e53e3e',
  warm: '#ed8936',
  mild: '#ecc94b',
  cool: '#48bb78',
  cold: '#38b2ac',
  chilly: '#4299e1',
  freezing: '#667eea',
  veryCold: '#9f7aea',
  extremeCold: '#ed64a6',
  arctic: '#c53030',
};

// Константы для пагинации
export const PAGINATION_CONFIG = {
  DEFAULT_ITEMS_PER_PAGE: 6,
  VISIBLE_PAGES_RANGE: 2,
  MAX_PAGES_WITHOUT_DOTS: 7,
} as const;

// Константы для API
export const API_CONFIG = {
  GEOCODING_BASE_URL: 'https://geocoding-api.open-meteo.com/v1/search',
  WEATHER_BASE_URL: 'https://api.open-meteo.com/v1/forecast',
  DEFAULT_HISTORICAL_DAYS: 7,
  DEFAULT_FORECAST_HOURS: 24,
  DEFAULT_LOCATION_COUNT: 1,
} as const;

export const COUNTRIES: Country[] = [
  { name: 'Россия', capital: 'Москва', lat: 55.7558, lon: 37.6173 },
  { name: 'Беларусь', capital: 'Минск', lat: 53.9, lon: 27.5667 },
  { name: 'Украина', capital: 'Киев', lat: 50.45, lon: 30.5233 },
  { name: 'Казахстан', capital: 'Астана', lat: 51.1333, lon: 71.4333 },
  { name: 'Узбекистан', capital: 'Ташкент', lat: 41.3167, lon: 69.25 },
  { name: 'Азербайджан', capital: 'Баку', lat: 40.3667, lon: 49.8352 },
  { name: 'Грузия', capital: 'Тбилиси', lat: 41.7167, lon: 44.7833 },
  { name: 'Кыргызстан', capital: 'Бишкек', lat: 42.8667, lon: 74.5667 },
  { name: 'Таджикистан', capital: 'Душанбе', lat: 38.5731, lon: 68.7864 },
  { name: 'Туркменистан', capital: 'Ашхабад', lat: 37.95, lon: 58.3833 },
  { name: 'Молдова', capital: 'Кишинев', lat: 47.0167, lon: 28.85 },
  { name: 'Армения', capital: 'Ереван', lat: 40.1833, lon: 44.5167 },
];

export const WEATHER_CONFIG: WeatherConfig = {
  itemsPerPage: PAGINATION_CONFIG.DEFAULT_ITEMS_PER_PAGE,
  defaultSort: {
    column: 'temperature',
    direction: 'desc',
  },
};
export const CHART_CONFIG = {
  COLORS: [
    '#6366f1',
    '#8b5cf6',
    '#ec4899',
    '#f59e0b',
    '#10b981',
    '#ef4444',
    '#3b82f6',
    '#84cc16',
    '#f97316',
    '#06b6d4',
    '#a855f7',
    '#14b8a6',
    '#f43f5e',
  ],
  PAGE_SIZE: 6,
  WIND_DIRECTIONS: [
    { min: 337.5, max: 22.5, direction: 'С' },
    { min: 22.5, max: 67.5, direction: 'СВ' },
    { min: 67.5, max: 112.5, direction: 'В' },
    { min: 112.5, max: 157.5, direction: 'ЮВ' },
    { min: 157.5, max: 202.5, direction: 'Ю' },
    { min: 202.5, max: 247.5, direction: 'ЮЗ' },
    { min: 247.5, max: 292.5, direction: 'З' },
    { min: 292.5, max: 337.5, direction: 'СЗ' },
  ],
};
