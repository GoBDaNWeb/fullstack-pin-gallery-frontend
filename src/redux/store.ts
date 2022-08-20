import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { userApi } from '@services/user/userApi';
import { pinApi } from '@services/pin/pinApi';
import { commentApi } from '@services/comment/commentApi';
import { pinReducer } from './pin/pinSlice';
import { userReducer } from './user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        pin: pinReducer,
        [userApi.reducerPath]: userApi.reducer,
        [pinApi.reducerPath]: pinApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(pinApi.middleware)
            .concat(commentApi.middleware),
});

// setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
