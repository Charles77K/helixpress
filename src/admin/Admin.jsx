import { useState, useRef, useEffect, useCallback } from 'react';
import DropDown from './DropDown';
import DropDownOptions from './DropDownOptions';
import { DROPDOWN_OPTIONS } from './components/Constants';
import { MdDashboard } from 'react-icons/md';
import Navbar from './Navbar.jsx';
import { COMPONENT_MAP } from './ComponentMap.jsx';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../utils/auth.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../store/authentication.js';

export default function Admin() {
  const navigate = useNavigate();
  const sideBarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedPage, setSelectedPage] = useState();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const toggleSideBar = () => {
    setIsOpen((prevState) => !prevState);
  };

  //mutate function to logout
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success('logout successfully');
      dispatch(clearToken());
      navigate('/login', { replace: true });
    },
    onError: (error) => {
      toast.error('failed to logout');
      console.error('Login failed:', error);
    },
  });

  //handlde logout
  const handleLogout = () => {
    mutate(token);
  };

  const handleClickOutside = useCallback((event) => {
    if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const renderPage = () => {
    if (!selectedPage) {
      setSelectedPage('Dashboard');
      return COMPONENT_MAP['Dashboard'] || null;
    } else {
      return COMPONENT_MAP[selectedPage] || null;
    }
  };

  const toggleDropdown = (index) => {
    setOpenDropdown((prevValue) => (prevValue === index ? null : index));
  };

  return (
    <div className="bg-white h-full w-full min-h-[100vh]">
      <Navbar
        onClick={toggleSideBar}
        toggle={isOpen}
        handleLogout={handleLogout}
      />
      <div className="bg-white h-full w-full flex">
        <aside className="hidden md:flex flex-grow md:flex-grow-1 md:basis-[25%] gap-3">
          <div className="flex flex-col items-start p-4 w-full gap-5">
            {/* dashboard */}
            <div
              className={`${
                selectedPage == 'Dashboard'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-800'
              } flex items-center py-2 px-3.5 cursor-pointer w-full rounded-md`}
              onClick={() => setSelectedPage('Dashboard')}
            >
              <span className="mr-2">
                <MdDashboard size={20} />
              </span>
              <h1 className="font-bold text-xl">Dashboard</h1>
            </div>
            {/* side bar content */}
            <div className="w-full">
              {DROPDOWN_OPTIONS.map((item, index) => (
                <div key={index} className="py-2">
                  <DropDown
                    content={item.content}
                    openDropdown={openDropdown}
                    onClick={() => toggleDropdown(index)}
                    index={index}
                    logo={item.logo}
                  />
                  {openDropdown === index && (
                    <DropDownOptions
                      options={item.options}
                      onClick={(option) => setSelectedPage(option)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>
        <section
          className="flex-grow md:flex-grow-2 md:basis-[75%] w-full bg-white"
          id="close"
        >
          {renderPage()}
        </section>
      </div>
      {/* mobile view side bar */}
      {isOpen && (
        <div
          ref={sideBarRef}
          className="flex absolute top-10 left-0 md:hidden min-h-screen flex-col items-start p-4 w-[60%] min-[500px]:w-[50%] gap-5 bg-white"
        >
          {/* dashboard */}
          <div className="flex items-center py-2 px-3.5">
            <span className="mr-2">
              <MdDashboard size={20} />
            </span>
            <h1 className="text-slate-800 font-bold text-xl">Dashboard</h1>
          </div>
          <div className="w-full">
            {DROPDOWN_OPTIONS.map((item, index) => (
              <div key={index} className="py-2">
                <DropDown
                  content={item.content}
                  openDropdown={openDropdown}
                  onClick={() => toggleDropdown(index)}
                  index={index}
                  logo={item.logo}
                />
                {openDropdown === index && (
                  <DropDownOptions
                    options={item.options}
                    onClick={(option) => setSelectedPage(option)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
