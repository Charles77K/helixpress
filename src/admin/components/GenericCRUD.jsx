// GenericCRUD.js
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { MdDelete } from 'react-icons/md';
import Modal from '../../UI/Modal';
import Loader from '../../UI/Loader';
import PropTypes from 'prop-types';
import { queryClient } from '../../utils/http';

const GenericCRUD = ({ getJournals, getItems, deleteItem, entityLabel }) => {
  const [selectedJournal, setSelectedJournal] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [JournalName, setJournalName] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Query to fetch journals
  const {
    data: journals,
    isLoading: isJournalsLoading,
    isError: isJournalsError,
  } = useQuery({
    queryKey: ['journals'],
    queryFn: getJournals,
  });

  // Query to fetch volumes based on selected journal
  const {
    data: items,
    isLoading: isItemsLoading,
    isError: isItemsError,
  } = useQuery({
    queryKey: ['volumes', selectedJournal],
    queryFn: ({ signal }) => getItems({ journalId: selectedJournal, signal }),
    enabled: !!selectedJournal, // Only fetch items if a journal is selected
  });

  const { mutate } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['volumes'],
      });
      toast.success(`${entityLabel} deleted successfully`, {
        autoClose: 3000,
      });
      setModalOpen(false);
      setIsSubmitting(false);
    },
    onError: () => {
      toast.error(`An error occurred while deleting ${entityLabel}`, {
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
    mutate({ volumeId: selectedItem });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  //handle change journals
  const handleChange = (e) => {
    const selectedJournalId = e.target.value;
    setSelectedJournal(selectedJournalId);

    let select = journals.find((journal) => journal.id === selectedJournalId);
    setJournalName(select.name ? select.name : 'Selected Journal');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        Delete a Volume
      </h2>

      <label htmlFor="journals" className="block text-lg font-bold mb-2">
        Select a Journal
      </label>
      <select
        id="journals"
        className="block w-full sm:w-1/2 p-3 bg-gray-100 border border-gray-300 rounded"
        value={selectedJournal}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select Journal
        </option>
        {isJournalsLoading && <option value={'loading'}>Loading....</option>}
        {isJournalsError && (
          <option value={'error'}>
            Error fetching journals: {isJournalsError.message}
          </option>
        )}
        {journals?.map((journal) => (
          <option key={journal.id} value={journal.id}>
            {journal.name}
          </option>
        ))}
      </select>

      <div className="mt-6">
        {items && (
          <p className="font-semibold my-2">
            {entityLabel} for {JournalName}
          </p>
        )}
        {isItemsLoading && <Loader />}
        {isItemsError && (
          <div className="text-red-500">Error fetching {entityLabel}</div>
        )}
        {items?.length === 0 && selectedJournal && (
          <div className="text-gray-500">
            No volumes available for this journal.
          </div>
        )}
        {items && (
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between w-full sm:w-1/2 volume-item p-3 bg-gray-50 border border-gray-300 rounded text-sm"
              >
                <span>Volume {item.number}</span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <MdDelete size={25} color="red" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onDelete={handleConfirmDelete}
          deleteText={'Yes'}
          isDeleting={'Deleting'}
          onCloseModal={handleCloseModal}
          isDisabled={isSubmitting}
          title={`Are you sure you want to delete this ${entityLabel}?`}
          submitting={isSubmitting}
        />
      )}
    </div>
  );
};

GenericCRUD.propTypes = {
  getJournals: PropTypes.func.isRequired, // Function to fetch journals
  getItems: PropTypes.func.isRequired, // Function to fetch items (volumes)
  deleteItem: PropTypes.func.isRequired, // Function to delete an item
  entityLabel: PropTypes.string.isRequired, // Label for the entity being managed
};

export default GenericCRUD;
