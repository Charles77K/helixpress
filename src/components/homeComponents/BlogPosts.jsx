import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useFetch } from '../../services/hooks';
import { formatDate } from '../../utils/utils';
import { Link } from 'react-router-dom';

export default function BlogPosts() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isError, isLoading } = useFetch('/blogs/');
  const blogs = !isLoading && data.results;

  let content;

  if (isLoading) {
    content = (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else if (isError) {
    content = (
      <div>
        <p>An error occurred</p>
      </div>
    );
  } else if (blogs && blogs.length > 0) {
    content = blogs.map((item, index) => (
      <ul key={index}>
        <li className="text-xs">
          <p className="my-1 text-black">{formatDate(item.date_created)}</p>
          <Link to={`blog/${item.id}`}>
            <p className="text-black font-semibold hover:underline">
              {item.title}
            </p>
          </Link>
        </li>
        <hr className="my-2"></hr>
      </ul>
    ));
  } else {
    content = <p>No blogs found</p>;
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
        className="text-xs text-slate-500 font-bold hover:underline hover:cursor-pointer hidden md:block"
      >
        More From Our Blog..
      </Link>
    </div>
  );
}
