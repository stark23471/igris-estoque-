
import React, { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../../services/api';
import { Product, StockStatus } from '../../types';
import DataTable from '../shared/DataTable';
import { formatCurrency, formatDate } from '../../utils/formatters';
import Badge from '../shared/Badge';
import Button from '../shared/Button';

const getStockStatus = (product: Product): StockStatus => {
  if (product.stock <= 0) return StockStatus.Zero;
  if (product.stock <= product.minStock) return StockStatus.Critical;
  return StockStatus.OK;
};

const getStatusColor = (status: StockStatus) => {
    switch (status) {
        case StockStatus.OK: return 'green';
        case StockStatus.Critical: return 'yellow';
        case StockStatus.Zero: return 'red';
        default: return 'gray';
    }
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await getProducts({ page, pageSize });
        setProducts(result.data);
        setTotal(result.total);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, pageSize]);

  const columns = useMemo(() => [
    {
      Header: 'Produto',
      accessor: (row: Product) => (
        <div className="flex items-center">
          <img src={row.thumbnailUrl} alt={row.name} className="w-10 h-10 rounded object-cover" />
          <div className="ml-3">
            <div className="font-medium text-gray-900 dark:text-white">{row.name}</div>
            <div className="text-sm text-gray-500">{row.sku}</div>
          </div>
        </div>
      ),
    },
    {
      Header: 'Estoque',
      accessor: 'stock',
    },
    {
      Header: 'Preço',
      accessor: (row: Product) => formatCurrency(row.price),
    },
     {
      Header: 'Status',
      accessor: (row: Product) => {
        const status = getStockStatus(row);
        return <Badge color={getStatusColor(status)}>{status}</Badge>;
      }
    },
    {
      Header: 'Atualizado em',
      accessor: (row: Product) => formatDate(row.updatedAt),
    },
    {
      Header: 'Ações',
      accessor: () => (
        <div className="flex space-x-2">
            <Button size="sm" variant="outline">Editar</Button>
            <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50">Excluir</Button>
        </div>
      ),
    }
  ], []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Produtos</h1>
        <Button>Adicionar Produto</Button>
      </div>
      <DataTable
        columns={columns}
        data={products}
        loading={loading}
        pagination={{
          currentPage: page,
          pageSize,
          totalItems: total,
          onPageChange: setPage,
        }}
      />
    </div>
  );
};

export default ProductList;
