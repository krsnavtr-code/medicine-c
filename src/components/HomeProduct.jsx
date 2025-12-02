'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productAPI } from '@/services/api';

const HomeProduct = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getProducts({
          limit: 8, // Show up to 8 featured products
          isFeatured: true,
          isActive: true,
          isDeleted: false,
        });
        
        const products = response.data.products || response.data;
        setFeaturedProducts(Array.isArray(products) ? products : []);
      } catch (err) {
        setError(err.message || 'Failed to fetch featured products');
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2">Loading featured products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-4xl mx-auto my-8">
        {error}
      </div>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="">No featured products available at the moment.</p>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold  sm:text-4xl">
            Our Best Featured Products
          </h2>
          <p className="mt-4 text-xl">
            Discover our handpicked selection of premium products
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product.slug || product._id}`}
              className="group bg-[var(--container-color-in)] p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                <Image
                  src={product.thumbnail || product.images?.[0]?.url || '/assets/Ayush-Aushadhi-Logo.jpeg'}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="h-64 w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="mt-4 flex-1 flex flex-col">
                <h3 className="text-lg font-medium ">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="mt-1 text-sm line-clamp-2">
                    {product.description}
                  </p>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-lg font-semibold text-indigo-600">
                    ₹{product.salePrice || product.price}
                    {product.salePrice && product.price > product.salePrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ₹{product.price}
                      </span>
                    )}
                  </p>
                  {product.stock <= 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProduct;