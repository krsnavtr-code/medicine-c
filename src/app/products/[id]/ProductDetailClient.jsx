'use client';

import dynamic from 'next/dynamic';

// Import the client component with no SSR
const ProductDetail = dynamic(
  () => import('@/components/products/ProductDetail'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
);

export default function ProductDetailClient({ product }) {
  return <ProductDetail product={product} />;
}
