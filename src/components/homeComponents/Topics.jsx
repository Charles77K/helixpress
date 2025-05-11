import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useFetch } from '../../services/hooks';
import Error from '../../utils/Error';
import HomeTopicsSkeleton from '../LoadingSkeletons/HomeTopicsSkeleton';
import NotFound from '../NotFound';
import { cn, formatDate } from '../../utils/utils';

export default function Topics() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data,
    isLoading: isTopicsLoading,
    isError: isTopicsError,
    refetch,
    error,
  } = useFetch('/topics/');

  const topicsData = !isTopicsLoading && data?.results;

  let content;
  if (isTopicsLoading) {
    content = <HomeTopicsSkeleton />;
  } else if (isTopicsError) {
    content = (
      <Error
        text={`${error || 'Error fetching topics'}`}
        title="Error"
        onRetry={() => refetch()}
      />
    );
  } else if (topicsData && topicsData.length > 0) {
    content = topicsData.map((topic) => (
      <ul key={topic.id} className="text-xs">
        <li className="flex flex-col items-start">
          <p className="my-1">
            Topic in <span className="italic">{topic.keywords}</span>
          </p>
          <Link to={`/topics/${topic.id}`}>
            <p className="font-bold hover:underline cursor-pointer">
              {topic.title}
            </p>
          </Link>
          <p className="text-gray-500 my-1">
            Topic Author:
            <span>{' ' + topic.author}</span>
          </p>
          <p className="text-red-500">Deadline: {formatDate(topic.deadline)}</p>
        </li>
        <hr className="my-3" />
      </ul>
    ));
  } else {
    content = <NotFound label="Topics" />;
  }

  return (
    <div className="bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold my-2">Topics</h2>
        <button
          className="md:hidden text-slate-600 hover:underline"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Hide topics' : 'Show topics'}
        >
          {isOpen ? <IoIosArrowUp size={23} /> : <IoIosArrowDown size={23} />}
        </button>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'block' : 'hidden'
        } md:block`}
      >
        {content}
      </div>
      <Link to="/topics">
        <p
          className={cn(
            'text-slate-500 hover:underline hover:cursor-pointer text-xs font-bold my-3',
            isOpen ? 'block' : 'hidden md:block'
          )}
        >
          More Topics...
        </p>
      </Link>
    </div>
  );
}
