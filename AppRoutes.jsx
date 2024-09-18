import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Home,
  About,
  Contact,
  Information,
  Journals,
  Topics,
} from './src/pages';
import Footer from './src/components/Footer';
import Navbar from './src/components/homeComponents/Navbar';

export default function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journals" element={<Journals />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/information" element={<Information />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}
