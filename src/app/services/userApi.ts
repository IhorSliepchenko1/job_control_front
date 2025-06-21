import { api } from "./api"

export const userApi = api.injectEndpoints({
     endpoints: (builder) => ({
          deleteUser: builder.mutation<void, number>({
               query: (id) => ({
                    url: `/auth/${id}`,
                    method: "GET",
               }),
          }),
     }),
})

export const { useDeleteUserMutation } = userApi