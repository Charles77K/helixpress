// import React from 'react'
import PropTypes from 'prop-types';

import { IoMdClose } from 'react-icons/io';
import { MdMenu } from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';

export default function Navbar({ onClick, toggle, handleLogout }) {
  Navbar.propTypes = {
    onClick: PropTypes.func.isRequired,
    toggle: PropTypes.bool.isRequired,
    handleLogout: PropTypes.func.isRequired,
  };
  return (
    <nav className="flex justify-between md:gap-10 items-center px-5 py-2 shadow-black shadow-xl">
      <div className="block md:hidden">
        <button onClick={onClick}>
          {' '}
          {toggle ? <IoMdClose size={25} /> : <MdMenu size={25} />}
        </button>
      </div>
      <div>
        <img src="/mdpi.svg" height={'60px'} width={'60px'} />
      </div>
      <div className="hidden md:flex gap-8 items-center text-xl">
        <p>
          Welome, <span className="font-bold text-slate-800 ">Ogbe Somto</span>
        </p>
        <p onClick={handleLogout}>
          <IoLogOut size={30} color="red" />
        </p>
      </div>
    </nav>
  );
}
