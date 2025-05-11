import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useFetch } from '../../services/hooks';
import { cn, formatDate } from '../../utils/utils';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';
import Error from '../../utils/Error';

export default function BlogPosts() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isError, isLoading, refetch } = useFetch('/blogs/');
  const blogs = !isLoading && data.results;

  let content;

  if (isLoading) {
    content = (
      <div className="animate-pulse space-y-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <ul key={idx}>
            <p className="w-1/2 h-3 bg-gray-200 rounded"></p>
            <p className="w-full h-5 bg-gray-200 mt-1 rounded"></p>
          </ul>
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <Error
        title={'Error'}
        text={'An error occurred while fetching blog post'}
        onRetry={() => refetch()}
      />
    );
  } else if (blogs && blogs.length > 0) {
    content = blogs.map((item, index) => (
      <ul key={index}>
        <li className="text-xs">
          <p className="my-1 text-black">{formatDate(item.date_created)}</p>
          <Link to={`/blogs/${item.id}`}>
            <p className="text-black font-medium hover:underline">
              {item.title}
            </p>
          </Link>
        </li>
        <hr className="my-2"></hr>
      </ul>
    ));
  } else {
    content = <NotFound label="Blogs Post" />;
  }

  return (
    <div className="bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="my-2 font-bold text-slate-800">Blog Posts</h2>
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
      <Link
        to="/blogs"
        className={cn(
          'text-slate-500 hover:underline hover:cursor-pointer text-xs font-bold my-3',
          isOpen ? 'block' : 'hidden md:block'
        )}
      >
        More From Our Blog..
      </Link>
    </div>
  );
}
