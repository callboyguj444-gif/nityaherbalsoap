import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/firebase';

// GET /api/settings
export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// POST /api/settings — (POST used instead of PUT: Netlify Edge rejects PUT with 405)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { instagram, facebook, address, phone, email } = body;

    const settings = await updateSettings({
      instagram: instagram || '',
      facebook: facebook || '',
      address: address || '',
      phone: phone || '',
      email: email || '',
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Settings POST error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
