import { Outlet, redirect, useNavigation } from 'react-router-dom';

import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar, Loading } from '../components';
import { DashboardProvider } from '../context/DashboardContext';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../features/authenciation/useUser';

const DashboardLayout = () => {
  const { data: user } = useQuery(useUser);

  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <DashboardProvider>
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar user={user} />
            <div className='dashboard-page'>
              {isLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardProvider>
  );
};
export default DashboardLayout;

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(useUser);
  } catch (error) {
    return redirect('/');
  }
};
