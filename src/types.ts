
export interface ISearchedCity {
   geonameId: number;
   name: string;
   countryCode: string;
   adminName1: string;
}

export interface IWeatherParams {
    currentTempInC: number; 
    currentTempInF: number;
    condition: {
      text: string;
      icon: string;
    };
    windMph: number;
    windKph: number;
    humidity: number;
    precipMm: number;
    precipIn: number;
}

export interface IOptions {
    value: number;
    label: string;
}

export interface IForecastHour {
  chanceOfPrecip: number;
  tempInC: number;
  tempInF: number;
  condition: {
    text: string;
    icon: string;
  };
}


export interface IForecast {
  day: IWeatherParams;
  hour: IForecastHour[];
}

export type WeatherForHomePage = {
  weather:  IWeatherParams;
  city: string;
};