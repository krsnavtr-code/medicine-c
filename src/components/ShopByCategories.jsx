'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';

const ShopByCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/v1/categories");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const responseData = await response.json();
        // console.log("Categories API Response:", responseData); // Debug log

        // Extract categories from the response structure
        const categories = responseData.data?.categories || [];
        setCategories(categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Ensure displayCategories is always an array
  const displayCategories = Array.isArray(categories) ? categories : [];

  if (loading) {
    return (
      <div className="py-12 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl sm:mt-4">
              Loading categories...
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm p-6 animate-pulse h-40"
              >
                <div className="h-8 w-8 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Shop by Category
          </h2>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}. Showing default categories.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {displayCategories.map((category) => (
            <Link
              href={`/products/category/${encodeURIComponent(category.name)}`}
              key={category._id}
              className="group"
            >
              <div className="bg-[var(--container-color-in)] rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-200 h-full flex flex-col items-center justify-center">
                <h3 className="text-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                  {category.name} <FiArrowRight className="text-blue-500" />
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByCategories;