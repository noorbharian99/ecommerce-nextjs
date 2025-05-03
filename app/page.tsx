// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='max-w-7xl mx-auto'>
      <h1 className="text-3xl font-bold my-6">Product List</h1>

      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-3 border rounded mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="p-4 rounded shadow hover:shadow-md transition">
              <img src={product.image} alt={product.title} className="h-40 object-contain mx-auto mb-4" />
              <h2 className="text-sm font-semibold">{product.title}</h2>
              <p className="text-lg font-bold mt-2">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
