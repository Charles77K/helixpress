import PropTypes from 'prop-types';
import { BiSolidError } from 'react-icons/bi';

export default function Error({ title, text }) {
  return (
    <div className="flex items-start bg-red-50 border-l-4 border-red-500 p-4 rounded-r w-1/2 shadow-md">
      <div className="flex-shrink-0 bg-red-100 p-2 rounded-full">
        <BiSolidError size={24} className="text-red-600" />
      </div>
      <aside className="ml-3">
        <p className="font-bold text-red-700">{title}</p>
        <p className="text-red-600 mt-1 text-sm">{text}</p>
      </aside>
    </div>
  );
}

Error.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

// Optionally, you can set default props if needed
Error.defaultProps = {
  text: 'An error has occurred.', // Default message
};
