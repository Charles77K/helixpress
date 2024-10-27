import { PropTypes } from 'prop-types';
import { BiSolidError } from 'react-icons/bi';

export default function Error({ title, text }) {
  Error.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };
  return (
    <div className="flex bg-red-300 p-4  absolute top-20">
      <BiSolidError size={30} color="red" />
      <aside>
        <p>{title}</p>
        <p>{text}</p>
      </aside>
    </div>
  );
}
