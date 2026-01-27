import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const waiterPannelApi = createApi({
  reducerPath: "waiterPannelApi",

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Orders", "Categories", "MenuItems", "Tables"],

  endpoints: (builder) => ({
    // ✅ Get Categories
    getCategories: builder.query({
      query: () => "/api/categories",
      providesTags: ["Categories"],
    }),

    // ✅ Get Menu Items
    getMenuItems: builder.query({
      query: () => "/api/dishes",
      providesTags: ["MenuItems"],
    }),

    // ✅ Get Tables
    getTables: builder.query({
      query: () => "/api/tables",
      providesTags: ["Tables"],
    }),

    // ✅ Add Order
    addOrder: builder.mutation({
      query: (orderData) => ({
        url: "/api/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders", "Tables"],
    }),

    getOrders: builder.query({
      query: () => "/api/orders/waiter",
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetMenuItemsQuery,
  useGetTablesQuery,
  useAddOrderMutation,
  useGetOrdersQuery,
} = waiterPannelApi;
