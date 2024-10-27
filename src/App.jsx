import AppRoutes from '../AppRoutes';
import { SearchProvider } from './components/Context/SearchContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';
import { ToastContainer } from 'react-toastify';
import { Fragment } from 'react';
function App() {
  return (
    <div className="bg-white-500  min-h-screen">
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <Fragment>
            <ToastContainer />
            <AppRoutes />
          </Fragment>
        </SearchProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
