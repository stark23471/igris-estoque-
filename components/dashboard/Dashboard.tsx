
import React, { useState, useEffect } from 'react';
import { getDashboardKpis, getRecentMovements } from '../../services/api';
import KpiCard from './KpiCard';
import RecentMovements from './RecentMovements';
import { Kpi, StockMovement } from '../../types';

const Dashboard: React.FC = () => {
  const [kpis, setKpis] = useState<Kpi[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [kpiData, movementData] = await Promise.all([
            getDashboardKpis(),
            getRecentMovements(10)
        ]);
        setKpis(kpiData);
        setMovements(movementData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <KpiCard key={index} {...kpi} />
        ))}
      </div>
      <div className="mt-8">
        <RecentMovements movements={movements} />
      </div>
    </div>
  );
};

export default Dashboard;
