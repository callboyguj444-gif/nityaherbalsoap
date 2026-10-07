import { NextResponse } from 'next/server';
import { getOrders, createOrder, updateOrderStatus, deleteOrder } from '@/lib/firebase';

// GET /api/orders
export async function GET() {
  try {
    const data = await getOrders();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Orders GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

// POST /api/orders — create an order, or update status when {id, status} is sent.
// (Status update uses POST instead of PUT because Netlify Edge rejects PUT with 405)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, status, productName, customerName, customerPhone, quantity, price, source } = body;

    // Status-update path
    if (id && status) {
      await updateOrderStatus(id, status);
      return NextResponse.json({ success: true });
    }

    // Create path
    if (!productName) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
    }

    const order = await createOrder({
      productName,
      customerName: customerName || '',
      customerPhone: customerPhone || '',
      quantity: quantity || 1,
      price: price || 0,
      source: source || 'whatsapp',
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Orders POST error:', error);
    return NextResponse.json({ error: 'Failed to process order request' }, { status: 500 });
  }
}

// DELETE /api/orders
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
    }

    await deleteOrder(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Orders DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
