// Firebase Realtime Database REST API Helper
// No SDK needed — just simple fetch calls!

const FIREBASE_URL = process.env.NEXT_PUBLIC_FIREBASE_URL || '';

async function firebaseGet(path: string): Promise<any> {
  if (!FIREBASE_URL) return null;
  try {
    const res = await fetch(`${FIREBASE_URL}/${path}.json`, {
      next: { revalidate: 0 },
    });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

async function firebasePut(path: string, data: unknown): Promise<any> {
  if (!FIREBASE_URL) return null;
  try {
    const res = await fetch(`${FIREBASE_URL}/${path}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Firebase PUT error: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('Firebase PUT failed:', error);
    return null;
  }
}

async function firebasePost(path: string, data: unknown): Promise<any> {
  if (!FIREBASE_URL) return null;
  try {
    const res = await fetch(`${FIREBASE_URL}/${path}.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Firebase POST error: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('Firebase POST failed:', error);
    return null;
  }
}

async function firebasePatch(path: string, data: unknown): Promise<any> {
  if (!FIREBASE_URL) return null;
  try {
    const res = await fetch(`${FIREBASE_URL}/${path}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Firebase PATCH error: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('Firebase PATCH failed:', error);
    return null;
  }
}

async function firebaseDelete(path: string): Promise<boolean> {
  if (!FIREBASE_URL) return false;
  try {
    const res = await fetch(`${FIREBASE_URL}/${path}.json`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch {
    return false;
  }
}

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
  const data = await firebaseGet('settings');
  if (!data) return defaultSettings;
  return { ...defaultSettings, ...data };
}

export async function updateSettings(settings: Settings): Promise<Settings> {
  const result = await firebasePut('settings', settings);
  if (!result) {
    console.warn('Firebase not available - settings not saved to cloud');
  }
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

// In-memory fallback for orders when Firebase is unavailable
let memoryOrders: Order[] = [];

export async function getOrders(): Promise<{ orders: Order[]; stats: { total: number; pending: number; completed: number } }> {
  const data = await firebaseGet('orders');

  let orders: Order[];

  if (data && typeof data === 'object') {
    // Firebase returns { key1: {...}, key2: {...} } format
    orders = Object.entries(data)
      .filter(([, val]) => val !== null && typeof val === 'object')
      .map(([key, val]: [string, any]) => ({
        id: key,
        productName: val.productName || '',
        customerName: val.customerName || '',
        customerPhone: val.customerPhone || '',
        quantity: val.quantity || 1,
        price: val.price || 0,
        status: val.status || 'pending',
        source: val.source || 'whatsapp',
        createdAt: val.createdAt || new Date().toISOString(),
        updatedAt: val.updatedAt || new Date().toISOString(),
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else {
    // Fallback to in-memory orders
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
  const newOrderData = {
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

  const result = await firebasePost('orders', newOrderData);

  let id: string;
  if (result && result.name) {
    id = result.name;
  } else {
    // Fallback: generate a local ID
    id = 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  const newOrder: Order = { id, ...newOrderData };

  // Also store in memory as fallback
  memoryOrders.unshift(newOrder);

  return newOrder;
}

export async function updateOrderStatus(id: string, status: string): Promise<void> {
  await firebasePatch(`orders/${id}`, { status, updatedAt: new Date().toISOString() });

  // Update in memory fallback too
  const idx = memoryOrders.findIndex((o) => o.id === id);
  if (idx >= 0) {
    memoryOrders[idx].status = status;
    memoryOrders[idx].updatedAt = new Date().toISOString();
  }
}

export async function deleteOrder(id: string): Promise<void> {
  await firebaseDelete(`orders/${id}`);

  // Remove from memory fallback too
  memoryOrders = memoryOrders.filter((o) => o.id !== id);
}
