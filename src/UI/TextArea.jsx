import PropTypes from 'prop-types';
import { cn } from '../utils/utils';

export default function TextArea({
  name,
  value,
  label,
  onChange,
  rows,
  className,
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-1">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required
        className={cn(
          'w-full p-2 border border-gray-300 rounded-md placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500',
          className
        )}
      />
    </div>
  );
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  rows: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
