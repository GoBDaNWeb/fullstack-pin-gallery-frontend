import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from '@redux/user/userSlice';
import {
    IRegisterQuery,
    ILoginQuery,
    IAuthQueryResponse,
    ISavePinQuery,
    IRemovePinQuery,
    IUpdateAvatarQuery,
} from './types';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
        const token = window.localStorage.getItem('token');

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
    const result: any = await baseQuery(args, api, extraOptions);
    if (result.data && api.endpoint === 'getAuthMe') {
        api.dispatch(setUser(result?.data || null));
    }

    return result;
};

export const userApi = createApi({
    reducerPath: 'api/user',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Auth', 'Avatar'],
    endpoints: (builder) => ({
        getAuthMe: builder.query<IAuthQueryResponse, void>({
            query: () => '/users/auth/me',
            providesTags: ['Auth', 'Avatar'],
        }),
        getUser: builder.query<IAuthQueryResponse, string | undefined>({
            query: (id) => `/users/user/${id}`,
        }),
        addRegisterUser: builder.mutation<IAuthQueryResponse, IRegisterQuery>({
            query: (params) => ({
                url: '/users/auth/register',
                method: 'POST',
                body: params,
            }),
            invalidatesTags: ['Auth'],
        }),
        addLoginUser: builder.mutation<IAuthQueryResponse, ILoginQuery>({
            query: (params) => ({
                url: '/users/auth/login',
                method: 'POST',
                body: params,
            }),
            invalidatesTags: ['Auth'],
        }),
        addUploadUser: builder.mutation<{ url: string }, any>({
            query: (params) => ({
                url: '/upload',
                method: 'POST',
                body: params,
            }),
        }),
        updateUserSavePin: builder.mutation<void, ISavePinQuery>({
            query: (params) => ({
                url: '/users/save-pin',
                method: 'PATCH',
                body: params,
            }),
            invalidatesTags: ['Avatar'],
        }),
        updateUserRemovePin: builder.mutation<void, IRemovePinQuery>({
            query: (params) => ({
                url: '/users/remove-pin',
                method: 'PATCH',
                body: params,
            }),
        }),
        updateUserAvatar: builder.mutation<void, IUpdateAvatarQuery>({
            query: (params) => ({
                url: '/users/update-avatar',
                method: 'PATCH',
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
