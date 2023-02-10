import api from ".";
import { Job } from "../types/JobType";

export function getUser(access:string, user_id:string) {
  return api.get(`/profiles/me/${user_id}/`, {
    headers: {
      "Authorization": "JWT " + access 
    }
  }).then(res => res.data)
}

