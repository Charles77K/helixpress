import { useEffect, useRef, useState } from 'react';
import {
  useFetchIssues,
  useFetchJournals,
  useFetchPapers,
  useFetchVolumes,
} from '../components/Tanstack';
import SelectComponent from '../components/SelectComponent';
import { useMutation } from '@tanstack/react-query';
import { editPaper } from '../../utils/http'; // Adjust this to the function for updating
import { toast } from 'react-toastify';

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
  date_created: '',
};

export default function EditPaper() {
  const [journalId, setJournalId] = useState('');
  const [volumeId, setVolumeId] = useState('');
  const [issueId, setIssueId] = useState('');
  const [selectedPaper, setSelectedPaper] = useState(''); // State to store selected paper ID
  const [formData, setFormData] = useState(initialForm);
  const docRef = useRef(null);

  const { volumeData, isVolumeLoading, isVolumeError } = useFetchVolumes({
    id: journalId,
  });
  const { data, isError, isLoading } = useFetchJournals();
  const { issuesData, isIssuesError, isIssuesLoading } = useFetchIssues({
    id: volumeId,
  });
  const { paper, isPaperLoading, isPaperError } = useFetchPapers({
    id: issueId,
  });

  const resetForm = () => {
    setFormData(initialForm);
    docRef.current.value = '';
    setSelectedPaper('');
  };

  // Prefill form data if paper is available
  useEffect(() => {
    if (selectedPaper) {
      setFormData({
        title: selectedPaper.title || '',
        author: selectedPaper.author || '',
        description: selectedPaper.description || '',
        institution: selectedPaper.institution || '',
        keywords: selectedPaper.keywords || '',
        volume: selectedPaper.volume || '',
        issue: selectedPaper.issue || '',
        journal: selectedPaper.journal || '',
        abstract: selectedPaper.abstract || '',
        doi: selectedPaper.doi || '',
        editorsChoice: selectedPaper.editorsChoice || false,
        document: null,
        date_created: selectedPaper.date_created || '',
      });
    }
  }, [selectedPaper]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });

    if (name === 'journal') {
      const selectedJournal = data?.find((journal) => journal.name === value);
      if (selectedJournal) {
        setJournalId(selectedJournal.id);
      }
      setFormData((prevState) => ({
        ...prevState,
        volume: '',
        issue: '',
      }));
      setSelectedPaper('');
    }
    // setVolumeId('');
    // setIssueId('');

    if (name === 'volume') {
      const selectedVolume = volumeData?.find(
        (volume) => volume.number == value
      );
      if (selectedVolume) {
        setVolumeId(selectedVolume.id);
      }
      setFormData((prevState) => ({
        ...prevState,
        issue: '',
      }));
      // setIssueId('');
    }

    if (name === 'issue') {
      const selectedIssue = issuesData?.find((issue) => issue.number == value);
      if (selectedIssue) {
        setIssueId(selectedIssue.id);
      }
    }
  };

  const handlePaperChange = (e) => {
    const paperId = e.target.value;
    const papers = paper.find((paper) => paper.id == paperId);
    setSelectedPaper(papers);
  };

  // Mutation for updating the paper
  const { mutate, isPending } = useMutation({
    mutationKey: ['update-paper'],
    mutationFn: ({ paperId, paperData }) => editPaper({ paperId, paperData }), // Adjust to use your API
    onSuccess: () => {
      toast.success('Paper updated successfully');
      resetForm();
    },
    onError: (error) => {
      toast.error('Failed to update', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedForm = new FormData();
    Object.keys(formData).forEach((key) =>
      updatedForm.append(key, formData[key])
    );

    mutate({ paperId: selectedPaper.id, paperData: updatedForm });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-h-screen mx-auto bg-white shadow-md p-6 rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Edit Paper</h2>

      {isPaperLoading && <p>Loading paper data...</p>}
      {isPaperError && <p>Error loading paper data</p>}

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
        isLoading={isIssuesLoading}
        label="Issue"
        name="issue"
        onChange={handleChange}
        optionMain={(issue) => issue.number}
        optionValue={(issue) => issue.number}
        options={issuesData}
        value={formData.issue}
      />
      {/* Paper */}
      <SelectComponent
        isError={isPaperError}
        isLoading={isPaperLoading}
        label="Paper"
        name="paper"
        onChange={handlePaperChange}
        optionMain={(paper) => paper.title}
        optionValue={(paper) => paper.id}
        options={paper}
        value={selectedPaper ? selectedPaper.id : ''}
      />

      {selectedPaper && (
        <>
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
            <label className="block text-gray-700 font-bold mb-2">
              Keywords
            </label>
            <input
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Abstarct */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Abstract
            </label>
            <input
              type="text"
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Document Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Upload Document (leave empty to keep existing)
            </label>
            <input
              ref={docRef}
              type="file"
              name="document"
              onChange={handleChange}
              accept="application/pdf"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Editors Choice */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Editors Choice
            </label>
            <input
              type="checkbox"
              name="editorsChoice"
              checked={formData.editorsChoice}
              onChange={() =>
                setFormData({
                  ...formData,
                  editorsChoice: !formData.editorsChoice,
                })
              }
              className="mr-2 leading-tight"
            />
            <span>Mark as Editors Choice</span>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-slate-700 text-white font-bold py-2 px-4 rounded-md hover:bg-slate-900 transition duration-300"
          >
            {isPending ? 'Updating...' : 'Update'}
          </button>
        </>
      )}
    </form>
  );
}
