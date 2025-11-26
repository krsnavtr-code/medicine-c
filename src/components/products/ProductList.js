'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productAPI } from '@/services/api';

const ProductList = ({ initialProducts = [] }) => {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(!initialProducts.length);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    limit: 12,
    page: 1,
    sort: "-createdAt",
    isActive: true,
    isDeleted: false
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await productAPI.getProducts(filters);
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!initialProducts.length) {
      fetchProducts();
    }
  }, [filters, initialProducts.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No products found</h3>
        <p className="mt-1 text-sm ">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
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
              {/* Image */}
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                {product.thumbnail || (product.images && product.images[0]?.url) ? (
                  <Image
                    src={product.thumbnail || product.images[0].url}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>

              {/* Brand + Category */}
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs font-medium ">{product.brand}</span>
                <span className="text-xs px-2 py-0.5 rounded-full capitalize">
                  {product.category}
                </span>
              </div>

              {/* Name */}
              <h3 className="mt-2 text-sm font-semibold line-clamp-2">
                {product.name}
              </h3>

              {/* Use For (Male/Female/Both) */}
              {product.useFor && (
                <p className="text-xs font-medium mt-1">
                  For: {product.useFor}
                </p>
              )}

              {/* Price */}
              <div className="flex items-center mt-2">
                <p className="text-lg font-bold">
                  ₹{product.sellingPrice || product.price}
                </p>

                {product.discount > 0 && (
                  <>
                    <p className="ml-2 text-sm  line-through">
                      ₹{product.mrp || product.price}
                    </p>
                    <span className="ml-2 text-xs font-medium text-green-600">
                      {product.discount}% off
                    </span>
                  </>
                )}
              </div>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="mt-1 flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <svg
                        key={rating}
                        className={`h-4 w-4 ${product.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 
                1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 
                3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 
                00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 
                1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 
                0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-xs ">
                    ({product.numReviews || 0})
                  </span>
                </div>
              )}

              {/* Prescription Tag */}
              {product.isPrescriptionRequired && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-2">
                  Prescription Required
                </span>
              )}

              {/* Low Stock */}
              {product.stock < 10 && product.stock > 0 && (
                <p className="text-xs text-red-500 font-medium mt-1">Only {product.stock} left</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
