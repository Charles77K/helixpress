import { SearchProvider } from './components/Context/SearchContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';
import { ToastContainer } from 'react-toastify';
import { Fragment } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routesConfig from './routes/routesConfig';
import { Provider } from 'react-redux';
import store from './store/store';

function AppRoutes() {
  const element = useRoutes(routesConfig);
  return element;
}

function App() {
  return (
    <div className="bg-white-500  min-h-screen">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <SearchProvider>
            <Fragment>
              <ToastContainer />
              <Router>
                <AppRoutes />
              </Router>
            </Fragment>
          </SearchProvider>
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
