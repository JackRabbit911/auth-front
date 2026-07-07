import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { host } from 'common/constants'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: host + '/api/' }),
    endpoints: (builder) => ({
         post: builder.mutation({
            query: (arg) => ({
                url: arg.url,
                method: 'POST',
                body: arg.body,
            }),
        }),
        get: builder.query({
            query: (arg) => arg,
        }),
    })
})

export const { usePostMutation, useGetQuery } = authApi
