import AppRoutes from '../AppRoutes';
import { SearchProvider } from './components/Context/SearchContext';
function App() {
  return (
    <div className="bg-white-500  min-h-screen">
      <SearchProvider>
        <AppRoutes />
      </SearchProvider>
    </div>
  );
}

export default App;
