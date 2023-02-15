import react, { createContext, useState, useEffect, useRef } from "react"
import { User } from "../types/UserType";
import { useMutation, useQuery, MutateOptions, useQueryClient, RefetchQueryFilters, QueryObserverResult } from "@tanstack/react-query";
import { logout, refreshToken } from "../api/authentications";
import { getUser } from "../api/users";
import jwt_decode from "jwt-decode";

type AuthenticationType = {
  user: User;
  tokens: {
    access: string;
    refresh: string;
  }
  setTokens: react.Dispatch<react.SetStateAction<{
    access: string;
    refresh: string;
  }>>,
  setUser: react.Dispatch<react.SetStateAction<User>>,
  setLoading: react.Dispatch<react.SetStateAction<boolean>>,
  loading: boolean;
  logoutMutate: (variables: void, options?: MutateOptions<any, unknown, void, unknown> | undefined) => void,
  isRefreshing: boolean;
}

export const AuthenticationContext = createContext<AuthenticationType>({
  tokens: {
    access: "",
    refresh: ""
  },
  user: {
    "id": "",
    "email": "",
    "user_full_name": "",
    "profile_img": "",
    "desired_job": "",
    "desired_location": "",
    "position": "",
  },
  setTokens: () => { },
  setUser: () => { },
  setLoading: () => { },
  loading: true,
  logoutMutate: () => { },
  isRefreshing: true
})

type JWTDecode = {
  exp: number;
  jti: string;
  token_type: string;
  user_id: string;
}

export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const isUnmountedRef = useRef(false)
  const [userId, setUserId] = useState("")
  const [tokens, setTokens] = useState<{
    access: string;
    refresh: string;
  }>(
    localStorage.getItem("tokens")
      ? JSON.parse(String(localStorage.getItem("tokens")))
      : {
        access: "",
        refresh: ""
      }
  )
  const [user, setUser] = useState<User>({
    "id": "",
    "email": "",
    "user_full_name": "",
    "profile_img": "",
    "desired_job": "",
    "desired_location": "",
    "position": "",
  })
  const [loading, setLoading] = useState(true)

  const queryClient = useQueryClient()

  function clearInfo() {
    setUser({
      "id": "",
      "email": "",
      "user_full_name": "",
      "profile_img": "",
      "desired_job": "",
      "desired_location": "",
      "position": "",
    })
    setTokens({
      access: "",
      refresh: ""
    })
    localStorage.removeItem("tokens")
  }

  function invalidateCacheData() {
    queryClient.clear()
  }

  const logoutMutation = useMutation({
    mutationFn: () => {
      return logout(tokens.refresh)
    },
    onSuccess: (data) => {
      invalidateCacheData()
      clearInfo()
    },
    onError: () => {
      invalidateCacheData()
      clearInfo()
    }
  })

  const refreshTokenMutation = useMutation({
    mutationFn: (refresh: string) => {
      return refreshToken(refresh)
    },
    onSuccess: (data) => {
      console.log("refresh success")
      setLoading(false)
      setTokens(data)
      queryClient.setQueryData(["user"], tokens.access)
      localStorage.setItem("tokens", JSON.stringify(data))
    },
    onError(error) {
      console.log("refresh error")
      setLoading(false)
      logoutMutation.mutate()
    },
  })

  const getUserQuery = useQuery({
    queryKey: ["user", tokens.access],
    queryFn: () => {
      const decodedData = jwt_decode<JWTDecode>(tokens.access);
      const userId = decodedData.user_id
      return getUser(tokens.access, userId.toString())
    },
    enabled: tokens.access != "",
    onSuccess: (data) => {
      setUser(data)
    }
  })

  useEffect(() => {
    let timer: number;
    console.log()
    if (!isUnmountedRef.current) {
      if (loading) {
        if (tokens.access != null && tokens.access != "") {
          refreshTokenMutation.mutate(tokens.refresh)
        } else {
          setLoading(false)
        }
      }
      isUnmountedRef.current = true
    }
    timer = setInterval(() => {
      console.log(tokens);
      if (tokens.access != "" && tokens.refresh != "") {
        refreshTokenMutation.mutate(String(tokens.refresh))
      }
    }, 60 * 25 * 1000)
    return () => {
      clearInterval(timer)
    }
  }, [tokens])

  return (
    <AuthenticationContext.Provider value={{
      tokens,
      user,
      setTokens,
      setUser,
      setLoading,
      loading,
      logoutMutate: logoutMutation.mutate,
      isRefreshing: refreshTokenMutation.isLoading
    }}>
      {children}
    </AuthenticationContext.Provider>
  )
}