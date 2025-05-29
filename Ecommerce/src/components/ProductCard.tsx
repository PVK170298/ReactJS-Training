
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useCartStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-200">
      <Link href={`/products/${product.id}`} className="block">
        {/* MODIFIED IMAGE CONTAINER AND IMAGE COMPONENT */}
        <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={200} // Set a fixed width
            height={20} // Set a fixed height
            className="object-contain" // Use object-contain to fit the image without cropping
            priority // Consider removing priority if you have many products, for performance
          />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
          <Link href={`/products/${product.id}`} className="hover:text-blue-600">
            {product.name}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-blue-700">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addItem(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;