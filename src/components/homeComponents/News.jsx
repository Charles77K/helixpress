import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Error from '../../utils/Error';
import { Link } from 'react-router-dom';
import { useFetch } from '../../services/hooks';
import { formatDate } from '../../utils/utils';

export default function News() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    isError: isNewsError,
    isLoading: isNewsLoading,
    data,
  } = useFetch('/news/');

  const newsData = !isNewsLoading && data.results;

  let content;

  if (isNewsLoading) {
    content = (
      <div className="animate-pulse">
        {Array.from({ length: 3 }).map((_, index) => (
          <ul key={index} className="text-xs">
            <li className="flex flex-col items-start">
              <div className="h-4 bg-slate-200 rounded w-1/4 my-1"></div>
              <div className="h-6 bg-slate-200 rounded w-3/4 my-1"></div>
            </li>
            <hr className="my-3"></hr>
          </ul>
        ))}
      </div>
    );
  } else if (isNewsError) {
    content = (
      <div className="flex justify-center">
        <Error text={'Error fetching news'} title={'Error!'} />
      </div>
    );
  } else if (newsData && newsData.length > 0) {
    content = newsData.map((item, index) => (
      <ul key={index} className="text-xs">
        <li className="flex flex-col items-start">
          <p className="my-1">{formatDate(item.date_created)}</p>
          <p className="font-bold">{item.title}</p>
        </li>
        <hr className="my-3"></hr>
      </ul>
    ));
  } else {
    content = <p>No news found</p>;
  }

  return (
    <div className="bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold my-2">News</h1>
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
      <Link to={'/about/news'}>
        <p className="text-slate-500 hover:underline hover:cursor-pointer text-xs font-bold hidden md:block">
          More News and Announcements
        </p>
      </Link>
    </div>
  );
}
