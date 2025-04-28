import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useSearch } from '../Context/SearchContext';
import { NAV_LINKS } from '../../../constants/static';

const Navbar = () => {
  const { toggleSearchBar } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleDropdown = (index) => {
    setOpenDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    // Toggle the `no-scroll` class on the body element
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Clean up class when component is unmounted
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="bg-white mx-auto md:px-5 lg:px-8 px-1 md:py-4 text-xs md:text-sm shadow-sm flex justify-between items-center text-slate-800">
        <div className="flex-shrink-0 pl-2">
          <Link to="/" className="text-2xl font-semibold text-gray-800">
            <img
              src="/helixNav.png"
              className="w-[8rem] h-[1.5rem] md:w-[8rem] md:h-[1.5rem] lg:w-[10rem] lg:h-[2rem]"
            />
          </Link>
        </div>

        {/* end of logo */}
        <div className="hidden md:flex md:space-x-5 lg:space-x-9">
          {NAV_LINKS.map((item, index) => (
            <div key={index} className="group relative">
              <Link
                to={item.path}
                className="text-slate-800 hover:underline font-semibold"
              >
                {item.title}
              </Link>

              {/* Dropdown Menu */}
              {item.dropdown && (
                <div
                  className={`hidden ${
                    item.isMultiColumn
                      ? 'group-hover:flex gap-4'
                      : 'group-hover:block min-w-[10rem]'
                  } transition-all ease-in-out duration-300 text-xs absolute px-5 py-2 bg-[#52527a] text-white shadow-lg`}
                >
                  {item.isMultiColumn
                    ? // Multi-column dropdown
                      item.dropdown.map((section, sectionIndex) => (
                        <section key={sectionIndex}>
                          {section.map((link, linkIndex) => (
                            <Link
                              key={linkIndex}
                              to={link.path}
                              className="block whitespace-nowrap py-1 hover:underline"
                            >
                              {link.title}
                            </Link>
                          ))}
                        </section>
                      ))
                    : // Single-column dropdown
                      item.dropdown.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          to={link.path}
                          className="block whitespace-nowrap py-1 hover:underline"
                        >
                          {link.title}
                        </Link>
                      ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* cta  */}
        <div className="hidden md:flex items-center space-x-5">
          <Link
            className="border border-solid border-black rounded-lg p-1.5 text-xs hover:bg-slate-700 hover:text-white cursor-pointer transition-bg ease-in-out duration-200"
            to={'/login'}
          >
            Sign In/Sign Up
          </Link>
          {/* create a submission */}
          <Link to="/submission">
            <button className="bg-slate-600 px-4 py-1.5 rounded-lg text-white text-xs hover:bg-slate-800 transition-bg ease-in-out duration-200">
              Submit
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex gap-3 p-4 items-center">
          <button onClick={toggleSearchBar}>
            <FaSearch size={20} />
          </button>
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            {isOpen ? <IoMdClose size={25} /> : <MdMenu size={25} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-15 left-0 w-full h-full bg-black opacity-90 font-bold text-white transition-all ease-in-out p-4 text-lg z-50">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((item, index) => (
              <React.Fragment key={index}>
                {item.dropdown ? (
                  <>
                    <button
                      className="flex justify-between items-center w-full px-4 py-2 focus:outline-none"
                      onClick={() => toggleDropdown(index)}
                    >
                      <span>{item.title}</span>
                      {openDropdown === index ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                    {openDropdown === index && (
                      <div className="pl-6 text-xs">
                        {item.isMultiColumn
                          ? // For multi-column dropdowns, flatten the structure for mobile
                            item.dropdown.flat().map((link, linkIndex) => (
                              <Link
                                key={linkIndex}
                                to={link.path}
                                className="block whitespace-nowrap py-1 hover:underline"
                              >
                                {link.title}
                              </Link>
                            ))
                          : // Single column dropdown
                            item.dropdown.map((link, linkIndex) => (
                              <Link
                                key={linkIndex}
                                to={link.path}
                                className="block whitespace-nowrap py-1 hover:underline"
                              >
                                {link.title}
                              </Link>
                            ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    {item.title}
                  </Link>
                )}
              </React.Fragment>
            ))}
            <hr className="py-2"></hr>
            <Link
              to="/login"
              className="border border-solid text-center border-white rounded-lg p-1.5 text-xs hover:bg-gray-800 cursor-pointer"
            >
              Sign In/Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
