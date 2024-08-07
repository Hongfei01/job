import { useContext, useEffect } from 'react';
import { createContext, useState } from 'react';

import { checkDarkTheme } from '../hooks/checkDarkMode';
import { customFetch } from '../utils/customFetch';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  // const user = { name: 'Jim' };
  const [user, setUser] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDarkTheme());
  const navigate = useNavigate();

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const { data } = await customFetch.get('/users/current-user');
        const { user } = data;
        setUser(user);
      } catch (error) {
        console.log(error?.response?.data?.msg);
      }
    }
    getCurrentUser();
  }, []);
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', isDarkTheme);

    localStorage.setItem('dark-theme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar((show) => !show);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('logging out...');
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined)
    throw new Error('Context was used outside the Provider');
  return context;
};
