import { useLoaderData } from 'react-router-dom';

import { StatsContainer, CharsContainer } from '../components';
import { customFetch } from '../utils/customFetch';

const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <CharsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/jobs/stats');
    return data;
  } catch (error) {
    return error;
  }
};
