import { createContext, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import { JobsContainer, SearchContainer } from '../components';
import { useQuery } from '@tanstack/react-query';
import { useJobsQuery } from '../features/jobs/useJobsQuery';

const AllJobsContext = createContext();

const AllJobs = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(useJobsQuery(searchValues));

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};
export default AllJobs;

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    await queryClient.ensureQueryData(useJobsQuery(params));
    return { searchValues: { ...params } };
  };

export const useJobs = () => {
  const context = useContext(AllJobsContext);
  if (context === undefined)
    throw new Error('Context was used outside the Provider');
  return context;
};
