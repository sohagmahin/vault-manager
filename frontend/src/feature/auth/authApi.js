import { userLoggedIn } from "./authSlice";
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

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: access_token,
              userId: id,
            })
          );
          dispatch(userLoggedIn({ accessToken: access_token, id: id }));
        } catch (err) {
          //do nothing
        }
      },
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/password-reset",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/password-reset/${data.userID}/${data.token}`,
        method: "POST",
        body: { password: data.password },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
