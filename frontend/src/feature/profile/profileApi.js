const { apiSlice } = require("../api/apiSlice");

const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: ["user"],
    }),

    updateProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
