import { getStats } from '../../api/apiJobs';

export const useStats = {
  queryKey: ['stats'],
  queryFn: getStats,
};
