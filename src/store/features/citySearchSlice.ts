import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ISearchedCity } from "../../types";

interface CitiesSearchState {
    citiesSearch: ISearchedCity[];
}

const initialState: CitiesSearchState = {
    citiesSearch: []
}

export const CitiesSearchSlice = createSlice({
    name: 'citiesSearch',
    initialState,
    reducers: {
        setCities: (state, action: PayloadAction<ISearchedCity[]>) => {
            state.citiesSearch = action.payload;
        }
    }
})

export default CitiesSearchSlice.reducer;
export const { setCities } = CitiesSearchSlice.actions;