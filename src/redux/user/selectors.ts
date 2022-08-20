import { RootState } from '../store';

export const selectAuth = (state: RootState) => Boolean(state.user.data);
export const selectAuthData = (state: RootState) => state.user.data;
export const selectIsOpenModal = (state: RootState) => state.user.isOpenModal;
export const selectIsOpenMobileMenu = (state: RootState) =>
    state.user.isOpenMobileMenu;
