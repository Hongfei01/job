import { customFetch } from '../utils/customFetch';

export const getStats = async () => {
  const { data } = await customFetch.get('/jobs/stats');
  return data;
};

export const getAllJobs = async (params) => {
  const { data } = await customFetch.get('/jobs', { params });
  return data;
};

export const getJobById = async (id) => {
  const { data } = await customFetch.get(`/jobs/${id}`);
  return data.job;
};
