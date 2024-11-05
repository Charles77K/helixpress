// dropdownOptions.js
import { FaBook } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';
import { IoDocument } from 'react-icons/io5';
import { MdAdminPanelSettings, MdTopic } from 'react-icons/md';

export const DROPDOWN_OPTIONS = [
  {
    content: 'Journals',
    logo: <FaBook size={16} />,
    options: [
      'Create Journal',
      'View Journals',
      'Edit Journal',
      'Delete Journal',
    ],
  },
  {
    content: 'Volumes',
    logo: <FaBook size={16} />,
    options: ['Create Volume', 'View Volumes', 'Edit Volume', 'Delete Volume'],
  },
  {
    content: 'Issues',
    logo: <IoDocument size={18} />,
    options: ['Create Issue', 'View Issues', 'Edit Issue', 'Delete Issue'],
  },
  {
    content: 'Papers',
    logo: <IoIosPaper size={18} />,
    options: ['Create Paper', 'View Papers', 'Edit Paper', 'Delete Paper'],
  },
  {
    content: 'Topics',
    logo: <MdTopic size={18} />,
    options: ['Create Topic', 'View Topics', 'Edit Topic', 'Delete Topic'],
  },
  {
    content: 'Admin Users',
    logo: <MdAdminPanelSettings size={18} />,
    options: ['Create Admin', 'Delete Admin'],
  },
  {
    content: 'News',
    logo: <MdAdminPanelSettings size={18} />,
    options: ['Create News', 'View News', 'Edit News', 'Delete News'],
  },
  {
    content: 'Slider',
    logo: <MdAdminPanelSettings size={18} />,
    options: ['Create Slider', 'View Sliders', 'Edit Slider', 'Delete Slider'],
  },
  {
    content: 'Submission',
    logo: <MdAdminPanelSettings size={18} />,
    options: [
      'Create Submission',
      'View Submissions',
      'Edit Submission',
      'Delete Submission',
    ],
  },
  {
    content: 'NewsLetter',
    logo: <MdAdminPanelSettings size={18} />,
    options: [
      'Create Newsletter',
      'View Newsletter',
      'Edit Newsletter',
      'Delete Newsletter',
    ],
  },
  {
    content: 'About',
    logo: <MdAdminPanelSettings size={18} />,
    options: ['Create About', 'View Abouts', 'Edit About', 'Delete About'],
  },
  {
    content: 'Contact',
    logo: <MdAdminPanelSettings size={18} />,
    options: [
      'Create Contact',
      'View Contacts',
      'Edit Contact',
      'Delete Contact',
    ],
  },
  {
    content: 'Author',
    logo: <MdAdminPanelSettings size={18} />,
    options: ['Create Author', 'View Authors', 'Edit Author', 'Delete Author'],
  },
  {
    content: 'Reviewer',
    logo: <MdAdminPanelSettings size={18} />,
    options: [
      'Create Reviewer',
      'View Reviewers',
      'Edit Reviewer',
      'Delete Reviewer',
    ],
  },
  {
    content: 'Editor',
    logo: <MdAdminPanelSettings size={18} />,
    options: ['Create Editor', 'View Editors', 'Edit Editor', 'Delete Editor'],
  },
  {
    content: 'OpenAccess',
    logo: <MdAdminPanelSettings size={18} />,
    options: [
      'Create OpenAccess',
      'View OpenAccess',
      'Edit OpenAccess',
      'Delete OpenAccess',
    ],
  },
  {
    content: 'EditorialProcess',
    logo: <MdAdminPanelSettings size={18} />,
    options: [
      'Create EditorialProcess',
      'View EditorialProcesses',
      'Edit EditorialProcess',
      'Delete EditorialProcess',
    ],
  },
  {
    content: 'Ethics',
    logo: <MdAdminPanelSettings size={18} />,
    options: ['Create Ethics', 'View Ethics', 'Edit Ethics', 'Delete Ethics'],
  },
  {
    content: 'Charges',
    logo: <MdAdminPanelSettings size={18} />,
    options: [
      'Create Charges',
      'View Charges',
      'Edit Charges',
      'Delete Charges',
    ],
  },
  {
    content: 'VisibilityStatement',
    logo: <MdAdminPanelSettings size={18} />,
    options: [
      'Create VisibilityStatement',
      'View VisibilityStatements',
      'Edit VisibilityStatement',
      'Delete VisibilityStatement',
    ],
  },
];
