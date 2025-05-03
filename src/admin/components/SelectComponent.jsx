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
        <option value="">Select {label}</option>
        {isLoading && <option value="loading">Loading...</option>}
        {isError && <option value="error">Error fetching data...</option>}

        {Array.isArray(options) ? (
          options.length > 0 ? (
            options.map((option, index) => (
              <option
                key={option.id ?? index}
                value={optionValue ? optionValue(option) : option.id}
              >
                {optionMain
                  ? optionMain(option)
                  : option.name ?? `No ${label} name`}
              </option>
            ))
          ) : (
            <option value="no-items">No {label} Found</option>
          )
        ) : options ? (
          <option value={options.id}>{options.name ?? options}</option>
        ) : (
          <option value="no-items">No {label} Found</option>
        )}
      </select>
    </div>
  );
};

SelectComponent.propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.any,
        name: PropTypes.string,
      })
    ),
    PropTypes.object,
  ]),
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isDisabled: PropTypes.bool,
  optionValue: PropTypes.func,
  optionMain: PropTypes.func,
  name: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  chooseStyle: PropTypes.string,
};

export default SelectComponent;
