import { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useSearch } from '../Context/SearchContext';

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
      <div className="container bg-white mx-auto md:px-10 px-1 text-xs md:text-sm shadow-sm flex justify-between items-center h-1-6 text-slate-800">
        <div className="flex-shrink-1">
          <Link to="/" className="text-2xl font-semibold text-gray-800">
            <img src="/mdpi.svg" className="w-[3.5rem] h-[3.5rem]" />
          </Link>
        </div>
        <div className="hidden md:flex space-x-9">
          <div className="group relative">
            <Link to="/journals" className="text-slate-800 hover:underline">
              Journals
            </Link>
            {/* Dropdown Content for Desktop */}
            <div className="hidden group-hover:block transition-all ease-in-out duration-300 text-xs absolute px-5 py-2 bg-[#52527a] text-white shadow-lg">
              <Link
                to="/journals/sub1"
                className="block whitespace-nowrap py-1 hover:underline"
              >
                Active Journals
              </Link>
              <Link
                to="/journals/sub2"
                className="block whitespace-nowrap py-1 hover:underline"
              >
                Find a Journal
              </Link>
              <Link
                to="/journals/sub3"
                className="block whitespace-nowrap py-1 hover:underline"
              >
                Proceeding Series
              </Link>
            </div>
          </div>
          <Link to="/topics" className="text-slate-800 hover:underline">
            Topics
          </Link>
          <Link to="/information" className="text-slate-800 hover:underline">
            Information
          </Link>
          <Link to="/about" className="text-slate-800 hover:underline">
            About
          </Link>
          <Link to="/contact" className="text-slate-800 hover:underline">
            Contact Us
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-5">
          <h6 className="border border-solid border-black rounded-lg p-1.5 text-xs hover:bg-slate-700 hover:text-white cursor-pointer transition-bg ease-in-out duration-200">
            Sign In/Sign Up
          </h6>
          <button className="bg-slate-600 px-4 py-1.5 rounded-lg text-white text-xs hover:bg-slate-800 transition-bg ease-in-out duration-200">
            Submit
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex gap-3 items-center">
          <button onClick={toggleSearchBar}>
            <FaSearch />
          </button>
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            {isOpen ? <FaTimes size={21} /> : <MdMenu size={23} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-15 left-0 w-full h-full bg-black opacity-90 font-bold text-white transition-all ease-in-out p-4 text-lg z-50">
          {/* Mobile Dropdown Links */}
          <div className="flex flex-col gap-3">
            <button
              className="flex justify-between items-center w-full px-4 py-2 focus:outline-none"
              onClick={() => toggleDropdown(1)}
            >
              <span>Journals</span>
              {openDropdown === 1 ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openDropdown === 1 && (
              <div className="pl-6 text-xs">
                <Link
                  to="/journals/sub1"
                  className="block py-2 hover:bg-gray-800 hover:underline"
                >
                  Active Journals
                </Link>
                <Link
                  to="/journals/sub2"
                  className="block py-2 hover:bg-gray-800 hover:underline"
                >
                  Find a Journal
                </Link>
                <Link
                  to="/journals/sub3"
                  className="block py-2 hover:bg-gray-800 hover:underline"
                >
                  Proceeding Series
                </Link>
              </div>
            )}
            <Link to="/topics" className="block px-4 py-2 hover:bg-gray-800">
              Topics
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              to="/information"
              className="block px-4 py-2 hover:bg-gray-800"
            >
              Information
            </Link>
            <Link to="/about" className="block px-4 py-2 hover:bg-gray-800">
              About
            </Link>
            <Link to="/contact" className="block px-4 py-2 hover:bg-gray-800">
              Contact Us
            </Link>
            <hr className="py-2"></hr>
            <h6 className="border border-solid text-center border-white rounded-lg p-1.5 text-xs hover:bg-gray-800 cursor-pointer">
              Sign In/Sign Up
            </h6>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
