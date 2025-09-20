
import React from 'react';
import { Kpi } from '../../types';

const KpiCard: React.FC<Kpi> = ({ title, value, change, icon, description }) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</span>
        </div>
        <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-md text-primary-600 dark:text-primary-300">
          {icon}
        </div>
      </div>
      {change !== undefined && (
        <div className="flex items-center mt-4 text-sm">
          <span
            className={`flex items-center font-semibold ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isPositive ? '▲' : '▼'}
            <span className="ml-1">{Math.abs(change)}%</span>
          </span>
          <span className="ml-2 text-gray-500 dark:text-gray-400">{description}</span>
        </div>
      )}
    </div>
  );
};

export default KpiCard;
