import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getJournals, createVolume, queryClient } from '../../utils/http';
import { toast } from 'react-toastify';

export default function CreateVolume() {
  const [JournalId, setJournalId] = useState(''); // State to store the selected journal's ID
  const [formData, setFormData] = useState({
    number: '',
    journal: '',
    date_created: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field: ${name}, Value: ${value}`); // Log the field and value

    if (name === 'journal') {
      const selectedJournal = data.find((journal) => journal.name === value);
      if (selectedJournal) {
        setJournalId(selectedJournal.id);
        setFormData({
          ...formData,
          journal: selectedJournal.name,
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
  const { mutate, isPending: isVolumePending } = useMutation({
    mutationFn: ({ journalId, volumeData }) =>
      createVolume({ journalId, volumeData }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['volumes'],
      });
      toast.success('volume created successfully', {
        autoClose: 2000,
      });
      setFormData({
        number: '',
        journal: '',
        date_created: '',
      });
    },
  });

  //fetch journals
  const { data, isPending, error } = useQuery({
    queryKey: ['journals'],
    queryFn: getJournals,
  });

  let content;

  if (isPending) {
    content = (
      <option className="text-center text-gray-500" value={'loading....'}>
        Loading...
      </option>
    );
  }
  if (error) {
    content = (
      <option className="text-center text-red-500" value={'Loading...'}>
        Error fetching data
      </option>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Call mutation with the selected journal ID and form data
    mutate({ journalId: JournalId, volumeData: formData });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto bg-white shadow-md p-6 rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Create Volume</h2>

      {/* Volume Number */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Volume Number
        </label>
        <input
          type="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Journal */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Journal</label>
        <select
          name="journal"
          value={formData.journal} // Use the JournalId state to control the select value
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="" disabled>
            Select Journal
          </option>
          {isPending ? (
            content
          ) : (
            <>
              {data?.map((journal, index) => (
                <option key={index} value={journal.name}>
                  {journal.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>

      {/* Date Created */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Date Created
        </label>
        <input
          type="date"
          name="date_created"
          value={formData.date_created}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-slate-700 text-white font-bold py-2 px-4 rounded-md hover:bg-slate-900 transition duration-300"
      >
        {isVolumePending ? 'Submitting....' : 'Submit'}
      </button>
    </form>
  );
}
