import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const appUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: appUrl }),
  endpoints: (builder) => ({}),
});
