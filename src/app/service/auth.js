import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiURL = process.env.API_URL 
              ? process.env.API_URL 
              : "https://pklaos88.online";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    prepareHeaders: (headers, {getState}) => {
      headers.set( "content-type", "application/json",)
      return headers;
    }
  }),
  endpoints: (build) => ({
    refreshToken: build.mutation({
      query: ({accessToken, refreshToken}) => ({
        url: '/api/auth/user/refresh',
        method: "POST",
        body: {accessToken, refreshToken},
      }),
    }),
  })
})

export const { useRefreshTokenMutation } = authApi