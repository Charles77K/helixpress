const BlogPageSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-52 sm:h-60 bg-gray-300 rounded-lg"></div>

      {/* Title skeleton */}
      <div className="h-8 bg-gray-300 rounded w-3/4"></div>

      {/* Date skeleton */}
      <div className="h-5 bg-gray-200 rounded w-1/4 mt-1"></div>

      {/* Body skeleton - multiple lines */}
      <div className="space-y-3 mt-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-11/12"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-10/12"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-9/12"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};

export default BlogPageSkeleton;
