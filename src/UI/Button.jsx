import PropTypes from 'prop-types';
import { cn } from '../utils/utils';

export default function Button({ children, disabled, className }) {
  return (
    <button
      type="submit"
      className={cn(
        'w-full rounded-md bg-slate-800 text-white py-2 px-3 hover:bg-slate-600 mt-4',
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
