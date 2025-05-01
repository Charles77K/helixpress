import PropTypes from 'prop-types';

const FileInput = ({
  onChange,
  label,
  name,
  error,
  accept,
  placeholder,
  chooseStyle,
}) => {
  return (
    <div className={chooseStyle ? chooseStyle : ''}>
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        type="file"
        name={name}
        onChange={onChange}
        accept={accept}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <p className="text-xs  text-red-500">{error}</p>
    </div>
  );
};

FileInput.propTypes = {
  name: PropTypes.string,
  accept: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  chooseStyle: PropTypes.string,
  error: PropTypes.string,
};

export default FileInput;
