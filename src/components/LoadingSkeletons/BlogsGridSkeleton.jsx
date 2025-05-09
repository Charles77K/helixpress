const BlogsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
      {[...Array(6)].map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="overflow-hidden rounded-lg shadow-md animate-pulse"
        >
          <div className="w-full h-52 bg-gray-300"></div>
          <div className="p-4 bg-white">
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogsGridSkeleton;
