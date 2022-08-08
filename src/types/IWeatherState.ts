import { IPrevision } from './IPrevision';

export interface IWeatherState{
    searchedCity: string;
    unit: boolean;
    lang: string;
    prevision: IPrevision;
}