// WhatsApp automation config — Firebase Realtime DB (REST) with in-memory fallback
// Placeholders supported in templates: {product} {price} {name}

export interface WhatsAppConfig {
  number: string; // digits only, country code included, e.g. 916355789050
  greeting: string; // floating button / general chat auto-message
  orderTemplate: string; // message auto-filled when a product order button is clicked
  autoReply: string; // canned first-reply the business can send back quickly
}

export const defaultWhatsApp: WhatsAppConfig = {
  number: '916355789050',
  greeting: 'Hi Nitya Herbal! 👋 I want to know about your products.',
  orderTemplate: 'Hi, I want to order {product}',
  autoReply: 'Namaste! 🙏 Thank you for contacting Nitya Herbal. Your order for {product} is received. We will confirm delivery shortly. — Nitya Herbal',
};

let memoryConfig: WhatsAppConfig | null = null;

const FIREBASE_URL = process.env.NEXT_PUBLIC_FIREBASE_URL || '';

export async function getWhatsAppConfig(): Promise<WhatsAppConfig> {
  if (memoryConfig) return memoryConfig;
  if (FIREBASE_URL) {
    try {
      const res = await fetch(`${FIREBASE_URL}/whatsapp.json`, { next: { revalidate: 0 } });
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object') {
          memoryConfig = { ...defaultWhatsApp, ...data };
          return memoryConfig;
        }
      }
    } catch {
      // fall through to defaults
    }
  }
  return defaultWhatsApp;
}

export async function saveWhatsAppConfig(config: WhatsAppConfig): Promise<WhatsAppConfig> {
  memoryConfig = config;
  if (FIREBASE_URL) {
    try {
      await fetch(`${FIREBASE_URL}/whatsapp.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
    } catch (error) {
      console.error('Firebase PUT whatsapp failed:', error);
    }
  }
  return config;
}

export function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '');
}

export function waLink(number: string, message: string): string {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
