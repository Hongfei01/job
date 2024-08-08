import { toast } from 'react-toastify';
import { customFetch } from '../utils/customFetch';
import { redirect } from 'react-router-dom';

export const action =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    try {
      await customFetch.delete(`/jobs/${id}`);
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect('/dashboard/all-jobs');
  };
