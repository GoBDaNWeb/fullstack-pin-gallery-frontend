import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IAuthState, IAuthQueryResponse} from './types'

const initialState: IAuthState = {
    data: null,
    isOpenModal: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: IAuthState, action: PayloadAction<IAuthQueryResponse>) => {
            state.data = action.payload
        },
        logout: (state: IAuthState) => {
            state.data = null
            window.localStorage.removeItem('token')
        },
        handleOpenModal: (state: IAuthState, action: PayloadAction<boolean>) => {
            state.isOpenModal = action.payload
        },
    },
})

export const userReducer = userSlice.reducer

export const {setUser, logout, handleOpenModal} = userSlice.actions