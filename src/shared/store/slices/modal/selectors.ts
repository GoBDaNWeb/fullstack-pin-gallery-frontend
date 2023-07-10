import { RootState } from "../../index";

export const selectIsOpenLoginModal = (state: RootState) =>
  state.modal.isOpenLoginModal;
export const selectIsOpenRegisterModal = (state: RootState) =>
  state.modal.isOpenRegisterModal;
export const selectIsOpenMobileMenu = (state: RootState) =>
  state.modal.isOpenMobileMenu;
