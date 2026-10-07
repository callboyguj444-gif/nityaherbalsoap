// Postgres (Netlify Database) persistence layer.
// When DATABASE_URL is present, data is stored durably in Postgres.
// When it is absent (e.g. local `next dev`), callers fall back to in-memory.

import { Pool } from 'pg';

const CONNECTION_STRING =
  process.env.DATABASE_URL ||
  process.env.PGURL ||
  process.env.NETLIFY_DATABASE_URL ||
  '';

export function dbEnabled(): boolean {
  return Boolean(CONNECTION_STRING);
}

let pool: Pool | null = null;
function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: CONNECTION_STRING,
      ssl: { rejectUnauthorized: false },
      max: 3,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 8000,
    });
  }
  return pool;
}

let schemaReady: Promise<void> | null = null;
function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const p = getPool();
      await p.query(`CREATE TABLE IF NOT EXISTS kv (
        key TEXT PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT now()
      )`);
      await p.query(`CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
      )`);
    })().catch((err) => {
      // Reset so a later call can retry
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

/* ─── Key/value document store (settings, products, whatsapp) ─── */

export async function kvGet<T>(key: string): Promise<T | null> {
  if (!dbEnabled()) return null;
  try {
    await ensureSchema();
    const res = await getPool().query('SELECT value FROM kv WHERE key = $1', [key]);
    if (res.rows.length === 0) return null;
    return res.rows[0].value as T;
  } catch (err) {
    console.error(`db.kvGet(${key}) failed:`, err);
    return null;
  }
}

export async function kvSet(key: string, value: unknown): Promise<void> {
  if (!dbEnabled()) return;
  try {
    await ensureSchema();
    await getPool().query(
      `INSERT INTO kv (key, value, updated_at)
       VALUES ($1, $2::jsonb, now())
       ON CONFLICT (key) DO UPDATE SET value = $2::jsonb, updated_at = now()`,
      [key, JSON.stringify(value)],
    );
  } catch (err) {
    console.error(`db.kvSet(${key}) failed:`, err);
  }
}

/* ─── Orders (own table for atomic concurrent inserts) ─── */

export interface OrderRow {
  id: string;
  data: Record<string, any>;
  createdAt: string;
}

export async function ordersList(): Promise<OrderRow[] | null> {
  if (!dbEnabled()) return null;
  try {
    await ensureSchema();
    const res = await getPool().query(
      'SELECT id, data, created_at FROM orders ORDER BY created_at DESC',
    );
    return res.rows.map((r) => ({
      id: r.id,
      data: r.data,
      createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at),
    }));
  } catch (err) {
    console.error('db.ordersList failed:', err);
    return null;
  }
}

export async function ordersInsert(id: string, data: Record<string, any>): Promise<boolean> {
  if (!dbEnabled()) return false;
  try {
    await ensureSchema();
    await getPool().query(
      `INSERT INTO orders (id, data, created_at)
       VALUES ($1, $2::jsonb, COALESCE($3::timestamptz, now()))
       ON CONFLICT (id) DO UPDATE SET data = $2::jsonb`,
      [id, JSON.stringify(data), data.createdAt || null],
    );
    return true;
  } catch (err) {
    console.error('db.ordersInsert failed:', err);
    return false;
  }
}

export async function ordersUpdateStatus(id: string, patch: Record<string, any>): Promise<boolean> {
  if (!dbEnabled()) return false;
  try {
    await ensureSchema();
    await getPool().query(`UPDATE orders SET data = data || $2::jsonb WHERE id = $1`, [
      id,
      JSON.stringify(patch),
    ]);
    return true;
  } catch (err) {
    console.error('db.ordersUpdateStatus failed:', err);
    return false;
  }
}

export async function ordersDelete(id: string): Promise<boolean> {
  if (!dbEnabled()) return false;
  try {
    await ensureSchema();
    await getPool().query('DELETE FROM orders WHERE id = $1', [id]);
    return true;
  } catch (err) {
    console.error('db.ordersDelete failed:', err);
    return false;
  }
}
