import { ITranslate } from './ITranslate';
import { IWeather } from './IWeather';

export interface IPrevision {
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: IWeather[];
  coord: {
    lat: number;
    lon: number;
  }
  dt_txt: string
  translate: ITranslate[];
 
}