// MainLayout.js
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/homeComponents';
import Footer from '../components/Footer';

export function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
