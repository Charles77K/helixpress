import { useState } from 'react';
import { HIGHLY_ACCESSED } from './DUMMY_FILES';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export default function HighlyAccessed() {
  const [isOpen, setIsOpen] = useState(false);
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
        {HIGHLY_ACCESSED.map((item, index) => {
          return (
            <ul key={index} className="text-xs md:w-full">
              <li>
                <p className="text-red-500 mt-4">{item.type}</p>
                <p className="hover:underline hover:cursor-pointer mt-1">
                  {item.title}
                </p>
                <p className="font-bold mt-2">
                  {item.authors.length > 1 ? (
                    <>
                      By <span>{item.authors[0]}, </span>
                      <span>{item.authors[1]}</span>
                    </>
                  ) : (
                    <span>{item.authors[0]}</span>
                  )}
                </p>

                <p className="my-2">
                  <span className="text-slate-500 italic">{item.journal} </span>
                  <span className="hover:underline hover:cursor-pointer">
                    {item.doi}
                  </span>
                </p>
                <p className="my-3">Published: {item.date}</p>
                <img src={item.imageUrl} alt={'journal Image'} />
              </li>
            </ul>
          );
        })}
      </div>
    </article>
  );
}
