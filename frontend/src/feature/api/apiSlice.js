import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TOKEN } from "../../constants/keys";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: async (headers, { getState, endpoint }) => {
      //todo
      //read token from auth state instead of local-storages
      // console.log(getState());

      let token = JSON.parse(localStorage.getItem(TOKEN));
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});
