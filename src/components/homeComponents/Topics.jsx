import { useState } from 'react';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useFetchTopics } from '../../admin/components/Tanstack';
import Error from '../../utils/Error';
import { Link } from 'react-router-dom';

export default function Topics() {
  const [isOpen, setIsOpen] = useState(false);
  const { topicsData, isTopicsLoading, isTopicsError } = useFetchTopics();

  let content;
  if (isTopicsLoading) {
    content = (
      <div className="animate-pulse space-y-3">
        {/* Repeat this structure for each skeleton item */}
        {[...Array(3)].map((_, index) => (
          <ul key={index} className="text-xs space-y-2">
            <li className="flex flex-col items-start">
              <p className="bg-gray-300 h-4 w-32 rounded my-1"></p>
              <p className="bg-gray-300 h-5 w-48 rounded font-bold my-1"></p>
              <p className="bg-gray-300 h-4 w-64 rounded my-1"></p>
              <p className="bg-gray-300 h-4 w-32 rounded text-red-500 my-1"></p>
            </li>
            <hr className="my-3" />
          </ul>
        ))}
      </div>
    );
  } else if (isTopicsError) {
    content = (
      <div className="flex justify-center">
        <Error text="Error fetching papers" title="Error!!" />
      </div>
    );
  } else if (topicsData && topicsData.length > 0) {
    content = topicsData.map((item, index) => (
      <ul key={index} className="text-xs">
        <li className="flex flex-col items-start">
          <p className="my-1 ">
            Topic in <span className="italic">{item.keywords}</span>
          </p>
          <Link to={`/topics/${item.id}`}>
            <p className="font-bold	hover:underline cursor-pointer">
              {item.title}
            </p>
          </Link>
          <p className="text-gray-500 my-1">
            Topic Author:
            <span>{' ' + item.author}</span>
          </p>
          <p className="text-red-500">
            Deadline:
            {' ' +
              new Date(item.manuscript_deadline).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
          </p>
        </li>
        <hr className="my-3"></hr>
      </ul>
    ));
  }

  return (
    <div className="bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold my-2">Topics</h2>
        <button
          className="md:hidden text-slate-600 hover:underline"
          onClick={() => setIsOpen(!isOpen)}
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
      <Link to={'/topics'}>
        <p className="hidden md:block text-slate-500 hover:underline hover:cursor-pointer text-xs font-bold my-3">
          More Topics...
        </p>
      </Link>
    </div>
  );
}
