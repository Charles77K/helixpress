// import React from 'react';
import { useFetchNews } from '../components/Tanstack';
import { useMutation } from '@tanstack/react-query';
import { deleteNews, queryClient } from '../../utils/http';
import Loader from '../../UI/Loader';
import Error from '../../utils/Error';
import { MdDelete } from 'react-icons/md';
import Modal from '../../UI/Modal';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function DeleteNews() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [newsId, setNewsId] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: (id) => deleteNews({ newsId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['news'],
      });
      toast.success('News deleted successfully', {
        autoClose: 3000,
      });
      setModalOpen(false);
    },
    onError: () => {
      toast.error('An error occurred while deleting news', {
        autoClose: 3000,
      });
    },
  });

  const handleDelete = (id) => {
    setNewsId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    mutate(newsId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const { newsData, isNewsError, isNewsLoading } = useFetchNews();

  let content;
  if (isNewsLoading) {
    content = <Loader />;
  } else if (isNewsError) {
    content = <Error title={'Error!'} text={'Error fetching news'} />;
  } else if (newsData && newsData.length > 0) {
    content = newsData.map((news, index) => (
      <ul
        key={index}
        className="flex justify-between items-center mb-4 p-2 bg-gray-50 rounded-lg"
      >
        <div className="flex flex-col items-start gap-1">
          <li className="font-bold text-sm mb-1">Title: {news.title}</li>
          <li className="text-xs leading-5 text-gray-700 mb-1">
            <span className="font-bold">Body</span>: {news.body}
          </li>
          <li className="text-xs leading-5 text-gray-700 mb-1">
            <span className="font-bold">Date</span>:{' '}
            {new Date(news.date_created).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </li>
          <hr className="w-full border-t border-gray-300" />
        </div>
        <>
          <button
            onClick={() => handleDelete(news.id)}
            className="text-red-500 hover:text-red-700"
          >
            <MdDelete size={25} color="red" />
          </button>
        </>
      </ul>
    ));
  } else if (newsData && !newsData.length > 0) {
    content = <p className="text-gray-500">{'no issues found'}</p>;
  }

  return (
    <div className="p-4 w-full md:w-1/2">
      <h2 className="text-slate-800 font-bold text-2xl mb-4">All News</h2>
      {content}
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onDelete={handleConfirmDelete}
          deleteText={'Yes'}
          isDeleting={'Deleting'}
          onCloseModal={handleCloseModal}
          isDisabled={isPending}
          title={'Are you sure you want to delete this news?'}
          submitting={isPending}
        />
      )}
    </div>
  );
}
