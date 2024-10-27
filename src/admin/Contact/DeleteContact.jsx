import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import { useFetchContacts } from '../components/Tanstack'; // Adjust according to your file structure
import Loader from './../../UI/Loader';
import Error from './../../utils/Error';
import Modal from '../../UI/Modal';
import { useMutation } from '@tanstack/react-query';
import { deleteContact, queryClient } from '../../utils/http'; // Adjust import for deleteContact API call

export default function DeleteContact() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [contactId, setContactId] = useState('');
  const { contactsData, isContactPending, isContactError } = useFetchContacts();

  const { mutate, isPending } = useMutation({
    mutationFn: (id) => deleteContact({ contactId: id }), // API call to delete contact
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact deleted successfully', { autoClose: 3000 });
      setModalOpen(false);
    },
    onError: () => {
      toast.error('Failed to delete contact', { autoClose: 3000 });
    },
  });

  const handleDelete = (id) => {
    setContactId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    mutate(contactId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  let content;

  if (isContactPending) {
    content = <Loader />;
  } else if (isContactError) {
    content = <Error title="Error" text="Error fetching contacts" />;
  } else if (contactsData && contactsData.length > 0) {
    content = contactsData.map((contact) => (
      <ul
        key={contact.id}
        className="flex justify-between mb-4 p-2 bg-gray-50 rounded-lg"
      >
        <div className="flex flex-col items-start gap-1">
          <li className="font-bold text-xs">Title: {contact.title}</li>
          <li className="text-xs leading-5 text-gray-700">
            Content: {contact.content}
          </li>
        </div>
        <button
          onClick={() => handleDelete(contact.id)}
          className="text-red-500 hover:text-red-700"
        >
          <MdDelete size={25} color="red" />
        </button>
      </ul>
    ));
  } else {
    content = <p>No contacts found</p>;
  }

  return (
    <div className="p-4 w-full md:w-1/2">
      <h2 className="text-slate-800 font-bold text-2xl mb-4">All Contacts</h2>
      {content}
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onDelete={handleConfirmDelete}
          deleteText="Yes"
          isDeleting="Deleting"
          onCloseModal={handleCloseModal}
          isDisabled={isPending}
          title="Are you sure you want to delete this contact?"
          submitting={isPending}
        />
      )}
    </div>
  );
}
