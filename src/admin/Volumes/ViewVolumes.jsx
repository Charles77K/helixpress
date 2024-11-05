// import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getJournals, getVolumes } from '../../utils/http';
import Error from '../../utils/Error';
export default function ViewVolumes() {
  const [selectedJournal, setSelectedJournal] = useState('');
  const [journalName, setJournalName] = useState('');

  //get journals
  const {
    data: journal,
    isLoading: isLoadingJournals,
    isError: hasError,
    error,
  } = useQuery({
    queryKey: ['journals'],
    queryFn: () => getJournals(),
    staleTime: 10000,
  });

  //get volumes
  const { data, isError, isLoading } = useQuery({
    queryKey: ['volumes', selectedJournal],
    queryFn: ({ signal }) => getVolumes({ signal, journalId: selectedJournal }),
    enabled: !!selectedJournal,
  });

  const handleChange = (e) => {
    const selectedJournalId = e.target.value;
    setSelectedJournal(selectedJournalId);

    let selected = journal.find((journal) => journal.id === selectedJournalId);
    setJournalName(selected.name ? selected.name : 'Selected Journal');
  };

  let content;

  if (data) {
    content = (
      <>
        {' '}
        <h2 className="text-[14px] font-bold mb-2">
          Volumes for {journalName}
        </h2>
        <ul className="volumes-list space-y-2">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((volume, index) => (
              <li
                key={index}
                className="w-full md:w-1/2 volume-item p-3 bg-gray-50 border border-gray-300 rounded text-sm"
              >
                {volume.number}
              </li>
            ))
          ) : (
            <li>No volumes found</li>
          )}
        </ul>
      </>
    );
  }

  if (isLoading) {
    content = (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  if (isError) {
    content = (
      <Error
        title={'Error!'}
        text={'Error fetching data please try again later'}
      />
    );
  }

  return (
    <div className="p-3">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">View Volumes</h2>

      <label htmlFor="journals" className="block text-lg font-bold mb-2">
        Select a Journal
      </label>
      <select
        id="journals"
        className="block w-full sm:w-1/2 p-3 bg-gray-100 border border-gray-300 rounded"
        value={selectedJournal}
        onChange={handleChange}
        required
      >
        {/* Loop through journals to create options */}
        <option value="" disabled>
          Select Journal
        </option>
        {isLoadingJournals && <option value={'loading'}>Loading....</option>}
        {hasError && (
          <option value={'loading'}>Error fetching data....{error}</option>
        )}
        {Array.isArray(journal) && journal.length > 0 ? (
          journal.map((journals, index) => (
            <option key={index} value={journals.id}>
              {journals.name}
            </option>
          ))
        ) : (
          <option value={'no-journals'}>No Journals Found</option>
        )}
      </select>
      <div className="mt-6">{content}</div>
    </div>
  );
}
