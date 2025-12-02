'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { productAPI } from '@/services/api';
import { FiEdit, FiTrash2, FiEye, FiPlus } from 'react-icons/fi';

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    // Reset products and page when search term changes
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(true);
  }, [searchTerm]);

  // Initial load and when page changes
  useEffect(() => {
    if (page === 1) return; // Skip initial load as it's handled by search term effect
    fetchProducts(false);
  }, [page, searchTerm]);

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoadingMore]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 &&
      hasMore &&
      !isLoadingMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const fetchProducts = async (reset = false) => {
    try {
      if (reset) {
        setLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const { data } = await productAPI.getProducts();

      setProducts((prevProducts) =>
        reset ? data : [...prevProducts, ...data]
      );
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleDelete = async (id) => {
    if (deleteConfirm === id) {
      try {
        setDeleting(id);
        await productAPI.deleteProduct(id);
        setProducts(products.filter((product) => product._id !== id));
        setDeleteConfirm(null);
      } catch (err) {
        console.error("Error deleting product:", err);
        setError("Failed to delete product");
      } finally {
        setDeleting(false);
      }
    } else {
      setDeleteConfirm(id);
      setTimeout(() => {
        setDeleteConfirm(null);
      }, 3000);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Reset state is handled in the search term effect
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-[var(--button-color)] bg-[var(--button-bg-color)] hover:bg-[var(--button-hover-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--button-color)] mt-4 md:mt-0"
        >
          <FiPlus className="mr-2 h-4 w-4" />
          Add New Product
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-[var(--container-color-in)] shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 border-b border-[var(--border-color)]">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-[var(--border-color)] bg-[var(--container-color)] shadow-sm focus:ring-[var(--button-bg-color)] focus:border-[var(--button-bg-color)] sm:text-sm"
            />
            <button
              type="submit"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-[var(--button-color)] bg-[var(--button-bg-color)] hover:bg-[var(--button-hover-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--button-color)]"
            >
              Search
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--border-color)]">
            <thead className="bg-[var(--container-color-in)]">
              <tr>
                <th>S.No</th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[var(--text-color)] uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium  uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-[var(--container-color-in)] divide-y divide-[var(--border-color)]">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm ">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr
                    key={product._id}
                    className="hover:bg-[var(--container-color)] bg-[var(--container-color-in)]"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {product.thumbnail ||
                          (product.images && product.images[0]?.url) ? (
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={product.thumbnail || product.images[0].url}
                              alt={product.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                              <span className="text-xs ">No Image</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm ">{product.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.category}
                      </div>
                      {product.subCategory && (
                        <div className="text-sm ">{product.subCategory}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${product.price}
                      </div>
                      {product.discount > 0 && (
                        <div className="text-xs  line-through">
                          ${product.mrp}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock > 10
                            ? "bg-green-100 text-green-800"
                            : product.stock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock} {product.unit || "units"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                      {product.isFeatured && (
                        <span className="ml-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          Featured
                        </span>
                      )}
                      {product.isPrescriptionRequired && (
                        <span className="ml-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Rx
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/products/${product.slug || product._id}`}
                          target="_blank"
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View"
                        >
                          <FiEye className="h-5 w-5" />
                        </Link>
                        <Link
                          href={`/admin/products/${product._id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <FiEdit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className={`${
                            deleteConfirm === product._id
                              ? "text-red-700 hover:text-red-900"
                              : "text-red-600 hover:text-red-800"
                          }`}
                          title={
                            deleteConfirm === product._id
                              ? "Confirm Delete"
                              : "Delete"
                          }
                          disabled={deleting === product._id}
                        >
                          {deleting === product._id ? (
                            <svg
                              className="animate-spin h-5 w-5 text-red-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          ) : (
                            <FiTrash2 className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Loading indicator at bottom */}
        {(isLoadingMore || (loading && products.length > 0)) && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {!hasMore && products.length > 0 && (
          <div className="text-center py-4 text-sm text-gray-500">
            No more products to load
          </div>
        )}
      </div>
    </div>
  );
}
