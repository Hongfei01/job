import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { useDashboard } from '../context/DashboardContext';
import Wrapper from '../assets/wrappers/ThemeToggle';
const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboard();
  return (
    <Wrapper>
      {isDarkTheme ? (
        <BsFillSunFill onClick={toggleDarkTheme} className='toggle-icon' />
      ) : (
        <BsFillMoonFill onClick={toggleDarkTheme} className='toggle-icon' />
      )}
    </Wrapper>
  );
};
export default ThemeToggle;
