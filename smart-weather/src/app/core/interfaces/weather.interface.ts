export interface WeatherData {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  country: string;
  capital: string;
}

export interface WeatherApiResponse {
  current: {
    time: string;
    temperature_2m: number;
    weather_code: number;
  };
}

export interface HistoricalWeatherData {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
}

export interface HourlyForecastData {
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
}

export interface GeoApiResponse {
  results?: GeoLocation[];
}

export interface Country {
  name: string;
  capital: string;
}

export type SortColumn = 'temperature' | 'country';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  column: SortColumn;
  direction: SortDirection;
}

export interface WeatherConfig {
  itemsPerPage: number;
  defaultSort: SortConfig;
}

export interface TemperatureColors {
  hot: string;
  warm: string;
  mild: string;
  cool: string;
  cold: string;
  chilly: string;
  freezing: string;
  veryCold: string;
  extremeCold: string;
  arctic: string;
}
