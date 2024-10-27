// import React from 'react';
import PropTypes from 'prop-types';

export default function DropDownOptions({ options, onClick }) {
  DropDownOptions.propTypes = {
    options: PropTypes.array.isRequired,
    onClick: PropTypes.any.isRequired,
  };
  return (
    <ul className="bg-slate-100 shadow-lg p-4 rounded-md">
      {options.map((option, index) => (
        <li className="flex items-center py-2" key={index}>
          <input
            type="radio"
            name="options"
            className="mr-2 accent-slate-600"
            onClick={() => onClick(option)}
          />
          <span className="text-sm">{option}</span>
        </li>
      ))}
    </ul>
  );
}
