const FormRowSelect = ({
  name,
  labelText,
  defaultValue = '',
  list,
  onChange,
}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText}
      </label>
      <select
        id={name}
        name={name}
        className='form-select'
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {list.map((itemVal) => (
          <option key={itemVal} value={itemVal}>
            {itemVal}
          </option>
        ))}
      </select>
    </div>
  );
};
export default FormRowSelect;
