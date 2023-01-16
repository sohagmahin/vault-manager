import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TOKEN } from "../../constants/keys";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      let token = localStorage.getItem(TOKEN);
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});
