import api from ".";
import { Job } from "../types/JobType";

export function getJobPosts(): Promise<Job[]> {
  return api.get("/jobs/all-jobs/").then(res => res.data)
}

export function getJobBySearch(keyword: string): Promise<Job[]> {
  return api.get(`/jobs/search/${keyword}/`).then(res => res.data)
}

export function getRecommendedJob(access:string): Promise<Job[]>{
  return api.get(`/jobs/recommends/`, {
    headers: {
      Authorization: "JWT " + access
    }
  }).then(res => res.data)
}