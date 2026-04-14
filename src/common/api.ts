import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { confirmUri, emailCheckUri, loginUri, ORIGIN, passwordCheckUri, passwordSaveUri, registerUri } from 'common/constants'
import type { ApiResponse } from 'common/ajax/types'
import type { AuthData, AuthValidationError } from 'Auth/schema'
import type { RegisterData, RegisterValidationError } from 'Register/schema'
import type { ConfirmPassword, ConfirmValidationError, Email, EmailValidationError } from 'Restore/schema'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: ORIGIN + '/api/' }),
    endpoints: (builder) => ({
        auth: builder.mutation<ApiResponse<boolean, AuthValidationError[]>, AuthData>({
            query: (authData) => ({
                url: loginUri,
                method: 'POST',
                body: authData,
            }),
        }),
        emailCheck: builder.mutation<ApiResponse<string, EmailValidationError[]>, Email>({
            query: (emailData) => ({
                url: emailCheckUri,
                method: 'POST',
                body: emailData,
            }),
        }),
        getCsrf: builder.query<ApiResponse<string>, string>({
            query: (arg) => passwordCheckUri + '/' + arg
        }),
        restorePswd: builder.mutation<ApiResponse<boolean, ConfirmValidationError[]>, ConfirmPassword>({
            query: (pswdData) => ({
                url: passwordSaveUri,
                method: 'POST',
                body: pswdData,
            }),
        }),
        register: builder.mutation<ApiResponse<boolean, RegisterValidationError[]>, RegisterData>({
            query: (registerData) => ({
                url: registerUri,
                method: 'POST',
                body: registerData,
            }),
        }),
        registerConfirm: builder.query<ApiResponse<boolean>, string>({
            query: (arg) => confirmUri + '/' + arg
        }),
    })
})

export const {
    useAuthMutation,
    useEmailCheckMutation,
    useGetCsrfQuery,
    useRestorePswdMutation,
    useRegisterMutation,
    useRegisterConfirmQuery,
} = authApi
