// Fix: Import React to use React.ReactNode type.
import React from 'react';

export type Page = 'dashboard' | 'products' | 'movements' | 'categories' | 'brands' | 'suppliers' | 'customers' | 'warehouses';

export enum StockStatus {
  OK = 'OK',
  Critical = 'Crítico',
  Zero = 'Zerado'
}

export enum MovementType {
  IN = 'ENTRADA',
  OUT = 'SAÍDA',
  TRANSFER = 'TRANSFERÊNCIA',
  ADJUST = 'AJUSTE',
  BREAK = 'QUEBRA'
}

export interface Category {
  id: string;
  name: string;
  parentCategory?: string;
  productCount: number;
  isActive: boolean;
}

export interface Brand {
  id: string;
  name: string;
  productCount: number;
  isActive: boolean;
}

export interface Warehouse {
    id: string;
    code: string;
    name: string;
    address: string;
}

export interface Product {
  id: string;
  thumbnailUrl: string;
  name: string;
  sku: string;
  barcode?: string;
  category: Category;
  brand: Brand;
  unit: string; // e.g., 'UN', 'KG', 'L'
  cost: number;
  price: number;
  stock: number;
  minStock: number;
  maxStock: number;
  warehouse: Warehouse;
  updatedAt: string;
  lot?: string;
  expiresAt?: string;
}

export interface StockMovement {
  id: string;
  timestamp: string;
  type: MovementType;
  product: Product;
  quantity: number;
  unitCost: number;
  fromWarehouse?: Warehouse;
  toWarehouse?: Warehouse;
  lot?: string;
  user: string;
  documentRef?: string;
  reason?: string;
}

export interface Kpi {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  description: string;
}
