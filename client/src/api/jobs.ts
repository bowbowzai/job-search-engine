import api from ".";
import { Job } from "../types/JobType";

export function getJobPosts(): Promise<Job[]> {
  return api.get("/jobs/all-jobs/").then(res => res.data)
}