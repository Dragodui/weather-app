import { configureStore } from "@reduxjs/toolkit";
import { WeatherSlice } from "./features/weatherSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { CitySlice } from "./features/citySlice";
import { CitiesSearchSlice } from "./features/citySearchSlice";
import { MetricParamsSlice } from "./features/metricParamsSlice";
import { DaySlice } from "./features/daySlice";

export const store = configureStore({
    reducer: {
        weather: WeatherSlice.reducer,
        city: CitySlice.reducer,
        citiesSearch: CitiesSearchSlice.reducer,
        metricParams: MetricParamsSlice.reducer,
        day: DaySlice.reducer,
    }
})

export const useAppDispatch: ()=>typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;