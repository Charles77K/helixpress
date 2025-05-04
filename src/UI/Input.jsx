import PropTypes from 'prop-types';
import { cn } from '../utils/utils';

export default function Input({
  type,
  label,
  value,
  onChange,
  name,
  placeholder,
  className,
  error,
  onBlur,
  ...props
}) {
  return (
    <div>
      {label && (
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          'w-full p-2 border border-gray-300 placeholder:text-xs text-xs rounded-md focus:outline-none',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs min-h-[11px] text-red-600 mt-1">{error || ''}</p>
      )}
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  error: PropTypes.string,
};
