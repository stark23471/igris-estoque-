
import React, { useState, useCallback } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import ProductList from './components/products/ProductList';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductList />;
      case 'movements':
        return <div className="p-6"><h1 className="text-2xl font-semibold text-gray-900">Movimentações de Estoque</h1><p className="text-gray-500 mt-2">Funcionalidade a ser implementada.</p></div>;
      case 'categories':
        return <div className="p-6"><h1 className="text-2xl font-semibold text-gray-900">Categorias</h1><p className="text-gray-500 mt-2">Funcionalidade a ser implementada.</p></div>;
      case 'brands':
        return <div className="p-6"><h1 className="text-2xl font-semibold text-gray-900">Marcas</h1><p className="text-gray-500 mt-2">Funcionalidade a ser implementada.</p></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activePage={currentPage} onNavigate={handleNavigate}>
      {renderContent()}
    </Layout>
  );
};

export default App;
