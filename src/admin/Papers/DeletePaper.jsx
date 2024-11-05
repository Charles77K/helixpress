import { useState } from 'react';
import {
  useFetchIssues,
  useFetchJournals,
  useFetchPapers,
  useFetchVolumes,
} from '../components/Tanstack';
import SelectComponent from '../components/SelectComponent';
import Loader from '../../UI/Loader';
import Error from '../../utils/Error';
import { MdDelete } from 'react-icons/md';
import { useMutation } from '@tanstack/react-query';
import { deletePaper, queryClient } from '../../utils/http';
import { toast } from 'react-toastify';
import Modal from '../../UI/Modal';

export default function DeletePaper() {
  const [journalId, setJournalId] = useState();
  const [volumeId, setVolumeId] = useState();
  const [issueId, setIssueId] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  //   const [paperId, setPaperId] = useState();

  const [formData, setFormData] = useState({
    volume: '',
    issue: '',
    journal: '',
  });

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

  const { mutate } = useMutation({
    mutationFn: ({ paperId }) => deletePaper({ paperId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['papers'],
      });
      toast.success('Paper deleted successfully', {
        autoClose: 3000,
      });
      setModalOpen(false);
      setIsSubmitting(false);
    },
    onError: () => {
      toast.error('An error occurred while deleting paper', {
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
    mutate({ paperId: selectedItem });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'journal') {
      const selectedJournal = data?.find((journal) => journal.name === value);
      if (selectedJournal) {
        setJournalId(selectedJournal.id);
        setFormData({
          ...formData,
          volume: '',
          issue: '',
        });
        setIssueId('');
        setVolumeId('');
      }
    }

    if (name === 'volume') {
      const selectedVolume = volumeData?.find(
        (volume) => volume.number == value
      );
      if (selectedVolume) {
        setVolumeId(selectedVolume.id);
        setFormData({
          ...formData,
          issue: '',
        });
      }
    }

    if (name === 'issue') {
      const selectedIssue = issuesData?.find((issue) => issue.number == value);
      if (selectedIssue) {
        setIssueId(selectedIssue.id);
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  let content;

  if (isPaperLoading) {
    content = (
      <div>
        <Loader />
      </div>
    );
  } else if (isPaperError) {
    content = (
      <div>
        <Error
          title={'Error'}
          text={'Error fetching papers! please try again later'}
        />
      </div>
    );
  } else if (paper && paper.length > 0) {
    content = (
      <>
        {paper.map((paper, index) => (
          <ul key={index} className="border-b border-gray-200 p-3 space-y-2">
            <>
              <li className="text-xl font-bold text-gray-900">
                Title: {paper.title}
              </li>
              <li className="text-sm text-gray-700">Author: {paper.author}</li>
              <li className="text-sm text-gray-700">
                Institution: {paper.institution}
              </li>
            </>
            <>
              <button
                onClick={() => handleDelete(paper.id)}
                className="text-red-500 hover:text-red-700"
              >
                <MdDelete size={25} color="red" />
              </button>
            </>
          </ul>
        ))}
      </>
    );
  } else if (paper && !paper.length > 0) {
    content = <p>No paper found</p>;
  }

  return (
    <div className="w-full h-full mx-auto bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Delete a Paper</h2>
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
      <div>{content}</div>
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onDelete={handleConfirmDelete}
          deleteText={'Yes'}
          isDeleting={'Deleting'}
          onCloseModal={handleCloseModal}
          isDisabled={isSubmitting}
          title={'Are you sure you want to delete this paper?'}
          submitting={isSubmitting}
        />
      )}
    </div>
  );
}
