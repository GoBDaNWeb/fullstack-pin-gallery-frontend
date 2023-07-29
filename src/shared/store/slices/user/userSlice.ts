import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "./types";
import { IUser } from "@/shared/types/user.interface";

const initialState: IAuthState = {
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: IAuthState, action: PayloadAction<IUser>) => {
      state.data = action.payload;
    },
    logout: (state: IAuthState) => {
      state.data = null;
      window.localStorage.removeItem("token");
    },
  },
});

export const userReducer = userSlice.reducer;

export const { setUser, logout } = userSlice.actions;
