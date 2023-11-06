import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface DayState {
    day: string;
}

const initialState: DayState = {
    day:"1"
}

export const DaySlice = createSlice({
    name: 'setDay',
    initialState,
    reducers: {
        setDay: (state, action: PayloadAction<string>) => {
            state.day = action.payload;
        }
    }
});

export default DaySlice.reducer;
export const { setDay } = DaySlice.actions;