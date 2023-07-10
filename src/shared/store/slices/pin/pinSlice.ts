import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPinState, PinDataType } from './types';

const initialState: IPinState = {
    currentPin: null,
    isNewPins: true,
    isCreated: true,
};

const pinSlice = createSlice({
    name: 'pin',
    initialState,
    reducers: {
        setCurrentPin: (
            state: IPinState,
            action: PayloadAction<PinDataType>,
        ) => {
            state.currentPin = action.payload;
        },
        handleFetchPins: (state: IPinState, action: PayloadAction<boolean>) => {
            state.isNewPins = action.payload;
        },
        handleFetchPinsInProfile: (
            state: IPinState,
            action: PayloadAction<boolean>,
        ) => {
            state.isCreated = action.payload;
        },
    },
});

export const pinReducer = pinSlice.reducer;

export const { setCurrentPin, handleFetchPins, handleFetchPinsInProfile } =
    pinSlice.actions;
