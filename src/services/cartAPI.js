import { fetchAPI } from './api';

export const cartAPI = {
  getCart: async () => {
    return fetchAPI('/cart', 'GET');
  },

  updateCart: async (items) => {
    return fetchAPI('/cart', 'PATCH', { items });
  },

  addToCart: async (productId, quantity) => {
    return fetchAPI('/cart/items', 'POST', { productId, quantity });
  },

  updateCartItem: async (productId, quantity) => {
    return fetchAPI(`/cart/items/${productId}`, 'PATCH', { quantity });
  },

  removeFromCart: async (productId) => {
    return fetchAPI(`/cart/items/${productId}`, 'DELETE');
  },

  clearCart: async () => {
    return fetchAPI('/cart', 'DELETE');
  },

  checkout: async (checkoutData) => {
    return fetchAPI('/checkout', 'POST', checkoutData);
  },

  getCheckoutSession: async (sessionId) => {
    return fetchAPI(`/checkout/session/${sessionId}`, 'GET');
  },
};
