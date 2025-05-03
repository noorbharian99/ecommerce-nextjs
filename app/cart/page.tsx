'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/" className="text-blue-600 underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border-b pb-4">
            <Image src={item.image} alt={item.title} width={80} height={80} className="object-contain" />
            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-2 py-1 border rounded-l"
                >
                  -
                </button>
                <span className="px-3 py-1 border-t border-b">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-2 py-1 border rounded-r"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
        <Link
          href="/checkout"
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
