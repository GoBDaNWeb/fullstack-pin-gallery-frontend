import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IModalSliceState } from "./types";

const initialState: IModalSliceState = {
  isOpenLoginModal: false,
  isOpenRegisterModal: false,
  isOpenMobileMenu: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleOpenLoginModal: (
      state: IModalSliceState,
      action: PayloadAction<boolean>
    ) => {
      state.isOpenLoginModal = action.payload;
    },
    handleOpenRegisterModal: (
      state: IModalSliceState,
      action: PayloadAction<boolean>
    ) => {
      state.isOpenRegisterModal = action.payload;
    },
    handleOpenMobileMenu: (state: IModalSliceState) => {
      state.isOpenMobileMenu = !state.isOpenMobileMenu;
    },
  },
});

export const modalReducer = modalSlice.reducer;

export const {
  handleOpenLoginModal,
  handleOpenRegisterModal,
  handleOpenMobileMenu,
} = modalSlice.actions;
