
import React from 'react';
import Pagination from './Pagination';

interface Column {
  Header: string;
  accessor: string | ((row: any) => React.ReactNode);
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  loading: boolean;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  };
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, loading, pagination }) => {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {columns.map((col, index) => (
                    <th key={index} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      {col.Header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                {loading ? (
                  <tr>
                    <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                      Carregando...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                      Nenhum dado encontrado.
                    </td>
                  </tr>
                ) : (
                  data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((col, colIndex) => (
                        <td key={colIndex} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                          {typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor]}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {pagination.totalItems > 0 && <Pagination {...pagination} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
