import {RootState} from '../store'

export const selectPins = (state: RootState) => state.pin
export const selectCurrentPin = (state: RootState) => state.pin.currentPin