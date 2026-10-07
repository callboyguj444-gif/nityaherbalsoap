// Client-safe WhatsApp config types, defaults & helpers.
// No server-only imports here — safe to bundle into 'use client' components.
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

export function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '');
}

export function waLink(number: string, message: string): string {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
