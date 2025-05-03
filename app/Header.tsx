'use client';

import Link from 'next/link';
import { useCart } from './context/CartContext';

export default function Header() {
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800">
            Noor Store
            </Link>
            <nav className="flex space-x-4">
                <Link href="/" className="text-gray-700 hover:text-blue-500">
                    Home
                </Link>
                <Link href="/cart" className="flex text-gray-700 hover:text-blue-500">
                    <span>🛒</span>
                    {totalItems > 0 && (
                        <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {totalItems}
                        </span>
                    )}
                </Link>
                {/* <Link href="/checkout" className="text-gray-700 hover:text-blue-500">
                    Checkout
                </Link> */}
            </nav>
        </div>
        </header>
    );
}
