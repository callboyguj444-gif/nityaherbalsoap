// WhatsApp automation config store — Postgres (Netlify Database) with in-memory fallback.
// Server-only: client components must import types/helpers from './whatsappShared'.

import { kvGet, kvSet } from './db';
import { WhatsAppConfig, defaultWhatsApp } from './whatsappShared';

export { WhatsAppConfig, defaultWhatsApp, fillTemplate, waLink } from './whatsappShared';

let memoryConfig: WhatsAppConfig | null = null;

export async function getWhatsAppConfig(): Promise<WhatsAppConfig> {
  const stored = await kvGet<Partial<WhatsAppConfig>>('whatsapp');
  if (stored && typeof stored === 'object') {
    memoryConfig = { ...defaultWhatsApp, ...stored };
    return memoryConfig;
  }
  if (memoryConfig) return memoryConfig;
  return defaultWhatsApp;
}

export async function saveWhatsAppConfig(config: WhatsAppConfig): Promise<WhatsAppConfig> {
  memoryConfig = config;
  await kvSet('whatsapp', config);
  return config;
}
