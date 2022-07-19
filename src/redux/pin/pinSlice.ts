import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { IPinState} from './types'


const initialState: IPinState = {
    items: [],
    isNewPins: true,
    isCreated: true
}

const pinSlice = createSlice({
    name: 'pin',
    initialState,
    reducers: {
        handleFetchPins: (state: IPinState, action: PayloadAction<boolean>) => {
            state.isNewPins = action.payload
        },
        handleFetchPinsInProfile: (state: IPinState, action: PayloadAction<boolean>) => {
            state.isCreated = action.payload
        }
    },
})

export const pinReducer = pinSlice.reducer


export const {handleFetchPins, handleFetchPinsInProfile} = pinSlice.actions