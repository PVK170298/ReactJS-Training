
import { NextResponse } from 'next/server';
import { CartItem, Order } from '@/lib/types';

export async function POST(request: Request) {
  const { items, total } = await request.json();

  if (!items || !Array.isArray(items) || items.length === 0 || typeof total !== 'number') {
    return new NextResponse('Invalid order data', { status: 400 });
  }

  // Simulate saving the order to a database
  const newOrder: Order = {
    id: `ORD-<span class="math-inline">\{Date\.now\(\)\}\-</span>{Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    items: items as CartItem[],
    total: total,
    orderDate: new Date().toISOString(),
  };

  console.log('Order received:', newOrder); // Log the order for demonstration

  return NextResponse.json({ message: 'Order placed successfully!', order: newOrder }, { status: 200 });
}
