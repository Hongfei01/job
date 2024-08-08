import { getJobById } from '../../api/apiJobs';

export const useJob = (id) => {
  return {
    queryKey: ['job', id],
    queryFn: () => getJobById(id),
  };
};
