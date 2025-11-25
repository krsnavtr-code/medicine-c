'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { cartAPI } from '@/services/api';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { isAuthenticated, user } = useAuth();
  const [cart, setCart] = useState({
    items: [],
    totalItems: 0,
    totalPrice: 0,
    loading: true,
  });

  // Load cart from API when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      // Load from localStorage if not authenticated
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setCart(JSON.parse(localCart));
      } else {
        setCart({
          items: [],
          totalItems: 0,
          totalPrice: 0,
          loading: false,
        });
      }
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      const { data } = await cartAPI.getCart();
      setCart({
        items: data.items || [],
        totalItems: data.totalItems || 0,
        totalPrice: data.totalPrice || 0,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart(prev => ({ ...prev, loading: false }));
    }
  };

  const saveCart = async (updatedCart) => {
    try {
      if (isAuthenticated) {
        // First, ensure the cart exists
        try {
          await cartAPI.getCart();
        } catch (error) {
          if (error.response?.status === 404) {
            // If cart doesn't exist, create it by adding the first item
            if (updatedCart.items.length > 0) {
              await cartAPI.addToCart(
                updatedCart.items[0].product._id,
                updatedCart.items[0].quantity
              );
              // If there are more items, update them
              for (let i = 1; i < updatedCart.items.length; i++) {
                const item = updatedCart.items[i];
                await cartAPI.addToCart(item.product._id, item.quantity);
              }
            }
            return;
          }
          throw error;
        }

        // If we get here, cart exists, proceed with normal update
        for (const item of updatedCart.items) {
        try {
          await cartAPI.updateCartItem(item.product._id, item.quantity);
        } catch (updateError) {
          if (updateError.message === 'Item not found in cart') {
            // If item not in cart, add it
            await cartAPI.addToCart(item.product._id, item.quantity);
          } else {
            throw updateError;
          }
        }
      }
      } else {
        // For guest users, just save to localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error("Error saving cart:", error);
      throw error;
    }
  };
  const addToCart = async (product, quantity = 1) => {
    try {
      setCart(prev => ({ ...prev, loading: true }));
      
      const existingItemIndex = cart.items.findIndex(
        item => item.product._id === product._id
      );

      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = [...cart.items];
        updatedItems[existingItemIndex].quantity += quantity;
      } else {
        updatedItems = [...cart.items, { product, quantity }];
      }

      const updatedCart = {
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedItems.reduce(
          (sum, item) => sum + (item.product.price * item.quantity),
          0
        ),
        loading: false,
      };

      await saveCart(updatedCart);
      setCart(updatedCart);
      
      toast.success('Added to cart!');
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
      setCart(prev => ({ ...prev, loading: false }));
      return false;
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      if (quantity < 1) {
        await removeFromCart(productId);
        return;
      }

      setCart(prev => ({ ...prev, loading: true }));
      
      const updatedItems = cart.items.map(item => 
        item.product._id === productId 
          ? { ...item, quantity } 
          : item
      );

      const updatedCart = {
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedItems.reduce(
          (sum, item) => sum + (item.product.price * item.quantity),
          0
        ),
        loading: false,
      };

      await saveCart(updatedCart);
      setCart(updatedCart);
      
      toast.success('Cart updated');
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
      setCart(prev => ({ ...prev, loading: false }));
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setCart(prev => ({ ...prev, loading: true }));
      
      const updatedItems = cart.items.filter(
        item => item.product._id !== productId
      );

      const updatedCart = {
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedItems.reduce(
          (sum, item) => sum + (item.product.price * item.quantity),
          0
        ),
        loading: false,
      };

      await saveCart(updatedCart);
      setCart(updatedCart);
      
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item');
      setCart(prev => ({ ...prev, loading: false }));
    }
  };

  const clearCart = async () => {
    try {
      setCart({
        items: [],
        totalItems: 0,
        totalPrice: 0,
        loading: false,
      });

      if (isAuthenticated) {
        await cartAPI.clearCart();
      } else {
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  // Merge guest cart with user cart after login
  useEffect(() => {
    const mergeCarts = async () => {
      if (isAuthenticated && user) {
        const localCart = localStorage.getItem('cart');
        if (localCart) {
          try {
            const guestCart = JSON.parse(localCart);
            if (guestCart.items && guestCart.items.length > 0) {
              await Promise.all(
                guestCart.items.map(item => 
                  addToCart(item.product, item.quantity)
                )
              );
              localStorage.removeItem('cart');
            }
          } catch (error) {
            console.error('Error merging carts:', error);
          }
        }
      }
    };

    mergeCarts();
  }, [isAuthenticated, user]);

  return (
    <CartContext.Provider
      value={{
        ...cart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
