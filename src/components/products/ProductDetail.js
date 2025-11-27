'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { productAPI } from '@/services/api';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'react-hot-toast';
import { Plus, Minus, IndianRupee } from "lucide-react";

const ProductDetail = ({ product: initialProduct }) => {
  const router = useRouter();
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const { addToCart } = useCart();

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
      const success = await addToCart(product, quantity);
      if (success) {
        toast.success('Added to cart!', {
          position: 'bottom-center',
        });
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast.error('Failed to add product to cart', {
        position: 'bottom-center',
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (!isNaN(qty) && qty >= 1) {
      setQuantity(qty);
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

  const showField = (value) => {
    if (!value) return false;
    if (typeof value === "string" && value.trim() === "") return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  };

  function stableRandom(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 10000) / 10000; // 0 - 1
  }


  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product images */}
          <div className="mt-10 lg:mt-0">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
              <Image
                src={product.thumbnail || product.images[0].url}
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
            <h1 className="text-3xl font-extrabold tracking-tight  sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center">
                <p className="text-3xl flex items-center justify-center">
                  <IndianRupee className="w-6 h-6" />{product.price}
                </p>
                {product.discount > 0 && (
                  <>
                    <p className="ml-2 text-lg  line-through flex items-center justify-center">
                      <IndianRupee className='w-4 h-4'/>{product.mrp}
                    </p>
                    <span className="ml-2 text-sm font-medium text-green-600">
                      {product.discount}% off
                    </span>
                  </>
                )}
              </div>

              {/* Reviews */}
              <div className="mt-4 flex items-center">

                {(() => {
                  // If rating exists, use DB rating
                  let rating = product.rating;
                  let reviews = product.numReviews;

                  // If missing, create stable pseudo-random value using product._id or slug
                  const uniqueKey = product._id || product.slug || product.name;

                  if (!rating) {
                    const r = stableRandom(uniqueKey);
                    rating = (3.5 + r * 1.5).toFixed(1); // 3.5 – 5.0
                  }

                  if (!reviews) {
                    const r = stableRandom(uniqueKey + "reviews");
                    reviews = Math.floor(10 + r * 140); // 10 – 150
                  }

                  return (
                    <>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${rating > i ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      <p className="ml-2 text-sm">{reviews} reviews</p>
                    </>
                  );
                })()}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base">
                {product.shortDescription || product.description}
              </div>
            </div>

            {/* Product details */}
            <div className="mt-6">
              <h3 className="text-sm font-medium ">Product Details</h3>
              <div className="mt-4">
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {showField(product.brand) && (
                    <li><span className="font-medium">Brand:</span> {product.brand}</li>
                  )}

                  {showField(product.manufacturer) && (
                    <li><span className="font-medium">Manufacturer:</span> {product.manufacturer}</li>
                  )}

                  {showField(product.saltComposition) && (
                    <li><span className="font-medium">Salt Composition:</span> {product.saltComposition}</li>
                  )}

                  {showField(product.dosageForm) && (
                    <li><span className="font-medium">Dosage Form:</span> {product.dosageForm}</li>
                  )}

                  {showField(product.packSize) && (
                    <li><span className="font-medium">Pack Size:</span> {product.packSize}</li>
                  )}

                  {showField(product.expiryDate) && (
                    <li>
                      <span className="font-medium">Expiry Date:</span>{" "}
                      {new Date(product.expiryDate).toLocaleDateString()}
                    </li>
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
                      <p>This product requires a valid prescription. You&apos;ll need to upload your prescription before checkout.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add to cart */}
            <div className="mt-10">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-[var(--border-color)] rounded-md">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-10 h-8 flex items-center justify-center text-[var(--button-color)] bg-[var(--button-bg-color)] hover:bg-[var(--button-hover-color)]"
                    disabled={quantity <= 1}
                  >
                    <Minus size={20} strokeWidth={2.5} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
                    className="w-12 h-8 text-center border-t border-b border-gray-300"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-8 flex items-center justify-center text-[var(--button-color)] bg-[var(--button-bg-color)] hover:bg-[var(--button-hover-color)]"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors"
                >
                  Add to Cart
                </button>

              </div>
              <div className="flex items-center justify-center space-x-4 text-sm">
                {/* <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  In Stock
                </div> */}
                {/* <span>|</span> */}
                <div>Free Shipping</div>
                <span>|</span>
                <div>7-Day Replacement </div>
              </div>
            </div>

            {/* Additional information */}
            <div className="mt-10 border-t border-[var(--border-color)] pt-10">
              <h3 className="text-sm font-medium ">Additional Information</h3>
              <div className="mt-4">
                <div className="space-y-6">
                  {showField(product.howToUse) && (
                    <div>
                      <h4 className="font-medium">How to Use</h4>
                      <p className="mt-2 text-sm text-gray-600">{product.howToUse}</p>
                    </div>
                  )}

                  {showField(product.safetyInformation) && (
                    <div>
                      <h4 className="font-medium">Safety Information</h4>
                      <p className="mt-2 text-sm text-gray-600">{product.safetyInformation}</p>
                    </div>
                  )}

                  {showField(product.storageInfo) && (
                    <div>
                      <h4 className="font-medium">Storage</h4>
                      <p className="mt-2 text-sm text-gray-600">{product.storageInfo}</p>
                    </div>
                  )}

                  {showField(product.sideEffects) && (
                    <div>
                      <h4 className="font-medium">Side Effects</h4>
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
