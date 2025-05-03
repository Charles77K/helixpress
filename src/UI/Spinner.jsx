import PropTypes from 'prop-types';
// interface SpinnerProps {
//   size?: "sm" | "md" | "lg";
//   color?: string;
//   className?: string;
// }

const Spinner = ({ size = 'md', color = 'text-white', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-solid ${color} 
        border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] 
        ${sizeClasses[size]} ${className}`}
    />
  );
};

export default Spinner;

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};
