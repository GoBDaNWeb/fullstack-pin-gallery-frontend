import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICommentQueryResponse } from "./types";

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

export const commentApi = createApi({
  reducerPath: "api/comment",
  baseQuery,
  endpoints: (builder) => ({
    getComments: builder.query<
      ICommentQueryResponse[],
      string | string[] | undefined
    >({
      query: (id) => `/comments/get-comments/${id}`,
    }),
    addComment: builder.mutation<
      void,
      { text: string; id: string | string[] | undefined }
    >({
      query: (params) => ({
        url: `/comments/add-comment/${params.id}`,
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useLazyGetCommentsQuery,
  useAddCommentMutation,
} = commentApi;
