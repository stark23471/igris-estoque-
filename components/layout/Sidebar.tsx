
import React from 'react';
import { NAV_LINKS } from '../../constants';
import { Page } from '../../types';
import { BRAND } from '../../app/config/brand';

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  return (
    <div className="flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 8.25c0-1.48-.8-2.75-2.99-3.5L12 2 5.99 4.75C3.8 5.5 3 6.77 3 8.25v7.5C3 17.23 3.8 18.5 5.99 19.25L12 22l6.01-2.75C20.2 18.5 21 17.23 21 15.75Z"></path>
            <path d="m3.5 15.75 8.5 4.25 8.5-4.25"></path>
            <path d="M3.5 8.25 12 12.5l8.5-4.25"></path>
            <path d="M12 2v10.5"></path>
        </svg>
        <span className="ml-2 text-2xl font-bold text-gray-800 dark:text-white tracking-wider">{BRAND.name}</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.page}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(link.page);
              }}
              className={`flex items-center px-4 py-2 mt-2 text-sm font-medium rounded-md transition-colors duration-150
                ${
                  activePage === link.page
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-200'
                }`}
            >
              {link.icon}
              <span className="ml-3">{link.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
