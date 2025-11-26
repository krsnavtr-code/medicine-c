import { notFound } from 'next/navigation';
import { productAPI } from '@/services/api';
import ProductDetailClient from './ProductDetailClient';

// This function runs on the server side to fetch product data
export async function generateStaticParams() {
  // Pre-render the most popular products at build time
  try {
    const { data: products } = await productAPI.getProducts({
      limit: 20,
      page: 1,
      sort: '-popularity',
      status: 'active'
    });
    
    return products.map((product) => ({
      id: product._id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getProduct(id) {
  try {
    const { data } = await productAPI.getProduct(id);
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="">
      <ProductDetailClient product={product} />
    </div>
  );
}

// This ensures the page is statically generated at build time with revalidation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate at most every hour
