import PropTypes from 'prop-types'; // No need to import { PropTypes }
import { BiSolidError } from 'react-icons/bi';

export default function Error({ title, text }) {
  return (
    <div className="flex items-start bg-red-300 p-4 w-1/2 h-auto shadow-lg">
      <BiSolidError size={30} color="red" />
      <aside className="ml-2">
        <p className="font-semibold">{title}</p>
        <p>{text}</p>
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
