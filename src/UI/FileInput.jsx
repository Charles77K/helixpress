import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const FileInput = forwardRef(
  ({ onChange, label, name, accept, placeholder, chooseStyle }, ref) => {
    return (
      <div className={chooseStyle ? chooseStyle : 'mb-4'}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <input
          ref={ref}
          type="file"
          name={name}
          onChange={onChange}
          accept={accept}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    );
  }
);

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  chooseStyle: PropTypes.string,
};

FileInput.displayName = 'FileInput';

export default FileInput;
