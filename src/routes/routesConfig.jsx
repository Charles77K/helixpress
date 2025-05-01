// routesConfig.js

// Page imports - core site pages
import {
  Home,
  About,
  Contact,
  Information,
  Topics,
  Journals,
  Submission,
  CurrentPaper,
  SearchPage,
} from '../pages';

// Content page imports
import { AllNews, Blogs, BlogPage, NewsPage, TopicPage } from '../pages';

// Journal-related component imports
import {
  FindJournal,
  JournalProposal,
  ProceedingSeries,
  ActiveJournals,
} from '../components/JournalComponents';

import JournalPage from '../journalPages/JournalPage';
import CurrentJournal from '../journalPages/CurrentJournal';

// Information section component imports
import {
  AccessPolicy,
  Articles,
  Authors,
  Conference,
  Editorial,
  Editors,
  Institutional,
  Publishers,
  Research,
  Reviewers,
  Societies,
  Librarians,
} from '../components/infoComponents';

// Layout imports
import MainLayout from './MainLayout';
// import AdminLayout from './AdminLayout';
// import Login from '../pages/Login';
// import Admin from '../pages/Admin';
// import ProtectedRoute from '../components/ProtectedRoute';

const routesConfig = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Core pages
      { index: true, element: <Home /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'submission', element: <Submission /> },
      { path: 'paper/:id', element: <CurrentPaper /> },

      // About section
      {
        path: 'about',
        children: [
          { index: true, element: <About /> },
          { path: 'contact', element: <Contact /> },
          { path: 'news', element: <AllNews /> },
          { path: 'news/:id', element: <NewsPage /> },
        ],
      },

      // Topics section
      {
        path: 'topics',
        children: [
          { index: true, element: <Topics /> },
          { path: ':id', element: <TopicPage /> },
        ],
      },

      // Journals section
      {
        path: 'journals',
        element: <Journals />,
        children: [
          { index: true, element: <ActiveJournals /> },
          { path: 'find', element: <FindJournal /> },
          { path: 'proposal', element: <JournalProposal /> },
          { path: 'proceeding', element: <ProceedingSeries /> },
        ],
      },

      // Journal pages
      {
        path: 'journal/:name/:id',
        element: <JournalPage />,
        children: [{ index: true, element: <CurrentJournal /> }],
      },

      // Information section
      {
        path: 'information',
        element: <Information />,
        children: [
          { index: true, element: <Authors /> },
          { path: 'reviewers', element: <Reviewers /> },
          { path: 'publishers', element: <Publishers /> },
          { path: 'conference', element: <Conference /> },
          { path: 'program', element: <Institutional /> },
          { path: 'editors', element: <Editors /> },
          { path: 'access', element: <AccessPolicy /> },
          { path: 'research', element: <Research /> },
          { path: 'article', element: <Articles /> },
          { path: 'editorial', element: <Editorial /> },
          { path: 'librarians', element: <Librarians /> },
          { path: 'societies', element: <Societies /> },
        ],
      },

      // Blogs section
      {
        path: 'blogs',
        children: [
          { index: true, element: <Blogs /> },
          { path: ':id', element: <BlogPage /> },
        ],
      },
    ],
  },

  // Auth routes - currently commented out but organized for future use
  /*
  {
    path: 'auth',
    children: [
      { path: 'login', element: <Login /> },
    ],
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    // loader: checkAuthLoader,
    children: [
      { index: true, element: <ProtectedRoute element={<Admin />} /> }
    ],
  },
  */
];

export default routesConfig;
