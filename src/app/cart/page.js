'use client';

import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

export default function CartPage() {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    loading,
    updateCartItem,
    removeFromCart,
    clearCart
  } = useCart();
  
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (quantity >= 1) {
      updateCartItem(productId, quantity);
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to proceed to checkout');
      router.push('/login?redirect=/cart');
      return;
    }

    try {
      setIsCheckingOut(true);
      // Here you would typically integrate with a payment processor
      // For now, we'll just clear the cart and show a success message
      await clearCart();
      toast.success('Order placed successfully!');
      router.push('/orders');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process your order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      {totalItems === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 font-medium text-gray-600">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.product._id} className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="flex items-center space-x-4 col-span-5">
                      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.images?.[0] || '/placeholder-product.jpg'}
                          alt={item.product.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">{item.product.brand}</p>
                      </div>
                    </div>
                    
                    <div className="text-gray-700 text-center col-span-2">
                      ${item.product.price.toFixed(2)}
                    </div>
                    
                    <div className="col-span-3">
                      <div className="flex items-center justify-center">
                        <button 
                          onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-100"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.product._id, e.target.value)}
                          className="w-12 h-8 text-center border-t border-b border-gray-300"
                        />
                        <button 
                          onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between col-span-2">
                      <span className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button 
                        onClick={() => removeFromCart(item.product._id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t flex justify-between items-center">
                <Link 
                  href="/products"
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Continue Shopping
                </Link>
                <button 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700"
                  disabled={items.length === 0}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || totalItems === 0}
                  className={`w-full mt-6 py-3 px-4 rounded-md font-medium text-white ${
                    isCheckingOut || totalItems === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                </button>
                
                <p className="text-xs text-gray-500 mt-2">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
            
            {!isAuthenticated && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-sm text-yellow-700">
                <p className="font-medium mb-1">Have an account?</p>
                <p>
                  <Link href="/login?redirect=/cart" className="text-blue-600 hover:underline">
                    Log in
                  </Link>{' '}
                  for a faster checkout experience and to save your cart for later.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
