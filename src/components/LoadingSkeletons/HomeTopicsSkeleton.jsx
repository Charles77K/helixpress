const HomeTopicsSkeleton = () => {
  return (
    <div className="animate-pulse space-y-3">
      {/* Repeat this structure for each skeleton item */}
      {[...Array(3)].map((_, index) => (
        <ul key={index} className="text-xs space-y-2">
          <li className="flex flex-col items-start">
            <p className="bg-gray-300 h-4 w-32 rounded my-1"></p>
            <p className="bg-gray-300 h-5 w-48 rounded font-bold my-1"></p>
            <p className="bg-gray-300 h-4 w-64 rounded my-1"></p>
            <p className="bg-gray-300 h-4 w-32 rounded text-red-500 my-1"></p>
          </li>
          <hr className="my-3" />
        </ul>
      ))}
    </div>
  );
};

export default HomeTopicsSkeleton;
