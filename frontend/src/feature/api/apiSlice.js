import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TOKEN } from "../../constants/keys";
import { userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    //todo
    //read token from auth state instead of local-storages
    // console.log(getState());

    // let token = JSON.parse(localStorage.getItem(TOKEN));
    let token = getState().auth?.accessToken;
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOption) => {
    let result = await baseQuery(args, api, extraOption);
    if (result?.error?.status === 401) {
      api.dispatch(userLoggedOut());
      localStorage.clear();
    }
    return result;
  },
  tagTypes: ["vault", "user"],
  endpoints: (builder) => ({}),
});
