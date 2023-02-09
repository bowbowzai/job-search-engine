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