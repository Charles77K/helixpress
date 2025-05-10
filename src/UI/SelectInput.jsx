import PropTypes from 'prop-types';
import { cn } from '../utils/utils';

function getValue(option, path) {
  if (!path.includes('.')) {
    return option[path]; // simple key
  }
  return path.split('.').reduce((acc, part) => acc && acc[part], option); // nested
}

export default function SelectInput({
  label,
  value,
  name,
  options,
  optionValue,
  optionLabel,
  onChange,
  onBlur,
  isLoading,
  className,
  error,
  ...props
}) {
  return (
    <div className="text-gray-700">
      {label && (
        <label className="block text-gray-700 font-semibold text-sm mb-1">
          {label}
        </label>
      )}
      <select
        className={cn(
          'w-full p-4 md:p-2 border border-gray-300 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500',
          className
        )}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
        disabled={isLoading}
      >
        <option value={''}>Select a {name}</option>
        {isLoading && <option>Loading {label}...</option>}
        {!isLoading && options.length === 0 && (
          <option>No {label} found</option>
        )}
        {!isLoading &&
          options.map((option, idx) => (
            <option value={getValue(option, optionValue)} key={idx}>
              {getValue(option, optionLabel)}
            </option>
          ))}
      </select>
      {/* error message */}
      {error && (
        <p className="text-xs min-h-[11px] text-red-600 mt-1">{error || ''}</p>
      )}
    </div>
  );
}

SelectInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ])
  ),
  optionValue: PropTypes.string, // Optional: key to use as value inside option object
  optionLabel: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
};
