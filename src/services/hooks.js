// simplified-tanstack-helpers.js
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import AxiosHelper from './http';

// Create an API instance with your base URL
const api = new AxiosHelper();

/**
 * Simple hooks for fetching data with TanStack Query
 */
export const useFetch = (endpoint, params = {}, options = {}) => {
  return useQuery({
    // The queryKey is what TanStack uses to cache and identify this query
    queryKey: [endpoint, params],
    // The actual function that fetches data
    queryFn: () => api.getAll(endpoint, params),
    ...options,
  });
};

/**
 * Fetch a single item by ID
 */
export const useFetchById = (endpoint, id, options = {}) => {
  return useQuery({
    queryKey: [endpoint, id],
    queryFn: () => api.getById(endpoint, id),
    // Only run the query if we have an ID
    enabled: !!id,
    ...options,
  });
};

/**
 * Create a new item
 */
export const useCreate = (endpoint, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.create(endpoint, data),
    onSuccess: () => {
      // After creating, refresh any queries for this endpoint
      queryClient.invalidateQueries({ queryKey: [endpoint] });

      if (options.onSuccess) {
        options.onSuccess();
      }
    },
    ...options,
  });
};

/**
 * Update an existing item
 */
export const useUpdate = (endpoint, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    // Expect an object with id and data properties
    mutationFn: ({ id, data }) => api.update(endpoint, id, data),
    onSuccess: (_, variables) => {
      // After updating, refresh queries for this item and list
      queryClient.invalidateQueries({ queryKey: [endpoint, variables.id] });
      queryClient.invalidateQueries({ queryKey: [endpoint] });

      if (options.onSuccess) {
        options.onSuccess();
      }
    },
    ...options,
  });
};

/**
 * Delete an item
 */
export const useDelete = (endpoint, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => api.delete(endpoint, id),
    // eslint-disable-next-line no-unused-vars
    onSuccess: (_, deletedId) => {
      // After deleting, refresh queries for this endpoint
      queryClient.invalidateQueries({ queryKey: [endpoint] });

      if (options.onSuccess) {
        options.onSuccess();
      }
    },
    ...options,
  });
};

/**
 * Fetch with infinite scrolling/pagination
 */
export const useInfiniteScroll = (
  endpoint,
  { pageSize = 10, filters = {}, ...options } = {}
) => {
  return useInfiniteQuery({
    queryKey: [endpoint, 'infinite', { pageSize, ...filters }],
    queryFn: ({ pageParam = 1 }) =>
      api.getAll(endpoint, { page: pageParam, limit: pageSize, ...filters }),
    getNextPageParam: (lastPage, _, lastPageParam = 0) => {
      // Check if there are more pages (adapt this to your API's response format)
      const hasMore =
        lastPage.hasNextPage ||
        (lastPage.totalPages && lastPageParam < lastPage.totalPages) ||
        (lastPage.data && lastPage.data.length === pageSize);

      return hasMore ? lastPageParam + 1 : undefined;
    },
    ...options,
  });
};

// For checking loading state across the app
export const useLoadingState = () => {
  const queryClient = useQueryClient();
  return {
    isLoading: queryClient.isFetching() > 0 || queryClient.isMutating() > 0,
  };
};

export default {
  useFetch,
  useFetchById,
  useCreate,
  useUpdate,
  useDelete,
  useInfiniteScroll,
  useLoadingState,
};
