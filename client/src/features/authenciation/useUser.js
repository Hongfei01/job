import { getUser } from '../../api/apiUser';

export const useUser = {
  queryKey: ['user'],
  queryFn: getUser,
};
