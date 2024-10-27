// import React from 'react';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import { useFetchSlider } from '../components/Tanstack';
import Loader from './../../UI/Loader';
import Error from './../../utils/Error';
import Modal from '../../UI/Modal';
import { useMutation } from '@tanstack/react-query';
import { deleteSlider, queryClient } from '../../utils/http';

export default function DeleteSlider() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [sliderId, setSliderId] = useState('');
  const { sliderData, isSliderError, isSliderLoading } = useFetchSlider();

  const { mutate, isPending } = useMutation({
    mutationFn: (id) => deleteSlider({ sliderId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sliders'],
      });
      toast.success('Slider deleted successfully', {
        autoClose: 3000,
      });
      setModalOpen(false);
    },
    onError: () => {
      toast.error('An error occurred while deleting slider', {
        autoClose: 3000,
      });
    },
  });

  const handleDelete = (id) => {
    setSliderId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    mutate(sliderId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  let content;
  if (isSliderLoading) {
    content = (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  } else if (isSliderError) {
    content = (
      <div className="flex justify-center items-center">
        <Error title={'Error!'} text={'Error fetching sliders'} />
      </div>
    );
  } else if (sliderData && sliderData.length > 0) {
    content = sliderData.map((slider, index) => (
      <ul
        key={index}
        className="flex justify-between items-center mb-4 p-2 bg-gray-50 rounded-lg"
      >
        <div className="flex flex-col items-start gap-1">
          <li className="font-bold text-sm">Title: {slider.title}</li>
          <li className="text-xs leading-5 text-gray-700 mb-1">
            <span className="font-bold">Body</span>: {slider.body}
          </li>
          <li className="text-xs leading-5 text-gray-700 mb-1">
            <span className="font-bold">Date</span>:{' '}
            {new Date(slider.date_created).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </li>
          <hr className="w-full border-t border-gray-300" />
        </div>
        <>
          <button
            onClick={() => handleDelete(slider.id)}
            className="text-red-500 hover:text-red-700"
          >
            <MdDelete size={25} color="red" />
          </button>
        </>
      </ul>
    ));
  } else if (sliderData && !sliderData.length > 0) {
    content = <p className="text-gray-500">{'no slider found'}</p>;
  }
  return (
    <div className="p-4 w-full md:w-1/2">
      <h2 className="text-slate-800 font-bold text-2xl mb-4">
        All Home-Slider
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
          title={'Are you sure you want to delete this slider?'}
          submitting={isPending}
        />
      )}
    </div>
  );
}
