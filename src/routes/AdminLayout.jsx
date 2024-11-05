// AdminLayout.js
import { Outlet } from 'react-router-dom';

export function AdminLayout() {
  return (
    <div className="admin-container">
      {/* Optional Admin Sidebar or Header can be included here */}
      <main>
        <Outlet /> {/* Renders the admin child routes */}
      </main>
    </div>
  );
}

export default AdminLayout;
