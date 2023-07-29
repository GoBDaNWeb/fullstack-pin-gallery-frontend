import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCurrentPin } from "@/shared/store/slices/pin/pinSlice";
import { IPinQueryResponse, ICreatePinQuery } from "./types";

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

export const pinApi = createApi({
  reducerPath: "api/pin",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getPined: builder.query<IPinQueryResponse[], string | string[] | undefined>(
      {
        query: (params) => `/post/saved-pins/${params}`,
      }
    ),
    getAllPins: builder.query<IPinQueryResponse[], void>({
      query: () => "/post/all",
    }),
    getPopularPins: builder.query<IPinQueryResponse[], void>({
      query: () => "/post/popular",
    }),
    getCreated: builder.query<
      IPinQueryResponse[],
      string | string[] | undefined
    >({
      query: (params) => `/post/created-pins/${params}`,
    }),
    getOnePin: builder.query<IPinQueryResponse, string | string[] | undefined>({
      query: (id) => `/post/${id}`,
    }),
    addPin: builder.mutation<IPinQueryResponse, ICreatePinQuery>({
      query: (params) => ({
        url: "/post/create",
        method: "POST",
        body: params,
      }),
    }),
    addUploadPin: builder.mutation<{ url: string }, any>({
      query: (params) => ({
        url: "/upload",
        method: "POST",
        body: params,
      }),
    }),
    deletePin: builder.mutation<void, { pinId: string | string[] | undefined }>(
      {
        query: (params) => ({
          url: "/post/delete-pin",
          method: "DELETE",
          body: params,
        }),
      }
    ),
  }),
});

export const {
  useGetPinedQuery,
  useLazyGetPinedQuery,
  useGetAllPinsQuery,
  useGetPopularPinsQuery,
  useGetCreatedQuery,
  useGetOnePinQuery,
  useLazyGetOnePinQuery,
  useAddPinMutation,
  useAddUploadPinMutation,
  useDeletePinMutation,
} = pinApi;
