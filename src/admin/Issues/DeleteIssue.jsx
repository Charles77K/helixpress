import { useState } from 'react';
import {
  useFetchIssues,
  useFetchJournals,
  useFetchVolumes,
} from '../components/Tanstack';
import SelectComponent from '../components/SelectComponent';
import { MdDelete } from 'react-icons/md';
import { useMutation } from '@tanstack/react-query';
import { deleteIssue, queryClient } from '../../utils/http';
import { toast } from 'react-toastify';
import Modal from '../../UI/Modal';

export default function DeleteIssue() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [journalId, setJournalId] = useState('');
  const [jounalName, setJournalName] = useState('');
  const [volumeName, setVolumeName] = useState('');
  const [volumeId, setVolumeId] = useState('');
  const [formData, setFormData] = useState({
    volume: '',
    journal: '',
  });

  const { data, isError, isLoading } = useFetchJournals();
  const { isVolumeError, isVolumeLoading, volumeData } = useFetchVolumes({
    id: journalId,
  });
  const { issuesData, isIssuesError, isIssuesLoaing } = useFetchIssues({
    id: volumeId,
  });
  console.log(issuesData);

  //change the volume
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'journal') {
      const selectedJournal = data.find((journal) => journal.name === value);
      console.log(selectedJournal.id);
      if (selectedJournal) {
        setJournalName(selectedJournal.name);
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

  const { mutate } = useMutation({
    mutationFn: ({ issueId }) => deleteIssue({ issueId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['issues'],
      });
      toast.success('issue deleted successfully', {
        autoClose: 3000,
      });
      setModalOpen(false);
      setIsSubmitting(false);
    },
    onError: () => {
      toast.error('An error occurred while deleting issue', {
        autoClose: 3000,
      });
      setIsSubmitting(false);
    },
  });

  const handleDelete = (id) => {
    setSelectedItem(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsSubmitting(true);
    mutate({ issueId: selectedItem });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  //change the volume
  const handleVolumeChange = (e) => {
    const { name, value } = e.target;
    if (name === 'volume') {
      const selectedVolumes = volumeData.find(
        (volumes) => volumes.number == value
      );
      console.log(selectedVolumes.id);
      if (selectedVolumes) {
        setVolumeName(selectedVolumes.number);
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

  let content;

  if (isIssuesLoaing) {
    content = <p className="text-center text-gray-500">Loading...</p>;
  } else if (isIssuesError) {
    content = (
      <p className="text-center text-red-500">Error loading journals.</p>
    );
  } else if (issuesData && issuesData.length > 0) {
    content = issuesData.map((issue, index) => (
      <ul key={index} className="border-b border-gray-200 p-4">
        <li className="flex justify-between text-slate-700">
          <p className="text-sm font-bold">
            {(formData.volume && issue.number) ||
              'chooose a volume to see the issues'}
          </p>
          <button
            onClick={() => handleDelete(issue.id)}
            className="text-red-500 hover:text-red-700"
          >
            <MdDelete size={25} color="red" />
          </button>
        </li>
      </ul>
    ));
  } else if (issuesData && !issuesData.length > 0) {
    content = (
      <p className="text-gray-500">{formData.volume && 'issues found'}</p>
    );
  }

  return (
    <div className=" flex flex-col gap-4 w-full h-screen mx-auto bg-white shadow-md p-6 rounded-lg justify-items-center">
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

      <div>
        {formData.volume && (
          <h2 className="font-semibold text-sm">
            Issues for volume
            <span className="text-bold text-[15px]"> {volumeName}</span> in{' '}
            {jounalName}
          </h2>
        )}
      </div>
      {content}
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onDelete={handleConfirmDelete}
          deleteText={'Yes'}
          isDeleting={'Deleting'}
          onCloseModal={handleCloseModal}
          isDisabled={isSubmitting}
          title={'Are you sure you want to delete this volume?'}
          submitting={isSubmitting}
        />
      )}
    </div>
  );
}
