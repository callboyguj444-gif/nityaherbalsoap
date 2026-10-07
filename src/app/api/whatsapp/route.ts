import { NextResponse } from 'next/server';
import { getWhatsAppConfig, saveWhatsAppConfig, WhatsAppConfig } from '@/lib/whatsapp';

// GET /api/whatsapp
export async function GET() {
  try {
    const config = await getWhatsAppConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('WhatsApp GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch whatsapp config' }, { status: 500 });
  }
}

// POST /api/whatsapp — save automation config
// (POST used instead of PUT: Netlify Edge rejects PUT with 405)
export async function POST(request: Request) {
  try {
    const body = await request.json() as Partial<WhatsAppConfig>;
    const current = await getWhatsAppConfig();
    const config: WhatsAppConfig = { ...current, ...body };

    if (!config.number || !config.number.replace(/\D/g, '')) {
      return NextResponse.json({ error: 'WhatsApp number is required' }, { status: 400 });
    }

    const saved = await saveWhatsAppConfig(config);
    return NextResponse.json(saved);
  } catch (error) {
    console.error('WhatsApp POST error:', error);
    return NextResponse.json({ error: 'Failed to save whatsapp config' }, { status: 500 });
  }
}
