import { toast } from 'react-toastify';
import { customFetch } from '../utils/customFetch';
import { Form, redirect, useLoaderData, useParams } from 'react-router-dom';

import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';

import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect, SubmitBtn } from '../components';

const EditJob = () => {
  const { job } = useLoaderData();
  const params = useParams();
  console.log(params);

  return (
    <Wrapper>
      <Form method='POST' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className='form-center'>
          <FormRow
            type='text'
            name='company'
            labelText={'company'}
            defaultValue={job.company}
          />
          <FormRow
            type='text'
            name='position'
            labelText={'position'}
            defaultValue={job.position}
          />
          <FormRow
            type='text'
            name='jobLocation'
            labelText={'job location'}
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name='jobStatus'
            labelText={'job status'}
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name='jobType'
            labelText={'job type'}
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const { data } = await customFetch.get(`/jobs/${id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/all-jobs');
  }
};

export const action = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${id}`, data);
    toast.success('edit job successfully');
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
