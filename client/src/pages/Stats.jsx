import { useQuery } from '@tanstack/react-query';
import { StatsContainer, CharsContainer } from '../components';
import { useStats } from '../features/stats/useStats';

const Stats = () => {
  const {
    data: { defaultStats, monthlyApplications },
  } = useQuery(useStats);

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

export const loader = (queryClient) => async () => {
  return await queryClient.ensureQueryData(useStats);
};
