// import React from 'react';

export default function Loader() {
  return (
    <div className="w-full h-full animate-pulse space-y-3">
      <div className="bg-gray-200 w-full h-96 rounded" />
      <div className="p-4 space-y-4">
        <div className="w-2/3 bg-gray-200 h-7 rounded"></div>
        <div className="w-3/4 bg-gray-200 h-5 rounded"></div>
        <div className="w-4/5 bg-gray-200 h-5 rounded"></div>
        <div className="w-1/4 bg-gray-200 h-5 rounded"></div>
        <div className="w-1/4 bg-gray-200 h-5 rounded"></div>
        <div className="w-4/5 bg-gray-200 h-8 rounded"></div>
      </div>
    </div>
  );
}
