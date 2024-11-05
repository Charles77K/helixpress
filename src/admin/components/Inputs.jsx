import PropTypes from 'prop-types';
import { forwardRef } from 'react';

export function FormInput({ type, label, value, onChange, name, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none"
      />
    </div>
  );
}

export function SelectInput({ name, value, label, onChange, rows }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required
        className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

export const FileInput = forwardRef(
  ({ onChange, label, name, accept, placeholder, chooseStyle }, ref) => {
    return (
      <div className={chooseStyle ? chooseStyle : 'mb-4'}>
        <label className="block text-gray-700 font-bold mb-2">{label}</label>
        <input
          ref={ref}
          type="file"
          name={name}
          onChange={onChange}
          accept={accept}
          placeholder={placeholder}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

export function Button({ children, disabled }) {
  return (
    <button
      type="submit"
      className="w-full rounded-md md:w-1/2 bg-slate-800 text-white p-3 hover:bg-slate-600 mt-4"
      disabled={disabled}
    >
      {children}
    </button>
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  rows: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
};
