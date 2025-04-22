import axios from 'axios';

export const baseURL = 'https://helixpress-backend.vercel.app/api/v1'; // Use base URL

class AxiosHelper {
  constructor(defaultHeaders = {}) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders,
      },
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
      // Server responded with a non-2xx status code
      errorResponse.message =
        error.response.data.message ||
        `Request failed with status code ${error.response.status}`;
      errorResponse.status = error.response.status;
      errorResponse.data = error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      errorResponse.message = 'No response received from server';
    } else {
      // Something else caused the error
      errorResponse.message = error.message;
    }

    return errorResponse;
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
      const response = await this.client.get(`${endpoint}/${id}`, { params });
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
}

export default AxiosHelper;
