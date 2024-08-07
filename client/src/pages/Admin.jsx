import { toast } from 'react-toastify';
import { customFetch } from '../utils/customFetch';
import { redirect, useLoaderData } from 'react-router-dom';

import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import { StatItem } from '../components';
const Admin = () => {
  const data = useLoaderData();
  const { users, jobs } = data;
  return (
    <Wrapper>
      <StatItem
        title={'current users'}
        count={users}
        color='#e9b949'
        bcg='#fcefc7'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title='total jobs'
        count={jobs}
        color='#647acb'
        bcg='#e0e8f9'
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/admin/app-stats');
    return data;
  } catch (error) {
    toast.error('you are not authorized to this page');
    return redirect('/dashboard');
  }
};
