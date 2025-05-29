
'use client'; 

import React, { useState } from 'react';
import { useCartStore } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderMessage, setOrderMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setOrderMessage('Your cart is empty. Please add items before placing an order.');
      setIsError(true);
      return;
    }

    setIsPlacingOrder(true);
    setOrderMessage(null);
    setIsError(false);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          total: getTotalPrice(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderMessage(data.message || 'Order placed successfully!');
        setIsError(false);
        clearCart(); // Clear cart after successful order
      } else {
        setOrderMessage(data.message || 'Failed to place order. Please try again.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderMessage('An unexpected error occurred. Please try again later.');
      setIsError(true);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">Checkout</h1>

      {cartItems.length === 0 && !orderMessage ? (
        <div className="text-center text-gray-600 text-xl py-10">
          Your cart is empty. <Link href="/" className="text-blue-600 hover:underline">Start shopping!</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Review Your Items</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 py-4 border-b last:border-b-0">
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity for {item.name}</label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-20 p-2 border border-gray-300 rounded-md text-center focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-red-600 hover:text-red-800 transition duration-200 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 h-fit sticky top-28">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Order Summary</h2>
            <div className="flex justify-between items-center text-xl font-semibold mb-4">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>

            {orderMessage && (
              <div className={`p-4 rounded-md mb-4 ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {orderMessage}
              </div>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder || cartItems.length === 0}
              className={`w-full py-3 rounded-lg font-semibold text-white text-xl transition duration-300 ${
                isPlacingOrder || cartItems.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 shadow-md'
              }`}
            >
              {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
            </button>

            {orderMessage && !isError && (
              <button
                onClick={() => router.push('/')}
                className="w-full mt-4 py-3 rounded-lg font-semibold text-blue-600 border border-blue-600 hover:bg-blue-50 transition duration-300"
              >
                Continue Shopping
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
