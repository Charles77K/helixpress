// SelectComponent.js
// import React from 'react';
import PropTypes from 'prop-types';

const SelectComponent = ({
  options,
  value,
  onChange,
  label,
  isLoading,
  isError,
  isDisabled,
  optionValue,
  optionMain,
  name,
  multiple,
  chooseStyle,
}) => {
  return (
    <div>
      <label className="block text-lg font-bold mb-1">{label}</label>
      <select
        className={
          chooseStyle
            ? chooseStyle
            : 'block w-full md:w-1/2 p-3 bg-gray-100 border border-gray-300 rounded'
        }
        name={name}
        value={value}
        onChange={onChange}
        required
        multiple={multiple}
        disabled={isDisabled}
      >
        <option value="" disabled>
          Select {label}
        </option>
        {isLoading && <option value={'loading'}>Loading...</option>}
        {isError && <option value={'error'}>Error fetching data...</option>}
        {options ? (
          options.map((option, index) => (
            <option
              key={option.id ? option.id : index}
              value={optionValue(option)}
            >
              {optionMain(option) ? optionMain(option) : `no ${label} found`}
            </option>
          ))
        ) : (
          <option value={'no-items'}>No {label} Found</option>
        )}
      </select>
    </div>
  );
};

SelectComponent.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      name: PropTypes.string,
    })
  ),
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isDisabled: PropTypes.any,
  optionValue: PropTypes.func.isRequired,
  optionMain: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  chooseStyle: PropTypes.string,
};

export default SelectComponent;
