import { NextResponse } from 'next/server';
import { getProducts, saveProducts, Product } from '@/lib/products';

// GET /api/products
export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/products — save the full product list (admin edits)
// (POST is used instead of PUT because Netlify Edge rejects PUT with 405)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const products = body.products as Product[];

    if (!Array.isArray(products)) {
      return NextResponse.json({ error: 'products array is required' }, { status: 400 });
    }

    const saved = await saveProducts(products);
    return NextResponse.json({ success: true, products: saved });
  } catch (error) {
    console.error('Products POST error:', error);
    return NextResponse.json({ error: 'Failed to save products' }, { status: 500 });
  }
}
