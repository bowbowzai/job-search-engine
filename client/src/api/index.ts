import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:80/api/v1",
  withCredentials: true
})
api.defaults.withCredentials = true

export default  api