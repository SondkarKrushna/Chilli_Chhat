import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/api/auth/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = registerApi;