import { MdDelete } from 'react-icons/md';
import Error from '../../utils/Error';
import { useFetchTopics } from '../components/Tanstack';
import { useState } from 'react';
import Modal from '../../UI/Modal';
import { useMutation } from '@tanstack/react-query';
import { deleteTopic, queryClient } from '../../utils/http';
import { toast } from 'react-toastify';

export default function DeleteTopic() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [topicId, setTopicId] = useState('');
  const { topicsData, isTopicsLoading, isTopicsError } = useFetchTopics();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTopic, // API call to delete contact
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      toast.success('Topic deleted successfully', { autoClose: 3000 });
      setModalOpen(false);
    },
    onError: () => {
      toast.error('Failed to delete topic', { autoClose: 3000 });
    },
  });

  const handleDelete = (id) => {
    setTopicId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    mutate({ id: topicId });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  let content;
  console.log(topicsData);
  if (isTopicsLoading) {
    content = <p>Loading...</p>;
  } else if (isTopicsError) {
    content = <Error title="Error" text="Error fetching topics" />;
  } else if (topicsData && topicsData.length > 0) {
    content = topicsData.map((topic, index) => (
      <ul
        key={index}
        className="flex mb-4 justify-between items-center bg-slate-50 border-b border-gray-200 w-1/2 p-3 space-y-2"
      >
        <div className="flex flex-col gap-1 items-start">
          <li className="text-[15px] font-bold text-gray-900">
            Title: {topic.title}
          </li>
          <li className="text-sm text-gray-700">Author: {topic.author}</li>
          <li className="text-sm text-gray-700">Keywords: {topic.keywords}</li>
          <li className="text-sm text-gray-700">
            Deadline: {new Date(topic.manuscript_deadline).toLocaleDateString()}
          </li>
        </div>
        <button
          onClick={() => handleDelete(topic.id)}
          className="text-red-500 hover:text-red-700"
        >
          <MdDelete size={25} color="red" />
        </button>
      </ul>
    ));
  } else {
    content = <p>No topics found</p>;
  }

  return (
    <div className="w-full min-h-screen h-full bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">View Topics</h2>
      <div>{content}</div>
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onDelete={handleConfirmDelete}
          deleteText="Yes"
          isDeleting="Deleting"
          onCloseModal={handleCloseModal}
          isDisabled={isPending}
          title="Are you sure you want to delete this Topic?"
          submitting={isPending}
        />
      )}
    </div>
  );
}
