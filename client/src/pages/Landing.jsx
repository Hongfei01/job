import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            job <span>tracking</span>app
          </h1>
          <p>
            I&apos;m baby hot chicken seitan lo-fi, PBR&B swag schlitz chambray
            banjo ascot ennui stumptown blackbird spyplane celiac salvia.
            Gastropub artisan waistcoat kinfolk pok pok. Street art plaid
            mumblecore, stumptown drinking vinegar jianbing put a bird on it.
            Gastropub blog taiyaki mlkshk post-ironic. Flexitarian yuccie vice
            locavore flannel occupy big mood, etsy post-ironic crucifix.
          </p>
          <Link to={'/register'} className='btn register-link'>
            Register
          </Link>
          <Link to={'/login'} className='btn '>
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
