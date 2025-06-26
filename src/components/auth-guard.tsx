import { useNavigate } from "react-router-dom"
import {
     useUpdateRefreshTokenMutation,
     useValidateAccessTokenQuery,
     useValidateRefreshTokenQuery
} from "@/app/services/auth/authApi"
import { useEffect, useState } from "react"
import { Loader } from "./ui/loader"
import { ThemeSwitch } from "./ui/theme-switch"

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     const { data: accessData, isLoading: isAccessLoading } = useValidateAccessTokenQuery()
     const { data: refreshData, isLoading: isRefreshLoading } = useValidateRefreshTokenQuery()

     const [updateTokens] = useUpdateRefreshTokenMutation()
     const [loading, setLoading] = useState(true)
     const navigate = useNavigate()

     const redirectAuth = () => navigate(`/auth`)
     const updateToken = async () => {
          await updateTokens()
          navigate(`/`)
     }

     useEffect(() => {
          if (isAccessLoading || isRefreshLoading) return

          const check = async () => {
               try {
                    if (!accessData?.success) {
                         if (!refreshData?.success) {
                              redirectAuth()
                         } else {
                              await updateToken()
                         }
                    } else {
                         await updateToken()
                    }
               } catch (e) {
                    console.log(e);
                    redirectAuth()
               } finally {
                    setLoading(false)
               }
          }

          check()
     }, [accessData, refreshData, isAccessLoading, isRefreshLoading])

     return <>
          <div className="absolute right-0 top-0 z-[999] p-[20px]">
               <ThemeSwitch />
          </div>
          {loading ? <Loader /> : <>{children}</>}
     </>
}


