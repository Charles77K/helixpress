import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useFetch } from '../../services/hooks';
import { formatDate } from '../../utils/utils';
import Error from '../../utils/Error';
import NotFound from '../NotFound';

export default function HighlyAccessed() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending, isError, refetch, error } = useFetch(
    '/highly-accessed-papers/'
  );
  let content;

  if (isPending) {
    content = (
      <div className="animate-pulse space-y-3">
        {Array.from({ length: 4 }).map((_, idx) => (
          <ul key={idx} className="flex flex-col gap-1">
            <li className="w-1/4 bg-gray-200 h-3 rounded"></li>
            <li className="w-3/4 bg-gray-200 h-5 rounded"></li>
            <li className="w-full bg-gray-200 h-5 rounded"></li>
            <li className="w-full bg-gray-200 h-14 rounded"></li>
          </ul>
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <Error
        title={'Error'}
        text={`${error.message || 'An unexpected error occurred'}`}
        onRetry={() => refetch()}
      />
    );
  } else if (data && data.length > 0) {
    content = data.map((item) => {
      return (
        <ul key={item.id} className="text-xs md:w-full">
          <li>
            <p className="text-red-500 mt-4">{item.type}</p>
            <Link to={`paper/${item.id}`}>
              <p className="hover:underline text-[14px] font-bold hover:cursor-pointer my-1">
                {item.title}
              </p>
            </Link>
            <p className="font-light mt-px">
              by
              <span className="font-bold"> {item.author.split(',')[0]} </span>
              et al.
            </p>

            <p className="my-1">
              {/* <span className="text-slate-500 italic">{item.journal} </span> */}
              <span className="hover:underline hover:cursor-pointer">
                {item.doi}
              </span>
            </p>
            <p className="my-3">Published: {formatDate(item.date_created)}</p>
            <img src={item.pic} alt={'Article-Image'} />
          </li>
        </ul>
      );
    });
  } else {
    content = <NotFound label="Article" />;
  }

  return (
    <article className="p-4 bg-white">
      {/* header and toggle */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold my-1">Highly Accessed Articles</h2>
        <button
          className="md:hidden text-slate-600 hover:underline"
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          {isOpen ? <IoIosArrowUp size={23} /> : <IoIosArrowDown size={23} />}
        </button>
      </div>
      {/* dropdown content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'block' : 'hidden'
        } md:block`}
      >
        {content}
      </div>
    </article>
  );
}
