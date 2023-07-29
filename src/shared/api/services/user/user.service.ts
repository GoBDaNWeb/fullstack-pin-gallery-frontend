import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "@/shared/store/slices/user/userSlice";
import {
  IRegisterQuery,
  ILoginQuery,
  ISavePinQuery,
  IRemovePinQuery,
  IUpdateAvatarQuery,
} from "./types";
import { IUser } from "@/shared/types/user.interface";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_ENV_API_URL,
  prepareHeaders: (headers) => {
    const token = window.localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  const result: any = await baseQuery(args, api, extraOptions);
  if (result.data && api.endpoint === "getAuthMe") {
    api.dispatch(setUser(result?.data || null));
  }

  return result;
};

export const userApi = createApi({
  reducerPath: "api/user",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Auth", "Avatar"],
  endpoints: (builder) => ({
    getAuthMe: builder.query<IUser, void>({
      query: () => "/users/auth/me",
      providesTags: ["Auth", "Avatar"],
      keepUnusedDataFor: 0,
    }),
    getUser: builder.query<IUser, string | string[] | undefined>({
      query: (id) => `/users/user/${id}`,
    }),
    addRegisterUser: builder.mutation<IUser, IRegisterQuery>({
      query: (params) => ({
        url: "/users/auth/register",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["Auth"],
    }),
    addLoginUser: builder.mutation<IUser, ILoginQuery>({
      query: (params) => ({
        url: "/users/auth/login",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["Auth"],
    }),
    addUploadUser: builder.mutation<{ url: string }, any>({
      query: (params) => ({
        url: "/upload",
        method: "POST",
        body: params,
      }),
    }),
    updateUserSavePin: builder.mutation<void, ISavePinQuery>({
      query: (params) => ({
        url: "/users/save-pin",
        method: "PATCH",
        body: params,
      }),
      invalidatesTags: ["Avatar"],
    }),
    updateUserRemovePin: builder.mutation<void, IRemovePinQuery>({
      query: (params) => ({
        url: "/users/remove-pin",
        method: "PATCH",
        body: params,
      }),
    }),
    updateUserAvatar: builder.mutation<void, IUpdateAvatarQuery>({
      query: (params) => ({
        url: "/users/update-avatar",
        method: "PATCH",
        body: params,
      }),
    }),
  }),
});

export const {
  useGetAuthMeQuery,
  useLazyGetAuthMeQuery,
  useGetUserQuery,
  useAddRegisterUserMutation,
  useAddLoginUserMutation,
  useAddUploadUserMutation,
  useUpdateUserSavePinMutation,
  useUpdateUserRemovePinMutation,
  useUpdateUserAvatarMutation,
} = userApi;
