import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import { useFetchNewsLetters } from '../components/Tanstack'; // Adjust the import according to your file structure
import Loader from './../../UI/Loader';
import Error from './../../utils/Error';
import Modal from '../../UI/Modal';
import { useMutation } from '@tanstack/react-query';
import { deleteNewsletter, queryClient } from '../../utils/http'; // Adjust the import according to your file structure

export default function DeleteNewsletter() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [newsletterId, setNewsletterId] = useState('');
  const { newsLetterData, isnewsLetterPending, isNewsLetterError } =
    useFetchNewsLetters();

  const { mutate, isPending } = useMutation({
    mutationFn: (id) => deleteNewsletter({ newsletterId: id }), // Replace with actual API call to delete a newsletter
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['news-letter'],
      });
      toast.success('Newsletter deleted successfully', {
        autoClose: 3000,
      });
      setModalOpen(false);
    },
    onError: () => {
      toast.error('An error occurred while deleting newsletter', {
        autoClose: 3000,
      });
    },
  });

  const handleDelete = (id) => {
    setNewsletterId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    mutate(newsletterId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  let content;

  if (isnewsLetterPending) {
    content = (
      <div className="flex justify-center items-center mt-10">
        <Loader />
      </div>
    );
  } else if (isNewsLetterError) {
    content = (
      <div className="flex h-full mt-20">
        <Error title={'Error!'} text={'Error fetching newsletters'} />
      </div>
    );
  } else if (newsLetterData && newsLetterData.length > 0) {
    content = newsLetterData.map((newsletter) => (
      <ul
        key={newsletter.id} // Using unique ID for better performance
        className="flex justify-between mb-4 p-2 bg-gray-50 rounded-lg"
      >
        <div className="flex flex-col items-start gap-1">
          <li className="font-bold text-xs">Journal: {newsletter.journal}</li>
          <li className="text-xs leading-5 text-gray-700">
            <span className="font-bold">Email</span>: {newsletter.email}
          </li>
          <hr className="w-full border-t border-gray-300" />
        </div>
        <button
          onClick={() => handleDelete(newsletter.id)} // Trigger delete on click
          className="text-red-500 hover:text-red-700"
        >
          <MdDelete size={25} color="red" />
        </button>
      </ul>
    ));
  } else if (newsLetterData && newsLetterData.length === 0) {
    content = <p className="text-gray-500">{'No newsletters found'}</p>;
  }

  return (
    <div className="p-4 w-full md:w-1/2">
      <h2 className="text-slate-800 font-bold text-2xl mb-4">
        All Newsletters
      </h2>
      {content}
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onDelete={handleConfirmDelete}
          deleteText={'Yes'}
          isDeleting={'Deleting'}
          onCloseModal={handleCloseModal}
          isDisabled={isPending}
          title={'Are you sure you want to delete this newsletter?'}
          submitting={isPending}
        />
      )}
    </div>
  );
}
