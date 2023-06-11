const { apiSlice } = require("../api/apiSlice");

const vaultApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVault: builder.query({
      query: () => ({
        url: "/vault/all",
        method: "GET",
      }),
      providesTags: ["vault"],
    }),
    addVault: builder.mutation({
      query: ({ data }) => ({
        url: "/vault",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["vault"],
    }),
    updateVault: builder.mutation({
      query: ({ id, data }) => ({
        url: `/vault/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["vault"],
    }),
    removeVault: builder.mutation({
      query: (id) => ({
        url: `/vault/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vault"],
    }),
  }),
});

export const {
  useGetAllVaultQuery,
  useAddVaultMutation,
  useUpdateVaultMutation,
  useRemoveVaultMutation,
} = vaultApi;
