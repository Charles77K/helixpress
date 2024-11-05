import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
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
      <div className="bg-white mx-auto md:px-5 lg:px-8 px-1 md:py-4 text-xs md:text-sm shadow-sm flex justify-between items-center text-slate-800">
        <div className="flex-shrink-0 pl-2">
          <Link to="/" className="text-2xl font-semibold text-gray-800">
            <img
              src="/helixNav.png"
              className="w-[8rem] h-[1.5rem] md:w-[8rem] md:h-[1.5rem] lg:w-[10rem] lg:h-[2rem]"
            />
          </Link>
        </div>
        <div className="hidden md:flex md:space-x-5 lg:space-x-9">
          <div className="group relative">
            <Link
              to="/journals"
              className="text-slate-800 hover:underline font-semibold"
            >
              Journals
            </Link>
            {/* Dropdown Content for Desktop */}
            <div className="hidden min-w-[10rem] group-hover:block transition-all ease-in-out duration-300 text-xs absolute px-5 py-2 bg-[#52527a] text-white shadow-lg">
              <Link
                to="/journals"
                className="block whitespace-nowrap py-1 hover:underline"
              >
                Active Journals
              </Link>
              <Link
                to="/journals/find"
                className="block whitespace-nowrap py-1 hover:underline"
              >
                Find a Journal
              </Link>
              <Link
                to="/journals/proposal"
                className="block whitespace-nowrap py-1 hover:underline"
              >
                Journal Proposal
              </Link>
              <Link
                to="/journals/proceeding"
                className="block whitespace-nowrap py-1 hover:underline"
              >
                Proceeding Series
              </Link>
            </div>
          </div>
          <Link
            to="/topics"
            className="text-slate-800 hover:underline font-semibold"
          >
            Topics
          </Link>
          <div className="group relative">
            <Link
              to="/information"
              className="text-slate-800 hover:underline font-semibold"
            >
              Information
            </Link>
            {/* Dropdown Content for Desktop */}
            <div className="hidden group-hover:flex gap-4 transition-all ease-in-out duration-300 text-xs absolute px-5 py-2 bg-[#52527a] text-white shadow-lg">
              {/* section 1 */}
              <section>
                <Link
                  to="/information"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  For Authors
                </Link>
                <Link
                  to="/information/reviewers"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  For Reviewers
                </Link>
                <Link
                  to="/information/editors"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  For Editors
                </Link>
                <Link
                  to="/information/librarians"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  For Librarians
                </Link>
                <Link
                  to="/information/publishers"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  For Publishers
                </Link>
                <Link
                  to="/information/societies"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  For Societies
                </Link>
                <Link
                  to="/information/conference"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  For Conference Organizers
                </Link>
              </section>
              {/* section 2 */}
              <section>
                <Link
                  to="/information/access"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Open Access Policy
                </Link>
                <Link
                  to="/information/program"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Institutional Open Access Program
                </Link>
                <Link
                  to="/information/special"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Special Issues Guidelines
                </Link>
                <Link
                  to="/information/editorial"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Editorial Process
                </Link>
                <Link
                  to="/information/research"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Research and Publication Ethics
                </Link>
                <Link
                  to="/information/article"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Article Processing Charges
                </Link>
                <Link
                  to="/information/awards"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Awards
                </Link>
                <Link
                  to="/information/testimonials"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Testimonials
                </Link>
              </section>
            </div>
          </div>
          <Link
            to="/about"
            className="text-slate-800 hover:underline font-semibold"
          >
            Author Services
          </Link>
          {/*  */}

          <div className="group relative">
            <Link
              to="/about"
              className="text-slate-800 hover:underline font-semibold"
            >
              About
            </Link>
            {/* Dropdown Content for Desktop */}
            <div className="hidden min-w-[10rem] group-hover:block transition-all ease-in-out duration-300 text-xs absolute px-5 py-2 bg-[#52527a] text-white shadow-lg">
              <Link
                to="/about"
                className="block whitespace-nowrap py-1 hover:underline"
              >
                Overview
              </Link>
              <Link
                to="/about/contact"
                className="block whitespace-nowrap py-1 hover:underline"
              >
                Contact
              </Link>
              <Link
                to="/journals/sub3"
                className="block whitespace-nowrap py-1 hover:underline"
              >
                Careers
              </Link>
              <Link
                to="/about/news"
                className="block whitespace-nowrap py-1 hover:underline"
              >
                News
              </Link>
              <Link
                to="/journals/sub3"
                className="block whitespace-nowrap py-1 hover:underline"
              >
                Press
              </Link>
              <Link
                to="/journals/sub3"
                className="block whitespace-nowrap py-1 hover:underline"
              >
                Blogs
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-5">
          <Link
            className="border border-solid border-black rounded-lg p-1.5 text-xs hover:bg-slate-700 hover:text-white cursor-pointer transition-bg ease-in-out duration-200"
            to={'/login'}
          >
            Sign In/Sign Up
          </Link>
          <button className="bg-slate-600 px-4 py-1.5 rounded-lg text-white text-xs hover:bg-slate-800 transition-bg ease-in-out duration-200">
            Submit
          </button>
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
                  to="/journals"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Active Journals
                </Link>
                <Link
                  to="/find"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Find a Journal
                </Link>
                <Link
                  to="/proposal"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Journal Proposal
                </Link>
                <Link
                  to="/proceeding"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Proceeding Series
                </Link>
              </div>
            )}
            <Link to="/topics" className="block px-4 py-2 hover:bg-gray-800">
              Topics
            </Link>
            <button
              className="flex justify-between items-center w-full px-4 py-2 focus:outline-none"
              onClick={() => toggleDropdown(2)}
            >
              <span>Information</span>
              {openDropdown === 2 ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openDropdown === 2 && (
              <div className="pl-6 text-xs">
                <Link
                  to="/information"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  For Authors
                </Link>
                <Link
                  to="/information/reviewers"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  For Reviewers
                </Link>
                <Link
                  to="/information/editors"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  For Editors
                </Link>
                <Link
                  to="/information/librarians"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  For Librarians
                </Link>
                <Link
                  to="/information/publishers"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  For Publishers
                </Link>
                <Link
                  to="/information/societies"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  For Societies
                </Link>
                <Link
                  to="/information/conference"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  For Conference Organizers
                </Link>
                <Link
                  to="/information/access"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Open Access Policy
                </Link>
                <Link
                  to="/information/program"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Institutional Open Access Program
                </Link>
                <Link
                  to="/information/special"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Special Issues Guidelines
                </Link>
                <Link
                  to="/information/editorial"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Editorial Process
                </Link>
                <Link
                  to="/information/research"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Research and Publication Ethics
                </Link>
                <Link
                  to="/information/article"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Article Processing Charges
                </Link>
                <Link
                  to="/information/awards"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Awards
                </Link>
                <Link
                  to="/information/testimonials"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Testimonials
                </Link>
              </div>
            )}
            <Link to="/about" className="block px-4 py-2 hover:bg-gray-800">
              Author Services
            </Link>
            <button
              className="flex justify-between items-center w-full px-4 py-2 focus:outline-none"
              onClick={() => toggleDropdown(3)}
            >
              <span>About</span>
              {openDropdown === 3 ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openDropdown === 3 && (
              <div className="pl-6 text-xs">
                <Link
                  to="/about"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Overview
                </Link>
                <Link
                  to="/contact"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Contact
                </Link>
                <Link
                  to="/about/careers"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Careers
                </Link>
                <Link
                  to="/about/news"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  News
                </Link>
                <Link
                  to="/about/press"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Press
                </Link>
                <Link
                  to="/about/blogs"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  Blogs
                </Link>
              </div>
            )}
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
