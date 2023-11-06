import { createSlice } from "@reduxjs/toolkit";


interface MetricParamsState {
    temperature: string;
    windSpeed: string;
    measure: string;
}

const initialState: MetricParamsState = {
    temperature: '°C',
    windSpeed: 'kph',
    measure: 'mm'
}

export const MetricParamsSlice = createSlice({
    name: 'metricParams',
    initialState,
    reducers: {
        changeTemperatureMetric: (state) => {
            if (state.temperature === '°C') state.temperature = '°F';
            else state.temperature = '°C';
        },
        changeWindSpeedMetric: (state) => {
            if (state.windSpeed === 'kph') state.windSpeed = 'mph';
            else state.windSpeed = 'kph';
        },
        changeMeasureMetric: (state) => {
            if (state.measure === 'mm') state.measure = 'in';
            else state.measure = 'mm';
        }
    }
});

export default MetricParamsSlice.reducer;
export const { changeTemperatureMetric } = MetricParamsSlice.actions;
export const { changeWindSpeedMetric } = MetricParamsSlice.actions;
export const { changeMeasureMetric } = MetricParamsSlice.actions;