import api from ".";
import { Job } from "../types/JobType";

export function getJobPosts(page: number): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Job[]
}> {
  return api.get(`/jobs/all-jobs/?page=${page}`).then(res => {
    return res.data
  })
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