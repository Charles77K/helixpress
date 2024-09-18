import { useState } from 'react';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export default function BlogPosts({ title, blogs }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="my-2 font-bold text-slate-800">{title}</h2>
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
        {blogs.map((item, index) => (
          <ul key={index}>
            <li className="text-xs">
              <p className="my-1">{item.date}</p>
              <p>{item.post}</p>
            </li>
            <hr className="my-2"></hr>
          </ul>
        ))}
      </div>
      <p className="text-xs text-slate-500 font-bold hover:underline hover:cursor-pointer hidden md:block">
        More From Our Blog..
      </p>
    </div>
  );
}
