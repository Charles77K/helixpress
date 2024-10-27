import { useState } from 'react';
import {
  useFetchIssues,
  useFetchJournals,
  useFetchVolumes,
} from '../components/Tanstack';
import SelectComponent from '../components/SelectComponent';
import { useMutation } from '@tanstack/react-query';
import { editIssues, queryClient } from '../../utils/http';
import { toast } from 'react-toastify';

export default function EditIssues() {
  const [formData, setFormData] = useState({ number: '' });
  const [journalId, setJournalId] = useState('');
  const [journalName, setJournalName] = useState('');
  const [volumeName, setVolumeName] = useState('');
  const [volumeId, setVolumeId] = useState('');
  const [issueId, setIssueId] = useState('');
  const [issueNum, setIssueNum] = useState('');

  //fetch journals
  const {
    data: journalsData,
    isError: isJournalError,
    isLoading: isJournalLoading,
  } = useFetchJournals();

  //fetch volumes
  const { isVolumeError, isVolumeLoading, volumeData } = useFetchVolumes({
    id: journalId,
  });
  //fetch issues
  const { issuesData, isIssuesError, isIssuesLoading } = useFetchIssues({
    id: volumeId,
  });

  //the mutate function that sends the data to the backend
  const mutation = useMutation({
    mutationFn: ({ issueId, issuesData }) =>
      editIssues({ issueId, issuesData }),
    onError: (error) => {
      toast.error('Error editing issues:' + ' ' + error, {
        autoClose: 3000,
      });
      // Provide feedback to the user
      alert('Failed to edit issue. Please try again.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['issues']);
      // Clear all input fields
      resetForm();
      toast.success('Issues edited successfully', {
        autoClose: 3000,
      });
    },
  });

  //to reset the volume
  const resetForm = () => {
    setJournalId('');
    setJournalName('');
    setVolumeName('');
    setVolumeId('');
    setIssueId('');
    setIssueNum('');
    setFormData({ number: '' });
  };

  //submit the form data
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ issueId, issuesData: formData });
  };

  //select a new journal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'journal') {
      setVolumeName('');
      setVolumeId('');
      setIssueNum('');
      setIssueId('');
      const selectedJournal = journalsData?.find(
        (journal) => journal.name === value
      );
      if (selectedJournal) {
        setJournalName(selectedJournal.name);
        setJournalId(selectedJournal.id);
      }
    }
  };

  //select a new volume
  const handleVolumeChange = (e) => {
    setIssueNum('');
    setIssueId('');
    const { name, value } = e.target;
    if (name === 'volume') {
      const selectedVolume = volumeData?.find(
        (volume) => volume.number == value
      );
      if (selectedVolume) {
        setVolumeName(selectedVolume.number);
        setVolumeId(selectedVolume.id);
      }
    }
  };

  //select a new issue
  const handleIssueChange = (e) => {
    const { name, value } = e.target;
    if (name === 'issue') {
      const selectedIssue = issuesData?.find((issue) => issue.number == value);
      if (selectedIssue) {
        setFormData({ number: selectedIssue.number });
        setIssueNum(
          selectedIssue.number
            ? selectedIssue.number
            : 'no issues found for this volume'
        );
        setIssueId(selectedIssue.id);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-screen mx-auto bg-white shadow-md p-6 rounded-lg justify-items-center">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Edit Issue</h2>

      {/* Journals */}
      <SelectComponent
        name="journal"
        isError={isJournalError}
        isLoading={isJournalLoading}
        options={journalsData}
        label="Journals"
        onChange={handleChange}
        value={journalName}
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
        value={volumeName}
        optionValue={(volume) => volume.number}
        optionMain={(volume) => volume.number}
      />

      {/* Display Issues only when issuesData is available */}
      {issuesData && (
        <SelectComponent
          name="issue"
          isError={isIssuesError}
          isLoading={isIssuesLoading}
          options={issuesData}
          label="Issues"
          onChange={handleIssueChange}
          value={issueNum ? issueNum : 'Select an issue'} // Placeholder selected by default
          optionValue={(issue) => issue.number}
          optionMain={(issue) => issue.number}
        />
      )}

      {/* Conditionally render the form if an issue is selected */}
      {issueId && (
        <form className="mt-4" onSubmit={handleSubmit}>
          <label className="block text-gray-700 font-bold mb-2">
            Edit Issue {issueNum}
          </label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Enter new issue number"
          />
          <button type="submit" className="btn-primary mt-4">
            Submit
          </button>
        </form>
      )}

      {/* Display error if mutation fails */}
      {mutation.isError && toast.error('failed to edit issues')}

      {/* Success message */}
      {mutation.isSuccess && toast.success('Issues edited successfully')}
    </div>
  );
}
