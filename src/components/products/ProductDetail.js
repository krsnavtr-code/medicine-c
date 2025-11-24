'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { productAPI } from '@/services/api';

const ProductDetail = ({ product: initialProduct }) => {
  const router = useRouter();
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  // If no initial product is provided, fetch it from the API
  useEffect(() => {
    if (!initialProduct && typeof window !== 'undefined') {
      const pathParts = window.location.pathname.split('/');
      const productId = pathParts[pathParts.length - 1];
      
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const { data } = await productAPI.getProduct(productId);
          setProduct(data);
        } catch (err) {
          setError(err.message || 'Failed to load product');
          console.error('Error fetching product:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [initialProduct]);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      // TODO: Implement add to cart functionality
      // await cartAPI.addToCart(product._id, quantity);
      // Show success message or redirect to cart
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Product not found'}
        </div>
      </div>
    );
  }

  const mainImage = product.images && product.images[selectedImage]?.url || 
                   product.thumbnail || 
                   '/images/placeholder-product.png';

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product images */}
          <div className="mt-10 lg:mt-0">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
              <Image
                src={mainImage}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-cover object-center"
                priority
              />
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="mt-6 grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`rounded-md overflow-hidden ${selectedImage === index ? 'ring-2 ring-indigo-500' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image.url}
                      alt={`${product.name} - ${index + 1}`}
                      width={100}
                      height={100}
                      className="h-24 w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="lg:pt-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center">
                <p className="text-3xl text-gray-900">
                  ${product.sellingPrice || product.price}
                </p>
                {product.discount > 0 && (
                  <>
                    <p className="ml-2 text-lg text-gray-500 line-through">
                      ${product.mrp || product.price}
                    </p>
                    <span className="ml-2 text-sm font-medium text-green-600">
                      {product.discount}% off
                    </span>
                  </>
                )}
              </div>

              {/* Reviews */}
              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <svg
                      key={rating}
                      className={`h-5 w-5 ${
                        product.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500">
                  {product.numReviews || 0} reviews
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base text-gray-700">
                {product.shortDescription || product.description}
              </div>
            </div>

            {/* Product details */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Product Details</h3>
              <div className="mt-4">
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><span className="font-medium">Brand:</span> {product.brand || 'N/A'}</li>
                  <li><span className="font-medium">Manufacturer:</span> {product.manufacturer || 'N/A'}</li>
                  <li><span className="font-medium">Salt Composition:</span> {product.saltComposition || 'N/A'}</li>
                  <li><span className="font-medium">Dosage Form:</span> {product.dosageForm || 'N/A'}</li>
                  <li><span className="font-medium">Pack Size:</span> {product.packSize || 'N/A'}</li>
                  {product.expiryDate && (
                    <li><span className="font-medium">Expiry Date:</span> {new Date(product.expiryDate).toLocaleDateString()}</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Prescription notice */}
            {product.isPrescriptionRequired && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Prescription Required</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>This product requires a valid prescription. You'll need to upload your prescription before checkout.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add to cart */}
            <div className="mt-10">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    type="button"
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <span className="sr-only">Decrease quantity</span>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                    </svg>
                  </button>
                  <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                  <button
                    type="button"
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <span className="sr-only">Increase quantity</span>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={addingToCart || !product.inStock}
                  className={`flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${addingToCart || !product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {addingToCart ? (
                    'Adding...'
                  ) : product.inStock ? (
                    'Add to cart'
                  ) : (
                    'Out of stock'
                  )}
                </button>
              </div>
            </div>

            {/* Additional information */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Additional Information</h3>
              <div className="mt-4">
                <div className="space-y-6">
                  {product.howToUse && (
                    <div>
                      <h4 className="font-medium text-gray-900">How to Use</h4>
                      <p className="mt-2 text-sm text-gray-600">{product.howToUse}</p>
                    </div>
                  )}
                  
                  {product.safetyInformation && (
                    <div>
                      <h4 className="font-medium text-gray-900">Safety Information</h4>
                      <p className="mt-2 text-sm text-gray-600">{product.safetyInformation}</p>
                    </div>
                  )}
                  
                  {product.storageInfo && (
                    <div>
                      <h4 className="font-medium text-gray-900">Storage</h4>
                      <p className="mt-2 text-sm text-gray-600">{product.storageInfo}</p>
                    </div>
                  )}
                  
                  {product.sideEffects && product.sideEffects.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900">Side Effects</h4>
                      <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
                        {product.sideEffects.map((effect, index) => (
                          <li key={index}>{effect}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
