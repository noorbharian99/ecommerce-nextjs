"use client";

import { useCart } from "@/app/context/CartContext";
import { CartItem } from "@/app/context/CartContext";

export default function AddToCartButton({ product }: { product: CartItem }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Add to Cart
    </button>
  );
}
