// import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import {
  editVolume,
  getJournals,
  getVolumes,
  queryClient,
} from '../../utils/http';
import Error from '../../utils/Error';
import { toast } from 'react-toastify';

export default function EditVolumes() {
  const [selectedJournal, setSelectedJournal] = useState('');
  const [selectedVolume, setSelectedVolume] = useState('');
  const [volume, setVolume] = useState();
  const [journalName, setJournalName] = useState('');
  const [formData, setFormData] = useState({
    journal: '',
    number: '',
  });

  //Query function to fetch journals
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

  //Query function to fetch volumes
  const {
    data: volumes,
    isError: isVolumeError,
    isLoading: isVolumesLoading,
  } = useQuery({
    queryKey: ['volumes', selectedJournal],
    queryFn: ({ signal }) => getVolumes({ signal, journalId: selectedJournal }),
    enabled: !!selectedJournal,
  });

  //Query function to update volumes
  const { mutate, isPending } = useMutation({
    mutationFn: editVolume,
    onSuccess: () => {
      toast.success('volume updated successfully', {
        autoClose: 3000,
      });
      queryClient.invalidateQueries({
        queryKey: ['volumes'],
      });
      setFormData({
        journal: '',
        number: '',
      });
    },
    onError: () => {
      toast.error('An error occured');
    },
  });

  //function to handchnage the formData
  const handleChangeVolume = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);
  //handle function to update the volumes
  const handleUpdateVolume = () => {
    if (!formData.journal || !formData.number) {
      alert('Please enter both a number and journal name');
      return;
    }
    mutate({ volumeId: selectedVolume, volumeData: formData });
  };
  console.log('selected volume ' + selectedVolume);

  let content;

  //function to set the journal id and journal name
  const handleChange = (e) => {
    const selectedJournalId = e.target.value;
    setSelectedJournal(selectedJournalId);

    let selected = journal.find((journal) => journal.id === selectedJournalId);
    setJournalName(selected.name ? selected.name : 'Selected Journal');
  };

  //function to set the volume id and the volume number
  const handleVolume = (e) => {
    const volumeId = e.target.value;
    setSelectedVolume(volumeId);

    const select = volumes.find((volume) => volume.id === volumeId);
    setVolume(select.number ? select.number : 'Selected Volume');
  };

  //display if the volumes are loading
  if (isVolumesLoading) {
    content = (
      <div className="flex items-center justify-center">
        <div className="loader animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  //display if there is an error message while fetching the volumess
  if (isVolumeError) {
    content = (
      <Error
        title={'Error!'}
        text={'Error fetching data please try again later'}
      />
    );
  }

  //display if the volumes data where successfully fetched
  if (volumes) {
    content = (
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          List of Volumes on {journalName}
        </label>
        <select
          name="journal"
          value={selectedVolume} // Use the JournalId state to control the select value
          onChange={handleVolume}
          required
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none"
        >
          <option value="" disabled>
            Select Volume
          </option>
          <>
            {volumes.map((volume, index) => (
              <option key={index} value={volume.id}>
                Volume {volume.number}
              </option>
            ))}
          </>
        </select>
        {/* Input field to edit volume name */}
        <div className="mt-4">
          <label className="block text-gray-700 font-bold mb-2">
            Edit Volume {volume}
          </label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChangeVolume}
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Enter new volume number"
          />
        </div>
        {/* input field for selecting journal */}
        <select
          id="journalName"
          name="journal"
          className="block w-full sm:w-1/2 p-3 mt-5 bg-gray-100 border border-gray-300 rounded"
          value={formData.journal}
          onChange={handleChangeVolume}
          required
        >
          <option value="" disabled>
            Select Journal
          </option>
          {isLoadingJournals && <option value={'loading'}>Loading....</option>}
          {hasError && (
            <option value={'loading'}>Error fetching data....{error}</option>
          )}
          {Array.isArray(journal) && journal?.length > 0 ? (
            journal.map((journals, index) => (
              <option key={index} value={journals.id}>
                {journals.name}
              </option>
            ))
          ) : (
            <option value={'no-journals'}>No Journals Found</option>
          )}
        </select>
        {/* Button to trigger update */}
        <button
          onClick={handleUpdateVolume}
          className="mt-4 bg-slate-800 w-1/2 text-white py-2 px-4 rounded"
        >
          {isPending ? 'Updating' : 'Update'}
        </button>
      </div>
    );
  }

  return (
    <div className="p-3">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Edit Volume</h2>

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
        {Array.isArray(journal) && journal?.length > 0 ? (
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
