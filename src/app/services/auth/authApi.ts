import { METHODS } from "@/utils/methods";
import { api } from "../api";
import { Login, RegisterEmployee, RegisterUser } from "./authTypes";
import { ApiResponse } from "@/types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<ApiResponse, RegisterUser>({
      query: (body) => ({
        url: `/auth/register-user`,
        method: METHODS.POST,
        body,
      }),
    }),

    registerEmployee: builder.mutation<ApiResponse, RegisterEmployee>({
      query: (body) => ({
        url: `/auth/register-employee`,
        method: METHODS.POST,
        body,
      }),
    }),

    login: builder.mutation<ApiResponse, Login>({
      query: (body) => ({
        url: `/auth/login`,
        method: METHODS.POST,
        body,
      }),
    }),

    validateRefreshToken: builder.query<ApiResponse, void>({
      query: () => ({
        url: `/auth/validate-refresh-token`,
        method: METHODS.GET,
      }),
    }),

    validateAccessToken: builder.query<ApiResponse, void>({
      query: () => ({
        url: `/auth/validate-access-token`,
        method: METHODS.GET,
      }),
    }),

    updateRefreshToken: builder.mutation<ApiResponse, void>({
      query: () => ({
        url: `/auth/update-refresh-token`,
        method: METHODS.POST,
      }),
    }),

    logout: builder.mutation<ApiResponse, void>({
      query: () => ({
        url: `/auth/logout`,
        method: METHODS.POST,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterEmployeeMutation,
  useRegisterUserMutation,
  useUpdateRefreshTokenMutation,
  useValidateAccessTokenQuery,
  useValidateRefreshTokenQuery,
  useLazyValidateAccessTokenQuery,
  useLazyValidateRefreshTokenQuery,
} = authApi;
