
import React from 'react';

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const BellIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="w-5 h-5 text-gray-500" />
          </span>
          <input
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-500 focus:outline-none focus:ring focus:ring-primary-300 focus:ring-opacity-40"
            type="text"
            placeholder="Buscar produtos, SKUs..."
          />
        </div>
      </div>

      <div className="flex items-center">
        <button className="p-2 text-gray-500 rounded-md hover:bg-gray-100 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 focus:outline-none">
          <BellIcon className="w-6 h-6" />
        </button>

        <div className="relative ml-4">
          <button className="flex items-center focus:outline-none">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src="https://picsum.photos/100"
              alt="Avatar"
            />
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
