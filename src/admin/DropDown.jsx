// import React from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

export default function DropDown({
  openDropdown,
  onClick,
  content,
  index,
  logo,
}) {
  DropDown.propTypes = {
    openDropdown: PropTypes.any,
    onClick: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    logo: PropTypes.node.isRequired,
  };
  return (
    <>
      <button
        className={`flex justify-between items-center w-full px-4 rounded-md py-2 focus:outline-none ${
          openDropdown === index && 'bg-slate-700 text-white'
        }`}
        onClick={onClick}
      >
        <p className="font-semibold flex items-center">
          <span className="mr-2">{logo}</span>
          <span> {content}</span>
        </p>
        {openDropdown === index ? <FaChevronDown /> : <FaChevronRight />}
      </button>
    </>
  );
}
