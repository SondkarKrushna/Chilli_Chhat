import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;

export const waiterPannelApi = createApi({
  reducerPath: "waiterPannelApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Orders"],   
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (data) => ({
        url: "/api/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useAddOrderMutation } = waiterPannelApi;
