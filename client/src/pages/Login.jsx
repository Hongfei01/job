import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
} from 'react-router-dom';

import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import { customFetch } from '../utils/customFetch';
import { toast } from 'react-toastify';

const Login = () => {
  const errors = useActionData();

  const navigate = useNavigate();

  const loginTestUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    };
    try {
      await customFetch.post('/auth/login', data);
      toast.success('login test user successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return;
    }
  };

  return (
    <Wrapper>
      <Form className='form' method='POST'>
        <Logo />
        <h4>Login</h4>

        <FormRow
          type='email'
          name='email'
          defaultValue={'test@example.com'}
          labelText={'Email'}
        />
        <FormRow
          type={'password'}
          labelText={'Password'}
          name={'password'}
          defaultValue={'qawsedrf'}
        />
        {errors && <p style={{ color: 'red' }}>{errors.msg}</p>}
        <SubmitBtn />
        <button type='button' className='btn btn-block' onClick={loginTestUser}>
          Explore the app
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: '' };
  if (data.password.length < 8) {
    errors.msg = 'password must be at least 8 characters';
    return errors;
  }
  try {
    await customFetch.post('/auth/login', data);
    toast.success('login successfully');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
