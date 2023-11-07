import { IForecast, IWeatherParams } from './../../types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
    weather: IWeatherParams;
    forecast: IForecast[];
    currentWeather: IWeatherParams;
}

const initialState: WeatherState = {
    weather: {
        currentTempInC: 0,
        currentTempInF: 0,
        condition: {
            text: '',
            icon: ''
        },
        windMph: 0,
        windKph: 0,
        humidity: 0,
        precipMm: 0,
        precipIn: 0,
    },
    currentWeather: {
        currentTempInC: 0,
        currentTempInF: 0,
        condition: {
            text: '',
            icon: ''
        },
        windMph: 0,
        windKph: 0,
        humidity: 0,
        precipMm: 0,
        precipIn: 0,
    },
    forecast: []
};

export const WeatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeather: (state, action: PayloadAction<IWeatherParams>) => {
            state.weather = action.payload;
        },
        setForecast: (state, action: PayloadAction<IForecast[]>) => {
            state.forecast = action.payload;
        },
        setCurrentWeather: (state, action: PayloadAction<IWeatherParams>) => {
            state.currentWeather = action.payload;
        },
    }
});

export default WeatherSlice.reducer;
export const { setWeather } = WeatherSlice.actions;
export const { setCurrentWeather } = WeatherSlice.actions;
export const { setForecast } = WeatherSlice.actions;