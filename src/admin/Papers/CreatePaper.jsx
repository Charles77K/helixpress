import { useRef, useState } from 'react';
import {
  useFetchIssues,
  useFetchJournals,
  useFetchVolumes,
} from '../components/Tanstack';
import SelectComponent from '../components/SelectComponent';
import { useMutation } from '@tanstack/react-query';
import { createPaper } from '../../utils/http';
import { toast } from 'react-toastify';
import { Button, FormInput, SelectInput } from '../components/Inputs';

const initialForm = {
  title: '',
  author: '',
  description: '',
  institution: '',
  keywords: '',
  volume: '',
  issue: '',
  journal: '',
  abstract: '',
  document: null,
  doi: '',
  editorsChoice: false,
};
export default function CreatePaper() {
  const [journalId, setJournalId] = useState('');
  const [volumeId, setVolumeId] = useState('');
  const [issueId, setIssueId] = useState('');
  const docRef = useRef(null);

  const [formData, setFormData] = useState(initialForm);

  const { volumeData, isVolumeLoading, isVolumeError } = useFetchVolumes({
    id: journalId,
  });
  const { data, isError, isLoading } = useFetchJournals();
  const { issuesData, isIssuesError, isIssuesLoaing } = useFetchIssues({
    id: volumeId,
  });

  const resetForm = () => {
    setFormData(initialForm);
    docRef.current.value = '';
  };

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
    mutationFn: createPaper,
    onSuccess: () => {
      toast.success('created successfully');
      resetForm();
    },
    onError: (error) => {
      toast.error('failed to create');
      console.log(error);
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
      <FormInput
        label="Title"
        name="title"
        onChange={handleChange}
        type="text"
        placeholder={'Enter Title'}
        value={formData.title}
      />

      {/* Author */}
      <FormInput
        label="Author"
        name="author"
        onChange={handleChange}
        type="text"
        placeholder={'Enter author name'}
        value={formData.author}
      />

      {/* Institution */}
      <FormInput
        label="Institution"
        name="institution"
        onChange={handleChange}
        type="text"
        placeholder={'Enter the name of the institution'}
        value={formData.institution}
      />

      {/* Keywords */}
      <FormInput
        name="keywords"
        label="Keywords"
        onChange={handleChange}
        type="text"
        placeholder={'Enter a keyword'}
        value={formData.keywords}
      />
      {/* Abstract */}
      <SelectInput
        label="Abstract"
        name="abstract"
        onChange={handleChange}
        value={formData.abstract}
        rows="3"
      />

      {/* Description */}
      <SelectInput
        label="Description"
        name="description"
        onChange={handleChange}
        rows="3"
        value={formData.description}
      />
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
          ref={docRef}
          type="file"
          name="document"
          onChange={handleChange}
          accept="application/pdf"
          className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      {/* DOI */}
      <FormInput
        label="DOI"
        name="doi"
        onChange={handleChange}
        placeholder={'Enter DOI'}
        type="text"
        value={formData.doi}
      />

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
      <Button disabled={isPending}>
        {isPending ? 'Submitting' : 'Submit'}
      </Button>
    </form>
  );
}
