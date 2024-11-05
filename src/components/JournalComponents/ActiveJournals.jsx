import { Link } from 'react-router-dom';
import { useFetchJournals } from '../../admin/components/Tanstack';

export default function ActiveJournals() {
  const { data, isError, isLoading } = useFetchJournals();
  let content;

  if (isLoading) {
    content = (
      <div className="animate-pulse">
        {Array.from({ length: 7 }).map((_, index) => (
          <tr
            key={index}
            className="border-b border-gray-200 text-[8px] sm:text-[10px] md:text-xs"
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
      </div>
    );
  } else if (data && data.length > 0) {
    content = data.map((item, index) => (
      <tr
        key={item.id}
        className="border-b border-gray-200 text-[8px] sm:text-[10px] md:text-xs"
      >
        <td className="px-6 py-4 text-gray-600">{index + 1}</td>
        <td className="px-6 py-4 flex items-center space-x-2 text-gray-600">
          <img
            src={`https://ogbesomto.pythonanywhere.com${item.pic}`}
            alt={item.pic}
            className="w-8 h-8 object-cover rounded-sm"
          />
          <Link
            to={`/journal/${item.name.replace(/\s+/g, '-').toLowerCase()}/${
              item.id
            }`}
            className="hover:underline"
          >
            <span>{item.name}</span>
          </Link>
        </td>
        <td className="px-6 py-4 text-gray-600">{item.issn}</td>
        <td className="px-6 py-4 text-gray-600">
          {new Date(item.date_created).toLocaleDateString('en-US', {
            year: 'numeric',
          })}
        </td>
        <td className="px-6 py-4 text-gray-600 hidden lg:table-cell">
          {item.impact}
        </td>
        <td className="px-6 py-4 text-gray-600 hidden lg:table-cell">
          {item.cite_score}
        </td>
        <td className="px-6 py-4 text-gray-600 hidden lg:table-cell">
          {item.currentIssue}
        </td>
        <td className="px-6 py-4 text-gray-600">{item.totalArticles}</td>
      </tr>
    ));
  } else if (isError) {
    content = (
      <tr>
        <td colSpan="8" className="px-6 py-4 text-center text-red-600">
          Failed to load journals. Please try again later.
        </td>
      </tr>
    );
  } else {
    content = (
      <tr>
        <td colSpan="8" className="px-6 py-4 text-center text-gray-600">
          No journals available.
        </td>
      </tr>
    );
  }

  return (
    <div className="flex p-4 gap-2 overflow-hidden flex-col items-start justify-center text-slate-700 max-w-[60rem] bg-white">
      <section className="p-3 flex-col items-start flex gap-3">
        <h1 className="text-3xl font-bold">Heli Express Journal List</h1>
        <h2 className="text-xl font-bold">427 Journals</h2>
        <p className="text-xs">
          Heli Express currently publishes 418 peer-reviewed journals, and 9
          conference journals which are dedicated to publishing outputs from
          academic conferences.
        </p>
        <h1 className="text-xl font-bold">Journal Proposal</h1>
        <p className="text-xs">
          As an open access pioneer and innovative publisher, MDPI is always
          interested in exploring new opportunities for collaboration, including
          the launch of new journals and the transfer of existing journals.
          Researchers interested in submitting a proposal for a new journal for
          consideration, or interested in having their journal published by
          MDPI, can submit their proposal here.
        </p>
      </section>
      <div className="overflow-x-auto p-3">
        <table className="min-w-full bg-white border-gray-200 rounded-md shadow-md">
          <thead className="border-gray-200 text-[8px] sm:text-xs md:text-[12px]">
            <tr>
              <th className="px-6 py-3 text-left text-gray-600">#</th>
              <th className="px-6 py-3 text-left text-gray-600">
                Journal Name
              </th>
              <th className="px-6 py-3 text-left text-gray-600">ISSN</th>
              <th className="px-6 py-3 text-left text-gray-600">Launch Date</th>
              <th className="px-6 py-3 text-left text-gray-600 hidden lg:table-cell">
                Impact Factor
              </th>
              <th className="px-6 py-3 text-left text-gray-600 hidden lg:table-cell">
                Cite Score
              </th>
              <th className="px-6 py-3 text-left text-gray-600 hidden lg:table-cell">
                Current Issue
              </th>
              <th className="px-6 py-3 text-left text-gray-600">
                Total Articles
              </th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
}
