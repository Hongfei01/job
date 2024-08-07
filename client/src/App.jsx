import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  AllJobs,
  Stats,
  Profile,
  Admin,
  EditJob,
} from './pages';

import { checkDarkTheme } from './hooks/checkDarkMode';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { action as addJobAction } from './pages/AddJob';
import { loader as allJobsLoader } from './pages/AllJobs';
import { action as deleteJobAction } from './pages/DeleteJob';
import {
  loader as editJobLoader,
  action as editJobAction,
} from './pages/EditJob';

import { loader as adminLoader } from './pages/Admin';

import { action as editProfileAction } from './pages/Profile';

import { loader as statsLoader } from './pages/Stats';
checkDarkTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'register', element: <Register />, action: registerAction },
      { path: 'login', element: <Login />, action: loginAction },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          { index: true, element: <AddJob />, action: addJobAction },
          { path: 'all-jobs', element: <AllJobs />, loader: allJobsLoader },
          { path: 'stats', element: <Stats />, loader: statsLoader },
          { path: 'profile', element: <Profile />, action: editProfileAction },
          { path: 'admin', element: <Admin />, loader: adminLoader },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          { path: 'delete-job/:id', action: deleteJobAction },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
