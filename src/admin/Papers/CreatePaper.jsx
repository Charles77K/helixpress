import { useState } from 'react';
import {
  useFetchIssues,
  useFetchJournals,
  useFetchVolumes,
} from '../components/Tanstack';
import SelectComponent from '../components/SelectComponent';
import { useMutation } from '@tanstack/react-query';
import { createPaper } from '../../utils/http';
import { toast } from 'react-toastify';

export default function CreatePaper() {
  const [journalId, setJournalId] = useState('');
  const [volumeId, setVolumeId] = useState('');
  const [issueId, setIssueId] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    institution: '',
    keywords: '',
    volume: '',
    issue: '',
    journal: '',
    document: null,
    doi: '',
    editorsChoice: false,
    date_created: '',
  });

  const { volumeData, isVolumeLoading, isVolumeError } = useFetchVolumes({
    id: journalId,
  });
  const { data, isError, isLoading } = useFetchJournals();
  const { issuesData, isIssuesError, isIssuesLoaing } = useFetchIssues({
    id: volumeId,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Update form data
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });

    // Reset dependent fields when selecting a journal or volume
    if (name === 'journal') {
      const selectedJournal = data?.find((journal) => journal.name === value);

      if (selectedJournal) {
        setJournalId(selectedJournal.id);
      }

      // Reset volume and issue fields when a new journal is selected
      setFormData((prevState) => ({
        ...prevState,
        volume: '',
        issue: '',
      }));
      setVolumeId('');
      setIssueId('');
    }

    if (name === 'volume') {
      const selectedVolume = volumeData?.find(
        (volume) => volume.number == value
      );

      if (selectedVolume) {
        setVolumeId(selectedVolume.id);
      }

      // Reset issue field when a new volume is selected
      setFormData((prevState) => ({
        ...prevState,
        issue: '',
      }));
      setIssueId('');
    }

    if (name === 'issue') {
      const selectedIssue = issuesData?.find((issue) => issue.number == value);

      if (selectedIssue) {
        setIssueId(selectedIssue.id);
      }
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-paper'],
    mutationFn: ({ issueId, paperData }) => createPaper({ issueId, paperData }),
    onSuccess: () => {
      toast.success('created successfully');
    },
    onError: (error) => {
      toast.error('failed to create', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    Object.keys(formData).forEach((key) => newForm.append(key, formData[key]));
    // Handle form submission (e.g., post to API)
    mutate({ issueId, paperData: newForm });
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto bg-white shadow-md p-6 rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Submit Paper</h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Author */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Institution */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Institution
        </label>
        <input
          type="text"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Keywords */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Keywords</label>
        <input
          type="text"
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      {/* Journal */}
      <SelectComponent
        isError={isError}
        isLoading={isLoading}
        label="Journal"
        name="journal"
        onChange={handleChange}
        optionMain={(journal) => journal.name}
        optionValue={(journal) => journal.name}
        options={data}
        value={formData.journal}
      />

      {/* Volume */}
      <SelectComponent
        isError={isVolumeError}
        isLoading={isVolumeLoading}
        label="Volume"
        name="volume"
        onChange={handleChange}
        optionMain={(volume) => volume.number}
        optionValue={(volume) => volume.number}
        options={volumeData}
        value={formData.volume}
      />

      {/* Issue */}
      <SelectComponent
        isError={isIssuesError}
        isLoading={isIssuesLoaing}
        label="Issue"
        name="issue"
        onChange={handleChange}
        optionMain={(issue) => issue.number}
        optionValue={(issue) => issue.number}
        options={issuesData}
        value={formData.issue}
      />

      {/* Document Upload */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Upload Document
        </label>
        <input
          type="file"
          name="document"
          onChange={handleChange}
          accept="application/pdf"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* DOI */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">DOI</label>
        <input
          type="text"
          name="doi"
          value={formData.doi}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Editor's Choice */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Editors Choice
        </label>
        <input
          type="checkbox"
          name="editorsChoice"
          checked={formData.editorsChoice}
          onChange={() =>
            setFormData({ ...formData, editorsChoice: !formData.editorsChoice })
          }
          className="mr-2 leading-tight"
        />
        <span>Mark as Editors Choice</span>
      </div>

      <button
        type="submit"
        disabled={isPending ? true : false}
        className="w-full bg-slate-700 text-white font-bold py-2 px-4 rounded-md hover:bg-slate-900 transition duration-300"
      >
        {isPending ? 'Submitting' : 'Submit'}
      </button>
    </form>
  );
}
