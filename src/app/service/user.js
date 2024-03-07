import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiURL = process.env.API_URL 
              ? process.env.API_URL 
              : "https://pklaos88.online";

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    prepareHeaders: (headers, { getState }) => {
      if (getState().auth) {
        if (getState().auth.userAuth) {
          const token = getState().auth.userAuth.accessToken;
          headers.set('authorization', `Bearer ${token}`)
          return headers;
        }
      }
    },
  }),
  endpoints: (build) => ({
    getMe: build.query({
      query: () => ({
        url: '/api/user/me',
        method: "GET",
      }),
    }),
    // Next endpoint
  }),
  
});

export const { useGetMeQuery } = userApi