import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { userApi } from "@/api";
import { pinApi } from "@/api";
import { commentApi } from "@/api";
import { pinReducer } from "./slices/pin/pinSlice";
import { userReducer } from "./slices/user/userSlice";
import { modalReducer } from "./slices/modal/modalSlice";
import { createWrapper } from "next-redux-wrapper";

export const store = () =>
  configureStore({
    reducer: {
      user: userReducer,
      pin: pinReducer,
      modal: modalReducer,
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

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<AppStore>(store, { debug: true });
