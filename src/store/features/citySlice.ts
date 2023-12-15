import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


interface CityState {
    city: string;
    visibleCity: string;
    searchCity: string;
    myLocation: string;
}

const initialState: CityState = {
    city: '',
    visibleCity: '',
    searchCity: '',
    myLocation: ''
}

export const CitySlice = createSlice({
    name:'city',
    initialState,
    reducers: {
        changeCity: (state, action: PayloadAction<{ city: string }>) => {
            state.city = action.payload.city;
        },
        changeVisibleCity: (state, action : PayloadAction<{ visibleCity: string }>) => {
            state.visibleCity = action.payload.visibleCity;
        },
        changeSearchCity: (state, action : PayloadAction<{ searchCity: string }>) => {
            state.searchCity = action.payload.searchCity;
        },
        changeMyLocation: (state, action : PayloadAction<{ myLocation: string }>) => {
            state.myLocation = action.payload.myLocation;
        }
    }
});

export default CitySlice.reducer;
export const {changeCity} = CitySlice.actions;
export const {changeVisibleCity} = CitySlice.actions;
export const {changeSearchCity} = CitySlice.actions;
export const {changeMyLocation} = CitySlice.actions;