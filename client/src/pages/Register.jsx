import { Form, Link, redirect } from 'react-router-dom';

import { toast } from 'react-toastify';

import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import { customFetch } from '../utils/customFetch';

const Register = () => {
  return (
    <Wrapper>
      <Form method='POST' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' labelText={'First Name'} name={'name'} />
        <FormRow type='text' labelText={'Last Name'} name={'lastName'} />
        <FormRow type='text' labelText={'Location'} name={'location'} />
        <FormRow type='email' labelText={'Email'} name={'email'} />
        <FormRow type='password' labelText={'Password'} name={'password'} />
        <SubmitBtn />
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successfully');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
