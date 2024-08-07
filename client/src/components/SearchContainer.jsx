import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useJobs } from '../pages/AllJobs';

const SearchContainer = () => {
  const { searchValues } = useJobs();
  const { search, jobStatus, jobType, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeoutId;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <Wrapper>
      <Form className='form'>
        <h4 className='form-title'>search job</h4>
        <div className='form-center'>
          <FormRow
            type='search'
            name='search'
            labelText='search'
            defaultValue={search}
            onChange={debounce((form) => submit(form))}
          />
          <FormRowSelect
            list={['all', ...Object.values(JOB_STATUS)]}
            name={'jobStatus'}
            labelText={'job status'}
            defaultValue={jobStatus}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            list={['all', ...Object.values(JOB_TYPE)]}
            name={'jobType'}
            labelText={'job type'}
            defaultValue={jobType}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            list={['all', ...Object.values(JOB_SORT_BY)]}
            name={'sort'}
            labelText={'sort'}
            defaultValue={sort}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
            reset
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
