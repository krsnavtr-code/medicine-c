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
  const url = `/api/v1${endpoint}`;
  
  // Get the JWT token from cookies
  const token = getCookie('jwt');
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
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
      throw error;
    }

    return responseData;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const contactsAPI = {
  // Get all contacts with optional status filter
  getContacts: async (status = '') => {
    const url = status ? `/admin/contacts?status=${status}` : '/admin/contacts';
    return fetchAPI(url);
  },

  // Get contact by ID
  getContact: async (id) => {
    return fetchAPI(`/admin/contacts/${id}`);
  },

  // Update contact status
  updateContactStatus: async (id, status) => {
    return fetchAPI(`/admin/contacts/${id}`, 'PATCH', { status });
  },

  // Delete contact
  deleteContact: async (id) => {
    return fetchAPI(`/admin/contacts/${id}`, 'DELETE');
  },

  // Get contacts statistics
  getStats: async () => {
    return fetchAPI('/admin/contacts/stats');
  }
};

export default contactsAPI;
