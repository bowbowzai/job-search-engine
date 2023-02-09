import react, { createContext, useState } from "react"

type AuthenticationType = {
  email: string;
  password: string;
  tokens: {
    access: string;
    refresh: string;
  }
  setEmail: react.Dispatch<react.SetStateAction<string>>,
  setPassword: react.Dispatch<react.SetStateAction<string>>
  setTokens: react.Dispatch<react.SetStateAction<{
    access: string;
    refresh: string;
  }>>
}

export const AuthenticationContext = createContext<AuthenticationType>({
  tokens: {
    access: "",
    refresh: ""
  },
  email: "",
  password: "",
  setEmail: () => { },
  setPassword: () => { },
  setTokens: () => { }
})

export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokens, setTokens] = useState({
    access: "",
    refresh: ""
  })
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <AuthenticationContext.Provider value={{
      tokens,
      email,
      password,
      setEmail,
      setPassword,
      setTokens
    }}>
      {children}
    </AuthenticationContext.Provider>
  )
}