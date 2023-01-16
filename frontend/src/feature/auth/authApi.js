import { userLoggedIn } from "./authSlice";

const { TOKEN, USER_ID } = require("../../constants/keys");
const { apiSlice } = require("../api/apiSlice");

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          let access_token = result.data.access_token;
          let id = result.data.id;
          localStorage.setItem(TOKEN, JSON.stringify(access_token));
          localStorage.setItem(USER_ID, JSON.stringify(id));
          dispatch(userLoggedIn({ accessToken: access_token, id: id }));
        } catch (err) {
          //do nothing
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
