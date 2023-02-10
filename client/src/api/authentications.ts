import api from ".";
import { Register } from "../types/RegisterTyepe";

export function register(registerInfo:Register) {
  return api.post("/auth/users/", registerInfo).then(response => response.data)
}

export function verifyEmail(data:{uid:string, token:string}) {
  return api.post("/auth/users/activation/", {
    "uid": data.uid,
    "token": data.token
  })
}

export function login(data: {
  email: string,
  password: string
}) {
  return api.post("/auth/jwt/create/", {
    email: data.email,
    password: data.password
  }).then(response => {
    return response.data
  })
}

export function logout(refresh:string) {
  return api.post("/auth/logout/").then(response => response.data)
}

export function refreshToken(refresh:string) {
  return api.post("/auth/jwt/refresh/", {
    refresh: refresh
  }).then(response => response.data)
}
