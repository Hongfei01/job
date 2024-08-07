import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';

const LogoutContainer = ({ user }) => {
  const [showLogout, setShowLogout] = useState(false);
  const { logoutUser } = useDashboard();
  const avatar = user.avatar;
  return (
    <Wrapper>
      <button
        type='button'
        className='btn logout-btn'
        onClick={() => setShowLogout((show) => !show)}
      >
        {avatar ? <img src={avatar} className='img' /> : <FaUserCircle />}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button type='button' className='dropdown-btn' onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;
