import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const chiefPannelApi = createApi({
  reducerPath: "chiefPannelApi",

  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include", 
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Orders"],

  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "/api/orders/chef",
      providesTags: ["Orders"],
    }),

    updateStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/orders/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useUpdateStatusMutation,
} = chiefPannelApi;
