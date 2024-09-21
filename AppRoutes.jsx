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
// import Journals from './src/components/Journals';

export default function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/information" element={<Information />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
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
