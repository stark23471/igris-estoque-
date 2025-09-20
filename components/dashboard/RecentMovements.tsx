
import React from 'react';
import { StockMovement, MovementType } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import Badge from '../shared/Badge';

interface RecentMovementsProps {
  movements: StockMovement[];
}

const getMovementTypeClass = (type: MovementType) => {
  switch (type) {
    case MovementType.IN:
      return 'green';
    case MovementType.OUT:
      return 'red';
    case MovementType.BREAK:
      return 'red';
    case MovementType.TRANSFER:
      return 'blue';
    case MovementType.ADJUST:
      return 'yellow';
    default:
      return 'gray';
  }
};


const RecentMovements: React.FC<RecentMovementsProps> = ({ movements }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white px-2">Últimas 10 Movimentações</h3>
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-0">Produto</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Tipo</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Quantidade</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Data</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Responsável</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {movements.map((movement) => (
                  <tr key={movement.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="font-medium text-gray-900 dark:text-white">{movement.product.name}</div>
                        <div className="text-gray-500">{movement.product.sku}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Badge color={getMovementTypeClass(movement.type)}>{movement.type}</Badge>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{movement.quantity}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{formatDate(movement.timestamp)}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{movement.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentMovements;
