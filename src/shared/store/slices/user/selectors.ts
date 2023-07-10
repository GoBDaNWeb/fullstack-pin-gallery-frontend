import { RootState } from "../../index";

export const selectAuth = (state: RootState) => Boolean(state.user.data);
export const selectAuthData = (state: RootState) => state.user.data;
