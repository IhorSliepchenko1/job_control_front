import { useNavigate } from "react-router-dom"
import {
     useUpdateRefreshTokenMutation,
     useValidateAccessTokenMutation,
     useValidateRefreshTokenMutation
} from "@/app/services/auth/authApi"
import { useCallback, useEffect, useState } from "react"
import { Loader } from "./ui/loader"

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     const [isValidateAccessToken] = useValidateAccessTokenMutation()
     const [isValidateRefreshToken] = useValidateRefreshTokenMutation()
     const [updateTokens] = useUpdateRefreshTokenMutation()
     const [loading, setLoading] = useState(true)
     const navigate = useNavigate()

     const redirectAuth = () => navigate(`/auth`)
     const updateToken = async () => {
          await updateTokens()
          navigate(`/`)
     }

     const isValidateTokens = useCallback(async () => {
          try {
               const checkAccess = await isValidateAccessToken()

               if (!checkAccess.data?.success) {
                    const checkRefresh = await isValidateRefreshToken()

                    if (!checkRefresh.data?.success) {
                         redirectAuth()
                    }
                    else {
                         await updateToken()
                    }
               }
               else {
                    await updateToken()
               }
          }
          catch (e) {
               redirectAuth()
          }
          finally {
               setLoading(false);
          }
     }, [isValidateAccessToken, isValidateRefreshToken, updateTokens, navigate])

     useEffect(() => {
          isValidateTokens()
     }, [isValidateTokens])

     return loading ? <Loader /> : <>{children}</>
}


