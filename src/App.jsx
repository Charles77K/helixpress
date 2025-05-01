import { SearchProvider } from './components/Context/SearchContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routesConfig from './routes/routesConfig';
import { Provider } from 'react-redux';
import store from './store/store';

function AppRoutes() {
  const element = useRoutes(routesConfig);
  return element;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 15,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <div className="bg-white-500 min-h-screen">
      {/* Data and state management */}
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <SearchProvider>
              {/* UI and routing */}
              <ToastContainer />
              <Router>
                <AppRoutes />
              </Router>
            </SearchProvider>
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
