import { useState } from 'react';
import { useFetchJournals, useFetchVolumes } from '../components/Tanstack';
import { useMutation } from '@tanstack/react-query';
import { createIssue, queryClient } from '../../utils/http';
import { toast } from 'react-toastify';
import SelectComponent from '../components/SelectComponent';

export default function CreateIssue() {
  const [journalId, setJournalId] = useState('');
  const [volumeId, setVolumeId] = useState('');
  const [formData, setFormData] = useState({
    number: '',
    volume: '',
    journal: '',
    date_created: '',
  });

  const style =
    'block w-full md:w-1/2 p-3 bg-gray-100 border border-gray-300 rounded';

  const { mutate } = useMutation({
    mutationFn: ({ issueData, volumeId }) =>
      createIssue({ volumeId, issueData }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['volumes', 'issues'],
      });
      toast.success('Volume created successfully');
    },
    onError: (error) => {
      toast.error('Error creating volume', error);
    },
  });

  const handleSubmit = (e) => {
    console.log('Form Data:', formData); // Check if formData is correct
    console.log('Volume ID:', volumeId);
    e.preventDefault();
    // Handle form submission (e.g., post to API)
    mutate({ issueData: formData, volumeId });
  };

  const { data, isError, isLoading } = useFetchJournals();
  const { isVolumeError, isVolumeLoading, volumeData } = useFetchVolumes({
    id: journalId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'journal') {
      const selectedJournal = data.find((journal) => journal.name === value);
      console.log(selectedJournal.id);
      if (selectedJournal) {
        setJournalId(selectedJournal.id);
        setFormData({
          ...formData,
          journal: selectedJournal.name,
          volume: '',
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value, // Set the appropriate field value
      });
    }
  };

  const handleVolumeChange = (e) => {
    const { name, value } = e.target;
    if (name === 'volume') {
      const selectedVolumes = volumeData.find(
        (volumes) => volumes.number == value
      );
      console.log(selectedVolumes.id);
      if (selectedVolumes) {
        setVolumeId(selectedVolumes.id);
        setFormData({
          ...formData,
          volume: selectedVolumes.number,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value, // Set the appropriate field value
      });
    }
  };

  console.log(formData);

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col gap-4 w-full h-screen mx-auto bg-white shadow-md p-6 rounded-lg justify-items-center"
    >
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Create Issue</h2>

      {/* Journals */}
      <SelectComponent
        name="journal"
        isError={isError}
        isLoading={isLoading}
        options={data}
        label="Journals"
        onChange={handleChange}
        value={formData.journal}
        optionValue={(journal) => journal.name}
        optionMain={(journal) => journal.name}
      />

      {/* Volumes */}
      <SelectComponent
        name="volume"
        isError={isVolumeError}
        isLoading={isVolumeLoading}
        options={volumeData}
        label="Volumes"
        onChange={handleVolumeChange}
        value={formData.volume}
        optionValue={(volume) => volume.number}
        optionMain={(volume) => volume.number}
      />

      {/* Issue Number */}
      <div>
        <label className="block text-gray-700 font-bold mb-1">
          Issue Number
        </label>
        <input
          type="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
          className={style}
        />
      </div>

      {/* Date Created */}
      <div>
        <label className="block text-gray-700 font-bold mb-1">
          Date Created
        </label>
        <input
          type="date"
          name="date_created"
          value={formData.date_created}
          onChange={handleChange}
          required
          className={style}
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-1/2 bg-slate-700 text-white font-bold py-2 px-4 rounded-md hover:bg-slate-900 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
}
