import { useState, useRef, useEffect } from 'react';
import DropDown from './DropDown';
import DropDownOptions from './DropDownOptions';
import { FaBook } from 'react-icons/fa';
import { FaBookJournalWhills } from 'react-icons/fa6';
import { IoDocument } from 'react-icons/io5';
import { IoIosPaper } from 'react-icons/io';
import { MdAdminPanelSettings, MdDashboard, MdTopic } from 'react-icons/md';
import Navbar from './Navbar.jsx';
import { COMPONENT_MAP } from './ComponentMap.jsx';

export default function Admin() {
  const sideBarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedPage, setSelectedPage] = useState();

  const toggleSideBar = () => {
    setIsOpen((prevState) => !prevState);
  };
  //
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, [sideBarRef]);

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
  const sliderOptions = [
    'Create Slider',
    'View Sliders',
    'Edit Slider',
    'Delete Slider',
  ];
  const expenseOptions = [
    'Create Journal',
    'View Journals',
    'Edit Journal',
    'Delete Journal',
  ];

  const volumeOptions = [
    'Create Volume',
    'View Volumes',
    'Edit Volume',
    'Delete Volume',
  ];
  const issuesOptions = [
    'Create an Issue',
    'View Issues',
    'Edit Issue',
    'Delete Issue',
  ];
  const papersOptions = [
    'Create Paper',
    'View Papers',
    'Edit Paper',
    'Delete Paper',
  ];
  const topicsOptions = [
    'Create Topic',
    'View Topics',
    'Edit Topic',
    'Delete Topic',
  ];
  const submissionOptions = [
    'Create Submission',
    'View Submissions',
    'Edit Submission',
    'Delete Submission',
  ];
  const newsletterOptions = [
    'Create Newsletter',
    'View Newsletter',
    'Edit Newsletter',
    'Delete Newsletter',
  ];
  const aboutOptions = [
    'Create About',
    'View Abouts',
    'Edit About',
    'Delete About',
  ];
  const contactOptions = [
    'Create Contact',
    'View Contacts',
    'Edit Contact',
    'Delete Contact',
  ];
  const authorOptions = [
    'Create Author',
    'View Authors',
    'Edit Author',
    'Delete Author',
  ];
  const reviewerOptions = [
    'Create Reviewer',
    'View Reviewers',
    'Edit Reviewer',
    'Delete Reviewer',
  ];
  const editorOptions = [
    'Create Editor',
    'View Editors',
    'Edit Editor',
    'Delete Editor',
  ];
  const openAccessOptions = [
    'Create OpenAccess',
    'View OpenAccess',
    'Edit OpenAccess',
    'Delete OpenAccess',
  ];
  const editorialProcessOptions = [
    'Create EditorialProcess',
    'View EditorialProcesses',
    'Edit EditorialProcess',
    'Delete EditorialProcess',
  ];
  const ethicsOptions = [
    'Create Ethics',
    'View Ethics',
    'Edit Ethics',
    'Delete Ethics',
  ];
  const chargesOptions = [
    'Create Charges',
    'View Charges',
    'Edit Charges',
    'Delete Charges',
  ];
  const visibilityStatementOptions = [
    'Create VisibilityStatement',
    'View VisibilityStatements',
    'Edit VisibilityStatement',
    'Delete VisibilityStatement',
  ];
  const newsOptions = ['Create News', 'View News', 'Edit News', 'Delete News'];
  const adminOptions = ['Create Admin', 'Delete Admin'];

  const dropdownItems = [
    {
      content: 'Journals',
      logo: <FaBookJournalWhills size={16} />,
      options: expenseOptions,
    },
    { content: 'Volumes', logo: <FaBook size={16} />, options: volumeOptions },
    {
      content: 'Issues',
      logo: <IoDocument size={18} />,
      options: issuesOptions,
    },
    {
      content: 'Papers',
      logo: <IoIosPaper size={18} />,
      options: papersOptions,
    },
    { content: 'Topics', logo: <MdTopic size={18} />, options: topicsOptions },
    {
      content: 'Admin Users',
      logo: <MdAdminPanelSettings size={18} />,
      options: adminOptions,
    },
    {
      content: 'News',
      logo: <MdAdminPanelSettings size={18} />,
      options: newsOptions,
    },
    {
      content: 'Slider',
      logo: <MdAdminPanelSettings size={18} />,
      options: sliderOptions,
    },
    {
      content: 'Submission',
      logo: <MdAdminPanelSettings size={18} />,
      options: submissionOptions,
    },
    {
      content: 'NewsLetter',
      logo: <MdAdminPanelSettings size={18} />,
      options: newsletterOptions,
    },
    {
      content: 'About',
      logo: <MdAdminPanelSettings size={18} />,
      options: aboutOptions,
    },
    {
      content: 'Contact',
      logo: <MdAdminPanelSettings size={18} />,
      options: contactOptions,
    },
    {
      content: 'Author',
      logo: <MdAdminPanelSettings size={18} />,
      options: authorOptions,
    },
    {
      content: 'Reviewer',
      logo: <MdAdminPanelSettings size={18} />,
      options: reviewerOptions,
    },
    {
      content: 'Editor',
      logo: <MdAdminPanelSettings size={18} />,
      options: editorOptions,
    },
    {
      content: 'OpenAccess',
      logo: <MdAdminPanelSettings size={18} />,
      options: openAccessOptions,
    },
    {
      content: 'EditorialProcess',
      logo: <MdAdminPanelSettings size={18} />,
      options: editorialProcessOptions,
    },
    {
      content: 'Ethics',
      logo: <MdAdminPanelSettings size={18} />,
      options: ethicsOptions,
    },
    {
      content: 'Charges',
      logo: <MdAdminPanelSettings size={18} />,
      options: chargesOptions,
    },
    {
      content: 'VisibilityStatement',
      logo: <MdAdminPanelSettings size={18} />,
      options: visibilityStatementOptions,
    },
  ];

  return (
    <div className="bg-white h-full w-full min-h-[100vh]">
      <Navbar onClick={toggleSideBar} toggle={isOpen} />
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
              {dropdownItems.map((item, index) => (
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
          className="flex absolute top-10 left-0 md:hidden h-screen flex-col items-start p-4 w-[60%] gap-5 bg-white"
        >
          {/* the header */}
          {/* dashboard */}
          <div className="flex items-center py-2 px-3.5">
            <span className="mr-2">
              <MdDashboard size={20} />
            </span>
            <h1 className="text-slate-800 font-bold text-xl">Dashboard</h1>
          </div>
          {/* Journals */}
          <div className="w-full">
            {dropdownItems.map((item, index) => (
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
