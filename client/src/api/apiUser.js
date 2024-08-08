import { customFetch } from '../utils/customFetch';

export const getUser = async () => {
  const { data } = await customFetch.get('/users/current-user');
  return data.user;
};
