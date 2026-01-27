import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;

export const chiefPannelApi = createApi({
    reducerPath: "chiefPannelApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),

    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => `api/orders/chef`,
            providesTags: ["Orders"],
        }),
        updateStatus: builder.mutation({
            query: (id, ...updates) => ({
                url: `api/orders/${id}/status`,
                method: "PUT",
                body: updates,
            }),
            invalidatesTags: ["Orders"],
        }),
    }),
});

export const { useGetOrdersQuery, useUpdateStatusMutation } = chiefPannelApi;