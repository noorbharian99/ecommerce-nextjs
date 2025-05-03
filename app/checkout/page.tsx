'use client';

import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order placement
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-green-600">🎉 Order Placed!</h1>
        <p className="mt-4 text-gray-700">Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Address"
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="City"
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Postal Code"
            required
            className="w-full mb-4 p-2 border rounded"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.title} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="mt-4 border-t pt-4 flex justify-between font-semibold">
            <span>Total:</span>
            <span>${total}</span>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
