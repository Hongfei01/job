import { useOutletContext, Form, redirect } from 'react-router-dom';

import { toast } from 'react-toastify';

import { customFetch } from '../utils/customFetch';

import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, SubmitBtn } from '../components';

const Profile = () => {
  const { user } = useOutletContext();

  const { name, lastName, email, location } = user;

  return (
    <Wrapper>
      <Form className='form' method='POST' encType='multipart/form-data'>
        <h4 className='form-title'>edit profile</h4>
        <div className='form-center'>
          <div className='form-row'>
            <label htmlFor='avatar' className='form-label'>
              Select an image file (max 0.5 MB):
            </label>
            <input
              type='file'
              name='avatar'
              id='avatar'
              className='form-input'
              accept='image/*'
            />
          </div>
          <FormRow
            type='text'
            name='name'
            labelText='name'
            defaultValue={name}
          />
          <FormRow
            type='email'
            name='email'
            labelText='name'
            defaultValue={email}
          />
          <FormRow
            type='text'
            name='lastName'
            labelText='last name'
            defaultValue={lastName}
          />
          <FormRow
            type='text'
            name='location'
            labelText='location'
            defaultValue={location}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('avatar');
  if (file && file.size > 500000) {
    toast.error('Image size too large');
    return null;
  }
  try {
    await customFetch.patch('/users/update-user', formData);
    toast.success('Profile updated successfully');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
