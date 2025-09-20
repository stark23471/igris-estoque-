
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, id, name, error, className = '', ...props }) => {
  const baseClasses = 'block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500';
  const errorClasses = 'border-red-500 focus:ring-red-500 focus:border-red-500';

  return (
    <div>
      {label && <label htmlFor={id || name} className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <input
        id={id || name}
        name={name}
        className={`${baseClasses} ${error ? errorClasses : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
