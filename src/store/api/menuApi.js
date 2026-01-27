import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Menu"],

  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "api/dishes",
      providesTags: ["Menu"],
    }),

    getCategories: builder.query({
      query: () => "api/categories",
    }),

    addCategory: builder.mutation({
      query: (data) => ({
        url: "api/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Menu"],
    }),

    addItem: builder.mutation({
      query: (data) => ({
        url: "api/dishes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Menu"],
    }),
    removeCategory: builder.mutation({
      query: ({id}) => ({
        url: `api/categories/${id}`,
        methhod: "DELETE",
      }),
      invalidatesTags: ["Menu"],
    }),
    removeMenuItem: builder.mutation({
      query: ({id}) => ({
        url: `api/dishes/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Menu"],
    })
  }),
});

export const {
  useGetItemsQuery,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useAddItemMutation,
  useRemoveCategoryMutation,
  useRemoveMenuItemMutation,
} = menuApi;
