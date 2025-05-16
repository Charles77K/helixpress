import axios from 'axios';

export const baseURL = import.meta.env.VITE_API_BASE_URL;

class AxiosHelper {
  constructor(defaultHeaders = {}) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders,
      },
    });

    // remove content type when needed
    this.client.interceptors.request.use((config) => {
      if (config.data instanceof FormData) {
        delete config.headers['Content-Type']; // Let browser set it
      }
      return config;
    });

    // add interceptors for auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        // Handle specific HTTP error codes
        if (response && response.status === 401) {
          // Handle unauthorized access (e.g., redirect to login)
          console.error('Unauthorized access. Please login again.');
          // Potentially trigger a logout or redirect
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Handles axios error and extracts helpful info
   * @param {Error} error - The error object from axios
   * @param {Object} standardized error object
   */
  handleError(error) {
    const errorResponse = {
      message: 'An unexpected error occurred',
      status: null,
      data: null,
    };

    if (error.response) {
      errorResponse.message =
        error.response.data.message ||
        `Request failed with status code ${error.response.status}`;
      errorResponse.status = error.response.status;
      errorResponse.data = error.response.data;
    } else if (error.request) {
      errorResponse.message = 'No response received from server';
    } else {
      errorResponse.message = error.message;
    }

    const customError = new Error(errorResponse.message);
    customError.status = errorResponse.status;
    customError.data = errorResponse.data;
    return customError;
  }

  /**
   * Get all resources from an endpoint
   * @param {string} endpoint- API endpoint
   * @param {object} params - Query parameters
   * @return {Promise} Promise resolving to the data response
   */
  async getAll(endpoint, params = {}) {
    try {
      const response = await this.client.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a single resource by ID
   * @param {string} endpoint - API endpoint
   * @param {string|number} id - Resource ID
   * @param {object} params - Query parameters
   * @returns {Promise} Promise resolving to the response data
   */
  async getById(endpoint, id, params = {}) {
    try {
      // if (!id) {
      //   throw new Error('ID is required');
      // }
      const url = endpoint.includes(':id')
        ? endpoint.replace(':id', id)
        : `${endpoint}${id}`;
      const response = await this.client.get(url, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Create a new resource
   * @param {string} endpoint - API endpoint
   * @param {object} data - Data to be sent in the request body
   * @returns {Promise} Promise resolving to the response data
   */
  async create(endpoint, data) {
    try {
      const response = await this.client.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update an existing resource
   * @param {string} endpoint - API endpoint
   * @param {string|number} id - Resource ID
   * @param {object} data - Data to be sent in the request body
   * @returns {Promise} Promise resolving to the response data
   */
  async update(endpoint, id, data) {
    try {
      const response = await this.client.put(`${endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Partially update an existing resource
   * @param {string} endpoint - API endpoint
   * @param {string|number} id - Resource ID
   * @param {object} data - Data to be sent in the request body
   * @returns {Promise} Promise resolving to the response data
   */
  async patch(endpoint, id, data) {
    try {
      const response = await this.client.patch(`${endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete a resource
   * @param {string} endpoint - API endpoint
   * @param {string|number} id - Resource ID
   * @returns {Promise} Promise resolving to the response data
   */
  async delete(endpoint, id) {
    try {
      const response = await this.client.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Perform a custom request
   * @param {object} config - Axios request configuration
   * @returns {Promise} Promise resolving to the response data
   */
  async request(config) {
    try {
      const response = await this.client.request(config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  /**
   * Performs a custom request
   * @param {endpoint} string - the full api endpoint
   * @returns {Promise} - Promise resolving to the response data
   */
  async customGet(endpoint) {
    try {
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

export default AxiosHelper;
