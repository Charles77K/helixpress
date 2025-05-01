import PropTypes from 'prop-types';
import { BiSolidError } from 'react-icons/bi';

export default function Error({ title, text, onRetry, className }) {
  return (
    <div className="flex-center">
      <div
        role="alert"
        aria-live="assertive"
        className={`flex items-start bg-red-50 border-l-4 border-red-500 p-4 rounded-r shadow-md ${className}`}
      >
        <div className="flex-shrink-0 bg-red-100 p-2 rounded-full">
          <BiSolidError size={24} className="text-red-600" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="font-bold text-red-700 text-sm">{title}</h3>
          <p className="text-red-600 mt-1 text-sm">{text}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="w-full md:w-auto mt-3 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Error.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
  className: PropTypes.string,
};

Error.defaultProps = {
  title: 'Error',
  text: 'An error has occurred. Please try again or contact support if the problem persists.',
  className: 'w-full md:w-2/3 lg:w-1/2',
};
