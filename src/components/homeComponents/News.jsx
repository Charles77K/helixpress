import { useState } from 'react';
import { NEWS } from './DUMMY_FILES';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export default function News() {
  const [isOpen, setIsOpen] = useState(false);
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
        {NEWS.map((item, index) => (
          <ul key={index} className="text-xs">
            <li className="flex flex-col items-start">
              <p className="my-1">{item.date}</p>
              <p className="font-bold">{item.body}</p>
            </li>
            <hr className="my-3"></hr>
          </ul>
        ))}
      </div>
      <p className="text-slate-500 hover:underline hover:cursor-pointer text-xs font-bold hidden md:block">
        More News and Announcements
      </p>
    </div>
  );
}
