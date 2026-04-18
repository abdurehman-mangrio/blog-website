import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-grow ${isHomePage ? '' : 'pt-20 md:pt-24'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;