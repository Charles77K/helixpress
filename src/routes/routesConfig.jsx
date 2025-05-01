// routesConfig.js
import {
  Home,
  About,
  Contact,
  Information,
  Topics,
  Journals,
  Submission,
  CurrentPaper,
  AllNews,
  Blogs,
  SearchPage,
  BlogPage,
  NewsPage,
} from '../pages';
import {
  FindJournal,
  JournalProposal,
  ProceedingSeries,
  ActiveJournals,
} from '../components/JournalComponents';
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
import MainLayout from './MainLayout';
import JournalPage from '../journalPages/JournalPage';
import CurrentJournal from '../journalPages/CurrentJournal';

const routesConfig = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/about',
        element: <About />,
      },
      { path: '/about/news', element: <AllNews /> },
      { path: '/about/news/:id', element: <NewsPage /> },
      { path: '/about/contact', element: <Contact /> },
      { path: '/topics', element: <Topics /> },
      { path: '/paper/:id', element: <CurrentPaper /> },
      {
        path: '/journals',
        element: <Journals />,
        children: [
          { index: true, element: <ActiveJournals /> },
          { path: 'find', element: <FindJournal /> },
          { path: 'proposal', element: <JournalProposal /> },
          { path: 'proceeding', element: <ProceedingSeries /> },
        ],
      },
      {
        path: 'journal/:name/:id',
        element: <JournalPage />,
        children: [{ index: true, element: <CurrentJournal /> }],
      },
      {
        path: '/information',
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
        ],
      },
      { path: 'information/librarians', element: <Librarians /> },
      { path: 'information/societies', element: <Societies /> },
      {
        path: '/blogs',
        element: <Blogs />,
      },
      {
        path: '/blog/:id',
        element: <BlogPage />,
      },
      {
        path: '/submission',
        element: <Submission />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
    ],
  },
  // {
  //   path: '/login',
  //   element: <Login />,
  // },
  // {
  //   path: '/admin',
  //   element: <AdminLayout />,
  //   // loader: checkAuthLoader,
  //   children: [{ path: '', element: <ProtectedRoute element={<Admin />} /> }],
  // },
];

export default routesConfig;
