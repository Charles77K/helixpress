// import React from 'react';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import { useFetchSubmissions } from '../components/Tanstack'; // Adjust the import according to your file structure
import Loader from './../../UI/Loader';
import Error from './../../utils/Error';
import Modal from '../../UI/Modal';
import { useMutation } from '@tanstack/react-query';
import { deleteSubmission, queryClient } from '../../utils/http'; // Adjust the import according to your file structure

export default function DeleteSubmission() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const { submissionData, isSubPending, isSubError } = useFetchSubmissions();

  const { mutate, isPending } = useMutation({
    mutationFn: (id) => deleteSubmission({ submissionId: id }), // Replace with actual API call to delete a submission
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['submissions'],
      });
      toast.success('Submission deleted successfully', {
        autoClose: 3000,
      });
      setModalOpen(false);
    },
    onError: () => {
      toast.error('An error occurred while deleting submission', {
        autoClose: 3000,
      });
    },
  });

  const handleDelete = (id) => {
    setSubmissionId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    mutate(submissionId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  let content;

  if (isSubPending) {
    content = (
      <div className="flex justify-center items-center mt-10">
        <Loader />
      </div>
    );
  } else if (isSubError) {
    content = (
      <div className="flex h-full mt-20">
        <Error title={'Error!'} text={'Error fetching submissions'} />
      </div>
    );
  } else if (submissionData && submissionData.length > 0) {
    content = submissionData.map((submission) => (
      <ul
        key={submission.id} // Using unique ID for better performance
        className="flex justify-between mb-4 p-2 bg-gray-50 rounded-lg"
      >
        <div className="flex flex-col items-start gap-1">
          <li className="font-bold text-xs">
            First Name: {submission.firstname}
          </li>
          <li className="font-bold text-xs">
            Last Name: {submission.lastname}
          </li>
          <li className="text-xs leading-5 text-gray-700">
            <span className="font-bold">Email</span>: {submission.email}
          </li>
          <li className="text-xs leading-5 text-gray-700">
            <span className="font-bold">Country</span>: {submission.country}
          </li>
          <li className="text-xs leading-5 text-gray-700">
            <span className="font-bold">Date Submitted</span>:{' '}
            {new Date(submission.date_submitted).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </li>
          <hr className="w-full border-t border-gray-300" />
        </div>
        <button
          onClick={() => handleDelete(submission.id)} // Trigger delete on click
          className="text-red-500 hover:text-red-700"
        >
          <MdDelete size={25} color="red" />
        </button>
      </ul>
    ));
  } else if (submissionData && submissionData.length === 0) {
    content = <p className="text-gray-500">{'No submissions found'}</p>;
  }

  return (
    <div className="p-4 w-full md:w-1/2">
      <h2 className="text-slate-800 font-bold text-2xl mb-4">
        All Submissions
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
          title={'Are you sure you want to delete this submission?'}
          submitting={isPending}
        />
      )}
    </div>
  );
}
