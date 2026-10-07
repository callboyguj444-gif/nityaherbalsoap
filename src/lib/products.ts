// Products store — Postgres (Netlify Database) with in-memory fallback.
// Server-only: client components must import types/defaults from './productShared'.

import { kvGet, kvSet } from './db';
import { Product, defaultProducts } from './productShared';

export { Product, defaultProducts, marketplaceLinks } from './productShared';

// In-memory fallback when the database is not configured (e.g. local dev)
let memoryProducts: Product[] | null = null;

export async function getProducts(): Promise<Product[]> {
  const stored = await kvGet<Product[]>('products');
  if (Array.isArray(stored) && stored.length > 0) {
    memoryProducts = stored;
    return stored;
  }
  if (memoryProducts) return memoryProducts;
  return defaultProducts;
}

export async function saveProducts(products: Product[]): Promise<Product[]> {
  memoryProducts = products;
  await kvSet('products', products);
  return products;
}
