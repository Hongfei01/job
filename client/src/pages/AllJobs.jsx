import { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';

import { JobsContainer, SearchContainer } from '../components';
import { customFetch } from '../utils/customFetch';

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};
export default AllJobs;

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get('/jobs', { params });

    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const useJobs = () => {
  const context = useContext(AllJobsContext);
  if (context === undefined)
    throw new Error('Context was used outside the Provider');
  return context;
};
