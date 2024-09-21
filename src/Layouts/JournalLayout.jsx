// ./src/pages/JournalsLayout.js
import { Outlet } from 'react-router-dom';

export default function JournalsLayout() {
  return (
    <div>
      <Outlet /> {/* This renders the child route components */}
    </div>
  );
}
