import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "@/config/constants"

const baseQuery = fetchBaseQuery({
     baseUrl: `${BASE_URL}`,
     credentials: 'include'
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
     reducerPath: `splitApi`,
     baseQuery: baseQueryWithRetry,
     refetchOnMountOrArgChange: true,
     endpoints: () => ({}),
})

// builder.mutation <** Response **, ** Arg **>