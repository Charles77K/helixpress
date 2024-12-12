// SkeletonArticle.js
export default function SkeletonArticle() {
  return (
    <div className="mt-4 md:w-full animate-pulse">
      <hr className="py-3" />
      {Array.from({ length: 3 }).map((_, index) => (
        <ul key={index} className="mb-8">
          <li>
            <div className="flex justify-between items-start text-xs">
              <section className="flex flex-wrap gap-2 items-center">
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </section>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </div>
            <h2 className="h-6 bg-gray-300 rounded my-3 w-3/4"></h2>
            <p className="h-4 bg-gray-300 rounded w-1/2"></p>
            <section className="text-[13px] flex flex-wrap gap-1 my-1">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-4 bg-gray-300 rounded w-28"></div>
            </section>
            <section className="my-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mt-1"></div>
            </section>
            <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
          </li>
        </ul>
      ))}
    </div>
  );
}
