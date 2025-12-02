'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productAPI } from '@/services/api';

const ProductList = ({ initialProducts = [] }) => {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(!initialProducts.length);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({
    limit: 12,
    page: 1,
    sort: "-createdAt",
    isActive: true,
    isDeleted: false,
  });

  const loaderRef = useRef(null);

  // Fetch Products
  const fetchProducts = async () => {
    if (!hasMore) return;

    try {
      setLoading(true);
      const response = await productAPI.getProducts(filters);
      const newProducts = response.data.products || response.data;

      // Use a Set to track existing product IDs
      setProducts(prev => {
        const existingIds = new Set(prev.map(p => p._id));
        const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p._id));
        return [...prev, ...uniqueNewProducts];
      });

      // Check further products
      if (newProducts.length < filters.limit) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Run whenever page changes
  useEffect(() => {
    fetchProducts();
  }, [filters.page]);

  // Intersection Observer → auto load
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setFilters((prev) => ({
            ...prev,
            page: prev.page + 1,
          }));
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loaderRef, hasMore, loading]);

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product.slug || product._id}`}
              className="group bg-[var(--container-color-in)] p-3 rounded-xl shadow hover:shadow-lg transition-all duration-300"
            >
              {/* product card content */}
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                <Image
                  src={product.thumbnail || product.images?.[0]?.url || '/assets/Ayush-Aushadhi-Logo.jpeg'}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="mt-2 text-sm font-semibold line-clamp-2">{product.name}</h3>
              <p className="text-lg font-bold">₹{product.price}</p>

              {product.discount > 0 && (
                <p className="text-sm line-through">₹{product.mrp}</p>
              )}
            </Link>
          ))}
        </div>

        {/* Infinite Scroll Loader */}
        <div ref={loaderRef} className="flex justify-center py-8">
          {loading && (
            <div className="animate-spin h-10 w-10 border-2 border-t-blue-500 rounded-full"></div>
          )}
          {!hasMore && <p className="text-gray-500">No more products</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
