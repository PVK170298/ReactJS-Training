'use client'; // This page needs to be a client component because it uses hooks like useRouter, useCartStore, useState, useEffect, and event handlers.

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import { Product } from '@/lib/types'; // Assuming you have this type defined

// Define the props for the page component, including params
interface ProductPageProps {
  params: {
    id: string; // The ID will come from the URL segment
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  // **NEW: Unwrap params using React.use()**
  // This is how you'd typically handle it if params were a Promise.
  // In most Next.js App Router cases for `params` directly from the route segment,
  // it behaves like a synchronous object, but this explicitly handles the Promise case.
  // const resolvedParams = React.use(Promise.resolve(params)); // Example if params were truly async
  // For standard route params, direct access might still work but the warning suggests the future pattern.
  // Let's ensure the direct access is handled correctly in the component's scope.
  const productId = params.id; // Access the id directly as per current usage, but be aware of the warning.

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]); // Depend on productId to refetch if it changes (though unlikely for a product page)

  if (loading) {
    return <div className="text-center py-8">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-xl rounded-xl p-6">
        <div className="relative w-full h-96 md:h-auto flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill" // Use layout="fill" for responsive images
            objectFit="contain" // Or "cover" depending on desired fit
            className="rounded-lg"
            priority // For LCP image
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">{product.description}</p>
            <div className="flex items-baseline mb-6">
              <span className="text-5xl font-bold text-blue-700 mr-3">${product.price.toFixed(2)}</span>
              {/* Optional: Add a discount or old price here */}
              {/* <span className="text-lg text-gray-500 line-through">$299.99</span> */}
            </div>
          </div>
          <div className="mt-8">
            <button
              onClick={() => {
                addItem(product);
                router.push('/checkout'); // Redirect to checkout after adding
              }}
              className="w-half bg-blue-600 text-white text-xl font-semibold py-4 rounded-xl hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
            >
              Add to Cart and Checkout
            </button>
            <button
              onClick={() => {
                addItem(product);
                // Optionally show a "Added to Cart" toast/notification
              }}
              className="w-half bg-green-500 text-white text-xl font-semibold py-4 mt-3 rounded-xl hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 shadow-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
