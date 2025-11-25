// Use NEXT_PUBLIC_ prefix to expose the variable to the browser
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper function to get cookie by name
function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Helper function to handle API requests
async function fetchAPI(endpoint, method = 'GET', data = null) {
  // Ensure endpoint starts with a forward slash
  // const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}/api/v1${endpoint}`;
  
  // Get the JWT token from cookies
  const token = getCookie('jwt');
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important for cookies/sessions
  };
  
  // Add Authorization header if token exists
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    
    // Handle 204 No Content responses
    if (response.status === 204) {
      return null;
    }
    
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Something went wrong');
      error.status = response.status;
      // Only log non-401 errors to the console
      if (response.status !== 401) {
        console.error('API Error:', error);
      }
      throw error;
    }

    return responseData;
  } catch (error) {
    // Only log non-401 errors
    if (error.status !== 401) {
      console.error('API Error:', error);
    }
    throw error;
  }
}

// Auth API
export const authAPI = {
  login: async (email, password) => {
    return fetchAPI('/users/login', 'POST', { email, password });
  },
  
  signup: async (name, email, password, passwordConfirm) => {
    return fetchAPI('/users/signup', 'POST', { 
      name, 
      email, 
      password, 
      passwordConfirm 
    });
  },
  
  forgotPassword: async (email) => {
    return fetchAPI('/users/forgot-password', 'POST', { email });
  },
  
  verifyOTP: async (email, otp) => {
    return fetchAPI('/users/verify-otp', 'POST', { email, otp });
  },
  
  resetPassword: async (token, password, passwordConfirm) => {
    return fetchAPI(`/users/reset-password/${token}`, 'PATCH', { 
      password, 
      passwordConfirm 
    });
  },
  
  logout: async () => {
    return fetchAPI('/users/logout', 'GET');
  },
  
  getCurrentUser: async () => {
    return fetchAPI('/users/me', 'GET');
  },
  
  updateProfile: async (profileData) => {
    return fetchAPI('/users/me', 'PATCH', profileData);
  }
};

// Product API
export const productAPI = {
  // Get all products with optional query parameters
  getProducts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchAPI(`/products?${queryString}`);
  },

  // Get single product by ID or slug
  getProduct: (idOrSlug) => {
    return fetchAPI(`/products/${idOrSlug}`);
  },

  // Create a new product
  createProduct: (productData) => {
    return fetchAPI('/products', 'POST', productData);
  },

  // Update a product
  updateProduct: (id, productData) => {
    return fetchAPI(`/products/${id}`, 'PUT', productData);
  },

  // Delete a product (soft delete)
  deleteProduct: (id) => {
    return fetchAPI(`/products/${id}`, 'DELETE');
  },

  // Upload product image
  uploadProductImage: (id, file) => {
    const formData = new FormData();
    formData.append('file', file);

    // Override the default fetch options for file upload
    const url = `${API_BASE_URL}/api/v1/products/${id}/photo`;
    const token = getCookie('jwt');

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
      credentials: 'include',
      body: formData,
    }).then(handleResponse);
  },

  // Get products by category
  getProductsByCategory: (category) => {
    return fetchAPI(`/products/category/${encodeURIComponent(category)}`);
  },

  // Get featured products
  getFeaturedProducts: () => {
    return fetchAPI('/products/featured');
  },

  // Search products
  searchProducts: (query) => {
    return fetchAPI(`/products/search?q=${encodeURIComponent(query)}`);
  },

  // Get product categories
  getCategories: () => {
    return fetchAPI('/products/categories');
  }
};

// Helper function to handle response
async function handleResponse(response) {
  const contentType = response.headers.get('content-type');

  if (response.status === 204) {
    return null;
  }

  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Something went wrong');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  }

  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || 'Something went wrong');
  }

  return text;
}

// Export all APIs as a named export
const api = {
  auth: authAPI,
  product: productAPI
};

export default api;
