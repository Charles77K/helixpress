import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Home,
  About,
  Contact,
  Information,
  Topics,
  Journals,
} from './src/pages';
import {
  FindJournal,
  JournalProposal,
  ProceedingSeries,
  ActiveJournals,
} from './src/components/JournalComponents';
import Footer from './src/components/Footer';
import Navbar from './src/components/homeComponents/Navbar';
import {
  AccessPolicy,
  Institutional,
  Conference,
  Articles,
  Authors,
  Editorial,
  Editors,
  Librarians,
  Reasearch,
  Reviewers,
  Publishers,
  Societies,
} from './src/components/infoComponents';
// import Journals from './src/components/Journals';

export default function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics />} />
        {/* information section */}
        <Route path="/information/librarians" element={<Librarians />} />
        <Route path="/information/societies" element={<Societies />} />
        {/* list of routes with outlet functionality */}
        <Route path="/information" element={<Information />}>
          <Route index element={<Authors />} />
          <Route path="reviewers" element={<Reviewers />} />
          <Route path="publishers" element={<Publishers />} />
          <Route path="conference" element={<Conference />} />
          <Route path="program" element={<Institutional />} />
          <Route path="editors" element={<Editors />} />
          <Route path="access" element={<AccessPolicy />} />
          <Route path="research" element={<Reasearch />} />
          <Route path="article" element={<Articles />} />
          <Route path="editorial" element={<Editorial />} />
        </Route>
        {/* end of information section */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* journals section */}
        <Route path="/journals" element={<Journals />}>
          <Route index element={<ActiveJournals />} /> {/* Default content */}
          <Route path="find" element={<FindJournal />} />
          <Route path="proposal" element={<JournalProposal />} />
          <Route path="proceeding" element={<ProceedingSeries />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}
