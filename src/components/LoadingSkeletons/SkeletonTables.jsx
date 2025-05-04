// Skeleton loader for the table
const SkeletonTable = () => (
  <>
    {Array.from({ length: 7 }).map((_, index) => (
      <tr
        key={index}
        className="border-b border-gray-200 text-[8px] sm:text-[10px] md:text-xs animate-pulse"
      >
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-8"></div>
        </td>
        <td className="px-6 py-4 flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-sm"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-12"></div>
        </td>
        <td className="px-6 py-4 hidden lg:table-cell">
          <div className="h-4 bg-gray-300 rounded w-10"></div>
        </td>
        <td className="px-6 py-4 hidden lg:table-cell">
          <div className="h-4 bg-gray-300 rounded w-10"></div>
        </td>
        <td className="px-6 py-4 hidden lg:table-cell">
          <div className="h-4 bg-gray-300 rounded w-12"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-8"></div>
        </td>
      </tr>
    ))}
  </>
);

export default SkeletonTable;
