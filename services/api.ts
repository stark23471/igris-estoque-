// Fix: Import React to use React.createElement.
import React from 'react';
import { Product, StockMovement, Kpi, MovementType, Category, Brand, Warehouse } from '../types';
import { formatCurrency } from '../utils/formatters';

// --- MOCK DATABASE ---
const warehouses: Warehouse[] = [
    { id: 'wh1', code: 'SP-01', name: 'Depósito Principal (SP)', address: 'Rua Principal, 123, São Paulo, SP'},
    { id: 'wh2', code: 'RJ-01', name: 'Depósito Secundário (RJ)', address: 'Av. Atlântica, 456, Rio de Janeiro, RJ'},
];
const categories: Category[] = [
    { id: 'cat1', name: 'Eletrônicos', productCount: 3, isActive: true },
    { id: 'cat2', name: 'Roupas', productCount: 2, isActive: true },
];
const brands: Brand[] = [
    { id: 'brand1', name: 'GenBrand', productCount: 2, isActive: true },
    { id: 'brand2', name: 'TechCorp', productCount: 2, isActive: true },
    { id: 'brand3', name: 'FashionIO', productCount: 1, isActive: true },
];

const mockProducts: Product[] = Array.from({ length: 53 }, (_, i) => ({
    id: `prod${i + 1}`,
    thumbnailUrl: `https://picsum.photos/id/${i + 10}/100/100`,
    name: `Produto Exemplo ${i + 1}`,
    sku: `SKU-00${i + 1}`,
    barcode: `7890000000${i.toString().padStart(2, '0')}`,
    category: i % 2 === 0 ? categories[0] : categories[1],
    brand: brands[i % brands.length],
    unit: 'UN',
    cost: (i + 1) * 10 + 5,
    price: (i + 1) * 10 + 20,
    stock: Math.floor(Math.random() * 100),
    minStock: 10,
    maxStock: 150,
    warehouse: i % 2 === 0 ? warehouses[0] : warehouses[1],
    updatedAt: new Date(Date.now() - Math.random() * 1000 * 3600 * 24 * 10).toISOString(),
}));

const mockMovements: StockMovement[] = Array.from({ length: 20 }, (_, i) => ({
    id: `mov${i + 1}`,
    timestamp: new Date(Date.now() - Math.random() * 1000 * 3600 * 24 * 5).toISOString(),
    type: Object.values(MovementType)[i % Object.values(MovementType).length],
    product: mockProducts[i % mockProducts.length],
    quantity: Math.floor(Math.random() * 20) + 1,
    unitCost: mockProducts[i % mockProducts.length].cost,
    user: 'Admin',
}));


// --- API FUNCTIONS ---

const simulateDelay = <T,>(data: T): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), 500));
}

export const getDashboardKpis = async (): Promise<Kpi[]> => {
    const totalStockValue = mockProducts.reduce((acc, p) => acc + (p.stock * p.cost), 0);
    const criticalItems = mockProducts.filter(p => p.stock > 0 && p.stock <= p.minStock).length;
    const zeroStockItems = mockProducts.filter(p => p.stock === 0).length;

    const kpis: Kpi[] = [
        {
            title: 'Valor do Estoque',
            value: formatCurrency(totalStockValue),
            change: 2.1,
            description: 'vs. último mês',
            icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width:"24", height:"24", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round"}, [React.createElement('line', {x1:"12", y1:"1", x2:"12", y2:"23"}), React.createElement('path', {d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"})]),
        },
        {
            title: 'Itens Críticos',
            value: criticalItems.toString(),
            change: -5,
            description: 'precisam de reposição',
            icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width:"24", height:"24", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round"}, [React.createElement('path', {d:"m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"}), React.createElement('line', {x1:"12", y1:"9", x2:"12", y2:"13"}), React.createElement('line', {x1:"12", y1:"17", x2:"12.01", y2:"17"})]),
        },
        {
            title: 'Itens Zerados',
            value: zeroStockItems.toString(),
            description: 'fora de estoque',
            icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width:"24", height:"24", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round"}, [React.createElement('circle', {cx:"12", cy:"12", r:"10"}), React.createElement('line', {x1:"4.93", y1:"4.93", x2:"19.07", y2:"19.07"})]),
        },
         {
            title: 'SKUs Ativos',
            value: mockProducts.length.toString(),
            description: 'total de produtos',
            icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width:"24", height:"24", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round"}, [React.createElement('path', {d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}), React.createElement('polyline', {points:"3.27 6.96 12 12.01 20.73 6.96"}), React.createElement('line', {x1:"12", y1:"22.08", x2:"12", y2:"12"})]),
        },
    ];
    return simulateDelay(kpis);
};

export const getRecentMovements = async (limit: number): Promise<StockMovement[]> => {
    const sorted = [...mockMovements].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return simulateDelay(sorted.slice(0, limit));
}

export const getProducts = async (params: { page: number, pageSize: number }): Promise<{ data: Product[], total: number }> => {
    const { page, pageSize } = params;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = mockProducts.slice(start, end);
    return simulateDelay({ data: paginatedData, total: mockProducts.length });
}
