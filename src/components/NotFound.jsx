import PropTypes from 'prop-types';

// Custom default icon component
const DefaultNotFoundIcon = ({ size = 32, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <circle cx="12" cy="12" r="4" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
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
      className={`flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200 shadow-sm ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <Icon size={32} className="text-gray-500" aria-hidden="true" />
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {label} not found
      </h2>

      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>

      {onAction && actionText && (
        <button
          onClick={onAction}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
  message:
    "We couldn't find what you're looking for. Please try again with different criteria.",
  icon: DefaultNotFoundIcon,
  className: 'w-full max-w-lg mx-auto',
};

DefaultNotFoundIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

// Example usage:
//
// <NotFound
//   label="Blogs"
//   message="No blog posts match your search criteria."
//   actionText="Clear Filters"
//   onAction={() => clearFilters()}
// />
//
// <NotFound
//   label="News"
//   message="No news articles are currently available."
// />
