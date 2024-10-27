import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import Loader from './../../UI/Loader';
import Error from './../../utils/Error';
import Modal from '../../UI/Modal';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../utils/http'; // Adjust import for deleteContact API call
import PropTypes from 'prop-types';

export default function GenericDelete({
  isData,
  isLoading,
  isError,
  label,
  QueryKey,
  mutateFn,
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: mutateFn, // API call to delete contact
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey] });
      toast.success(`${label} deleted successfully`, { autoClose: 3000 });
      setModalOpen(false);
    },
    onError: () => {
      toast.error(`Failed to delete ${label}`, { autoClose: 3000 });
    },
  });

  const handleDelete = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    mutate({ id: selectedId });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <Error title="Error" text="Error fetching contacts" />;
  } else if (isData && isData.length > 0) {
    content = isData.map((data) => (
      <ul
        key={data.id}
        className="flex justify-between mb-4 p-2 bg-gray-50 rounded-lg"
      >
        <div className="flex flex-col items-start gap-1">
          <li className="text-sm leading-5 text-gray-700">
            Content: {data.content}
          </li>
        </div>
        <button
          onClick={() => handleDelete(data.id)}
          className="text-red-500 hover:text-red-700"
        >
          <MdDelete size={25} color="red" />
        </button>
      </ul>
    ));
  } else {
    content = <p>No {label} found</p>;
  }

  return (
    <div className="p-4 w-full md:w-1/2">
      <h2 className="text-slate-800 font-bold text-2xl mb-4">Delete {label}</h2>
      {content}
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onDelete={handleConfirmDelete}
          deleteText="Yes"
          isDeleting="Deleting"
          onCloseModal={handleCloseModal}
          isDisabled={isPending}
          title={`Are you sure you want to delete this ${label}?`}
          submitting={isPending}
        />
      )}
    </div>
  );
}

GenericDelete.propTypes = {
  isData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  QueryKey: PropTypes.string.isRequired,
  mutateFn: PropTypes.func.isRequired,
};
