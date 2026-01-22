import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;

export const waiterPannelApi = createApi({
  reducerPath: "waiterPannelApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include", 
    prepareHeaders: (headers, {getState}) =>{
      const token = getState().auth.token;

      if(token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
   }),
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
