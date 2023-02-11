import api from ".";
import {User} from "../types/UserType"

export function updateProfile(data: {
  updateData: FormData,
  access: string;
}): Promise<User> {
  return api.patch("/profiles/update/", data.updateData, {
    headers: {
      "Authorization": "JWT " + data.access
    }
  }).then(res => res.data)
}

