import { Outlet, redirect, useLoaderData } from 'react-router-dom';

import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import { DashboardProvider } from '../context/DashboardContext';
import { customFetch } from '../utils/customFetch';

const DashboardLayout = () => {
  const { user } = useLoaderData();

  return (
    <DashboardProvider>
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar user={user} />
            <div className='dashboard-page'>
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardProvider>
  );
};
export default DashboardLayout;

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/current-user');
    return data;
  } catch (error) {
    return redirect('/');
  }
};
