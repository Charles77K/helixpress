// import React from 'react'
import { useFetchJournals } from '../components/Tanstack';

export default function ViewJournals() {
  const { data, isError, isLoading } = useFetchJournals();

  let content;

  if (isLoading) {
    content = <p className="text-center text-gray-500">Loading...</p>;
  } else if (isError) {
    content = (
      <p className="text-center text-red-500">Error loading journals.</p>
    );
  } else if (data) {
    content = data.map((journal, index) => (
      <ul key={index} className="border-b border-gray-200 p-4">
        <li className="flex flex-col gap-2 text-slate-700">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-bold text-gray-800">
              {index + 1}.
            </span>
            <p className="text-sm font-bold">{journal.name || 'N/A'}</p>
          </div>
          <div className="text-xs text-gray-500 leading-5">
            <p className="">{journal.about || 'No description available.'}</p>
            <p>{journal.abbrv || 'No abbreviation available.'}</p>
          </div>
        </li>
      </ul>
    ));
  }

  return (
    <div className="bg-white h-full w-full p-2">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Journals
      </h2>
      {content}
    </div>
  );
}
