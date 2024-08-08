import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils/customFetch';

const AddJob = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method='POST' className='form'>
        <h4 className='form-title'>Add job</h4>
        <div className='form-center'>
          <FormRow name='company' labelText={'company'} type='text' />
          <FormRow name='position' labelText={'position'} type='text' />
          <FormRow
            name='jobLocation'
            labelText={'location'}
            type='text'
            defaultValue={user.location}
          />
          <FormRowSelect
            name='jobStatus'
            labelText={'job Status'}
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name='jobType'
            labelText={'job Type'}
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/jobs', data);
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('job added successfully');
      return redirect('all-jobs');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
