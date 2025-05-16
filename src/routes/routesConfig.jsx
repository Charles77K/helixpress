/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
// routesConfig.js

// Core pages - immediate load for critical/frequently accessed pages
import Home from '../pages/Home';
import About from '../pages/About';
import Topics from '../pages/Topics';
import Information from '../pages/Information';

// Lazy-loaded pages (less frequently accessed)
const Contact = lazy(() => import('../pages/Contact'));
const Submission = lazy(() => import('../pages/Submission'));
const CurrentPaper = lazy(() => import('../pages/CurrentPaper'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const Login = lazy(() => import('../pages/Login'));

// Content pages with lazy loading
const AllNews = lazy(() => import('../pages/AllNews'));
const Blogs = lazy(() => import('../pages/Blogs'));
const BlogPage = lazy(() => import('../pages/BlogPage'));
const NewsPage = lazy(() => import('../pages/NewsPage'));
const TopicPage = lazy(() => import('../pages/TopicPage'));
const Journals = lazy(() => import('../pages/Journals'));

// Journal-related components with lazy loading
const FindJournal = lazy(() =>
  import('../components/JournalComponents/FindJournal')
);
const JournalProposal = lazy(() =>
  import('../components/JournalComponents/JournalProposal')
);
const ProceedingSeries = lazy(() =>
  import('../components/JournalComponents/ProceedingSeries')
);
const ActiveJournals = lazy(() =>
  import('../components/JournalComponents/ActiveJournals')
);
const JournalPage = lazy(() => import('../journalPages/JournalPage'));
const CurrentJournal = lazy(() => import('../journalPages/CurrentJournal'));

// Information section components with lazy loading
const AccessPolicy = lazy(() =>
  import('../components/infoComponents/AccessPolicy')
);
const Articles = lazy(() => import('../components/infoComponents/Articles'));
const Authors = lazy(() => import('../components/infoComponents/Authors'));
const Conference = lazy(() =>
  import('../components/infoComponents/Conference')
);
const Editorial = lazy(() => import('../components/infoComponents/Editorial'));
const Editors = lazy(() => import('../components/infoComponents/Editors'));
const Institutional = lazy(() =>
  import('../components/infoComponents/Institutional')
);
const Publishers = lazy(() =>
  import('../components/infoComponents/Publishers')
);
const Research = lazy(() => import('../components/infoComponents/Research'));
const Reviewers = lazy(() => import('../components/infoComponents/Reviewers'));
const Societies = lazy(() => import('../components/infoComponents/Societies'));
const Librarians = lazy(() =>
  import('../components/infoComponents/Librarians')
);

// Layout imports
import MainLayout from './MainLayout';
import LoadingAnimation from '../UI/LoadingAnimation';
// import AdminLayout from './AdminLayout';
// import ProtectedRoute from '../components/ProtectedRoute';

// Helper function to wrap components with Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<LoadingAnimation />}>
    <Component />
  </Suspense>
);

const routesConfig = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Core pages - no Suspense for critical routes
      { index: true, element: <Home /> },
      { path: 'search', element: withSuspense(SearchPage) },
      { path: 'submission', element: withSuspense(Submission) },
      { path: 'paper/:id', element: withSuspense(CurrentPaper) },

      // About section
      {
        path: 'about',
        children: [
          { index: true, element: <About /> },
          { path: 'contact', element: withSuspense(Contact) },
          { path: 'news', element: withSuspense(AllNews) },
          { path: 'news/:id', element: withSuspense(NewsPage) },
        ],
      },

      // Topics section - frequently accessed
      {
        path: 'topics',
        children: [
          { index: true, element: <Topics /> },
          { path: ':id', element: withSuspense(TopicPage) },
        ],
      },

      // Journals section
      {
        path: 'journals',
        element: withSuspense(Journals),
        children: [
          { index: true, element: withSuspense(ActiveJournals) },
          { path: 'find', element: withSuspense(FindJournal) },
          { path: 'proposal', element: withSuspense(JournalProposal) },
          { path: 'proceeding', element: withSuspense(ProceedingSeries) },
        ],
      },

      // Journal pages
      {
        path: 'journal/:name/:id',
        element: withSuspense(JournalPage),
        children: [{ index: true, element: withSuspense(CurrentJournal) }],
      },

      // Information section
      {
        path: 'information',
        element: <Information />,
        children: [
          { index: true, element: withSuspense(Authors) },
          { path: 'reviewers', element: withSuspense(Reviewers) },
          { path: 'publishers', element: withSuspense(Publishers) },
          { path: 'conference', element: withSuspense(Conference) },
          { path: 'program', element: withSuspense(Institutional) },
          { path: 'editors', element: withSuspense(Editors) },
          { path: 'access', element: withSuspense(AccessPolicy) },
          { path: 'research', element: withSuspense(Research) },
          { path: 'article', element: withSuspense(Articles) },
          { path: 'editorial', element: withSuspense(Editorial) },
          { path: 'librarians', element: withSuspense(Librarians) },
          { path: 'societies', element: withSuspense(Societies) },
        ],
      },

      // Blogs section
      {
        path: 'blogs',
        children: [
          { index: true, element: withSuspense(Blogs) },
          { path: ':id', element: withSuspense(BlogPage) },
        ],
      },
    ],
  },

  // Auth routes
  {
    path: '/login',
    children: [{ index: true, element: <Login /> }],
  },
  /*
  {
    path: 'admin',
    element: <AdminLayout />,
    // loader: checkAuthLoader,
    children: [
      { index: true, element: <ProtectedRoute element={withSuspense(Admin)} /> }
    ],
  },
  */
];

export default routesConfig;
