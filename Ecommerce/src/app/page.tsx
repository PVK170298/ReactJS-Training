
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`, {
    cache: 'no-store', // Ensure data is always fresh on build/request
  });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
