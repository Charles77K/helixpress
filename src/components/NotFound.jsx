import PropTypes from 'prop-types';
import { cn } from '../utils/utils';

// Custom default icon component
const DefaultNotFoundIcon = ({ className = '' }) => (
  <img className={className} src="/not-found.png" width={60} height={60} />
);

export default function NotFound({
  label,
  message,
  icon: Icon,
  actionText,
  onAction,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 bg-gray-60 rounded-lg border border-gray-200 shadow-sm',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="bg-gray-60 p-4 rounded-full mb-1">
        <Icon size={32} className="text-gray-600" aria-hidden="true" />
      </div>

      <h2 className="text-base font-semibold text-gray-800 mb-2">
        {label} not found
      </h2>

      <p className="text-gray-600 text-center text-xs mb-6 max-w-md">
        {message}
      </p>

      {onAction && actionText && (
        <button
          onClick={onAction}
          className="px-5 py-2 bg-slate-800 hover:bg-slate-600 text-white text-xs rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

NotFound.propTypes = {
  label: PropTypes.string.isRequired,
  message: PropTypes.string,
  icon: PropTypes.elementType,
  actionText: PropTypes.string,
  onAction: PropTypes.func,
  className: PropTypes.string,
};

NotFound.defaultProps = {
  label: 'Items',
  message: "We couldn't find what you're looking for. Please check back later.",
  icon: DefaultNotFoundIcon,
  className: 'w-full max-w-lg mx-auto',
};

DefaultNotFoundIcon.propTypes = {
  className: PropTypes.string,
};
