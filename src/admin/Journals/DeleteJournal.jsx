// import React from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteJournal, getJournals, queryClient } from '../../utils/http';

import { MdDelete } from 'react-icons/md';
import { useState } from 'react';
import Modal from '../../UI/Modal';
import { toast } from 'react-toastify';

export default function DeleteJournal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [journalId, setJournalId] = useState('');

  console.log(journalId);

  const { mutate } = useMutation({
    mutationFn: ({ id }) => deleteJournal({ id }), // Pass the ID to the function
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] });
      toast.success('Journal deleted successfully', { autoClose: 3000 });
      setIsSubmitting(false);
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(`Delete failed: ${error.message}`);
      setIsSubmitting(false);
      setIsOpen(false);
    },
  });

  const handleShowModal = (id) => {
    setIsOpen(true);
    setJournalId(id);
  };

  const handleDelete = () => {
    setIsSubmitting(true);
    mutate({ id: journalId });
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['journals'],
    queryFn: getJournals,
  });

  let content;

  if (isLoading) {
    content = <p className="text-center text-gray-500">Loading...</p>;
  } else if (error) {
    content = (
      <p className="text-center text-red-500">Error loading journals.</p>
    );
  } else if (data) {
    content = data.map((journal, index) => (
      <ul key={index} className="border-b border-gray-200 p-4">
        <li className="flex justify-between text-slate-700">
          <section className="flex flex-col gap-3">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-bold text-gray-800">
                {index + 1}.
              </span>
              <p className="text-sm font-bold">{journal.name || 'N/A'}</p>
            </div>
            <div className="text-xs text-gray-500 space-y-2 leading-5">
              <p>{journal.aim_scope || 'No description available.'}</p>
              <p>{journal.abbrv || 'No abbreviation available.'}</p>
            </div>
          </section>
          <section
            className="cursor-pointer"
            onClick={() => handleShowModal(journal.id)}
          >
            <div className="group relative">
              <MdDelete size={28} color="red" />
              <p className="hidden absolute bottom-7 right-4 group-hover:block bg-slate-600 text-white text-xs p-1">
                delete
              </p>
            </div>
          </section>
        </li>
      </ul>
    ));
  }

  return (
    <div className="bg-white h-full w-full p-4">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Journals
      </h2>
      <div>{content}</div>
      {isOpen && (
        <Modal
          deleteText={'Yes'}
          isDeleting={'Deleting'}
          isDisabled={isSubmitting}
          onClose={() => setIsOpen(false)}
          onCloseModal={() => setIsOpen(false)}
          onDelete={handleDelete}
          submitting={isSubmitting}
          title={'Are you sure you want to delete this journal?'}
        />
      )}
    </div>
  );
}
