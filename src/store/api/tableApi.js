import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const tableApi = createApi({
  reducerPath: "tableApi",

  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Tables"],

  endpoints: (builder) => ({
    
    getTable: builder.query({
      query: () => "api/tables",
      providesTags: ["Tables"],
    }),

   
    addTable: builder.mutation({
      query: (data) => ({
        url: "api/tables",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tables"],
    }),

    
    updateTable: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: "api/bookings",
        method: "POST",
        body: {
          tableId: id,      
          ...updates,
        },
      }),
      invalidatesTags: ["Tables"],
    }),

    
    removeTable: builder.mutation({
      query: ({ id }) => ({
        url: `api/tables/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tables"],
    }),
  }),
});

export const {
  useGetTableQuery,
  useAddTableMutation,
  useUpdateTableMutation,
  useRemoveTableMutation,
} = tableApi;
