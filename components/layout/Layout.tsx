
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Page } from '../../types';
import { BRAND } from '../../app/config/brand';

interface LayoutProps {
  children: React.ReactNode;
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
        <footer className="py-2 px-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} {BRAND.legalOwner}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
