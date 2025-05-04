import PropTypes from 'prop-types';
import { BiSolidError } from 'react-icons/bi';
import { IoReload } from 'react-icons/io5';

export default function Error({ title, text, onRetry, className, severity }) {
  // Define color scheme based on severity
  const colorScheme = {
    critical: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      iconBg: 'bg-red-100',
      icon: 'text-red-600',
      title: 'text-red-700',
      text: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      iconBg: 'bg-yellow-100',
      icon: 'text-yellow-600',
      title: 'text-yellow-700',
      text: 'text-yellow-600',
      button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      iconBg: 'bg-blue-100',
      icon: 'text-blue-600',
      title: 'text-blue-700',
      text: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    },
  };

  const colors = colorScheme[severity] || colorScheme.critical;

  return (
    <div className="w-full flex justify-center px-4">
      <div
        role="alert"
        aria-live="assertive"
        className={`flex flex-col sm:flex-row items-start ${colors.bg} border-l-4 ${colors.border} p-4 rounded shadow-md w-full max-w-2xl ${className}`}
      >
        <div
          className={`flex-shrink-0 ${colors.iconBg} p-2 rounded-full mr-0 sm:mr-3 mb-3 sm:mb-0 self-center sm:self-start`}
        >
          <BiSolidError size={24} className={colors.icon} aria-hidden="true" />
        </div>

        <div className="flex-1">
          <h3 className={`font-bold ${colors.title} text-base`}>{title}</h3>
          <p className={`${colors.text} mt-2 text-sm`}>{text}</p>

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className={`mt-4 ${colors.button} text-white py-2 px-4 rounded-md text-sm transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center sm:justify-start`}
            >
              <IoReload className="mr-2" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Error.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  onRetry: PropTypes.func,
  className: PropTypes.string,
  severity: PropTypes.oneOf(['critical', 'warning', 'info']),
};

Error.defaultProps = {
  title: 'Error',
  text: 'An error has occurred. Please try again or contact support if the problem persists.',
  className: '',
  severity: 'critical',
};
