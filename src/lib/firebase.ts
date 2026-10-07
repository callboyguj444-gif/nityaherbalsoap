// Data store for settings + orders.
// Backed by Postgres (Netlify Database) via ./db, with an in-memory fallback
// for local dev when DATABASE_URL is not set.

import { kvGet, kvSet, ordersList, ordersInsert, ordersUpdateStatus, ordersDelete } from './db';

/* ─── Settings ─── */

export interface Settings {
  instagram: string;
  facebook: string;
  address: string;
  phone: string;
  email: string;
}

const defaultSettings: Settings = {
  instagram: 'https://www.instagram.com/nityaharbalsoapgmail.com3?igsh=MWE1YXozZjd2b2oyOA==',
  facebook: 'https://facebook.com/your_profile',
  address: 'Liliya Mota, Dist. Amreli.',
  phone: '+91 6355789050',
  email: 'nityaherbalsoap@gmail.com',
};

export async function getSettings(): Promise<Settings> {
  const data = await kvGet<Partial<Settings>>('settings');
  if (!data) return defaultSettings;
  return { ...defaultSettings, ...data };
}

export async function updateSettings(settings: Settings): Promise<Settings> {
  await kvSet('settings', settings);
  return settings;
}

/* ─── Orders ─── */

export interface Order {
  id: string;
  productName: string;
  customerName: string;
  customerPhone: string;
  quantity: number;
  price: number;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

// In-memory fallback for orders when the database is unavailable
let memoryOrders: Order[] = [];

function toOrder(id: string, val: any, createdAt?: string): Order {
  return {
    id,
    productName: val?.productName || '',
    customerName: val?.customerName || '',
    customerPhone: val?.customerPhone || '',
    quantity: val?.quantity || 1,
    price: val?.price || 0,
    status: val?.status || 'pending',
    source: val?.source || 'whatsapp',
    createdAt: val?.createdAt || createdAt || new Date().toISOString(),
    updatedAt: val?.updatedAt || val?.createdAt || createdAt || new Date().toISOString(),
  };
}

export async function getOrders(): Promise<{ orders: Order[]; stats: { total: number; pending: number; completed: number } }> {
  const rows = await ordersList();

  let orders: Order[];
  if (rows) {
    orders = rows.map((r) => toOrder(r.id, r.data, r.createdAt));
  } else {
    orders = memoryOrders;
  }

  const total = orders.length;
  const pending = orders.filter((o) => o.status === 'pending').length;
  const completed = orders.filter((o) => o.status === 'completed').length;

  return { orders, stats: { total, pending, completed } };
}

export async function createOrder(order: {
  productName: string;
  customerName?: string;
  customerPhone?: string;
  quantity?: number;
  price?: number;
  source?: string;
}): Promise<Order> {
  const now = new Date().toISOString();
  const id = 'o_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
  const data = {
    productName: order.productName,
    customerName: order.customerName || '',
    customerPhone: order.customerPhone || '',
    quantity: order.quantity || 1,
    price: order.price || 0,
    status: 'pending',
    source: order.source || 'whatsapp',
    createdAt: now,
    updatedAt: now,
  };

  await ordersInsert(id, data);

  const newOrder: Order = { id, ...data };
  // Also keep in memory as fallback
  memoryOrders.unshift(newOrder);

  return newOrder;
}

export async function updateOrderStatus(id: string, status: string): Promise<void> {
  await ordersUpdateStatus(id, { status, updatedAt: new Date().toISOString() });

  const idx = memoryOrders.findIndex((o) => o.id === id);
  if (idx >= 0) {
    memoryOrders[idx].status = status;
    memoryOrders[idx].updatedAt = new Date().toISOString();
  }
}

export async function deleteOrder(id: string): Promise<void> {
  await ordersDelete(id);
  memoryOrders = memoryOrders.filter((o) => o.id !== id);
}
