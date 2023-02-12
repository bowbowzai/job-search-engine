import react, { createContext, useState, useEffect } from "react"
import { User } from "../types/UserType";
import { useMutation, useQuery, MutateOptions, RefetchOptions, RefetchQueryFilters, QueryObserverResult } from "@tanstack/react-query";
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
})

type JWTDecode = {
  exp: number;
  jti: string;
  token_type: string;
  user_id: string;
}

export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState("")
  const [tokens, setTokens] = useState({
    access: "",
    refresh: ""
  })
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
  const logoutMutation = useMutation({
    mutationFn: () => {
      return logout(tokens.refresh)
    },
    onSuccess: (data) => {
      console.log(data)
      clearInfo()
    },
    onError: () => {
      clearInfo()
    }
  })

  const refreshTokenMutation = useMutation({
    mutationFn: (refresh: string) => {
      return refreshToken(refresh)
    },
    onSuccess: (data) => {
      setLoading(false)
      setTokens(data)
      localStorage.setItem("tokens", JSON.stringify(data))
    },
    onError(error) {
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
    const savedTokens = localStorage.getItem("tokens")
    let savedTokensJson;
    if (savedTokens) {
      savedTokensJson = JSON.parse(savedTokens?.toString())
      setTokens(savedTokensJson)
    }
    if (loading) {
      if (savedTokensJson) {
        refreshTokenMutation.mutate(savedTokensJson.refresh)
      } else {
        setLoading(false)
      }
    }
    let timer: number;

    timer = setInterval(() => {
      if (tokens.access && tokens.refresh) {
        refreshTokenMutation.mutate(String(tokens.access))
      }
    }, 1500000)

    return () => clearInterval(timer)
  }, [])

  return (
    <AuthenticationContext.Provider value={{
      tokens,
      user,
      setTokens,
      setUser,
      setLoading,
      loading,
      logoutMutate: logoutMutation.mutate,
    }}>
      {children}
    </AuthenticationContext.Provider>
  )
}