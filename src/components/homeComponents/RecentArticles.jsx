import { useState } from 'react';
import { ARTICLES } from './DUMMY_FILES';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export default function RecentArticles() {
  // Track the open state for each article
  const [openStates, setOpenStates] = useState(
    Array(ARTICLES.length).fill(false)
  );
  const [isOpen, setIsOpen] = useState(false);

  // Handle "Read more" click
  const handleShowMore = (index) => {
    // Toggle the specific article's open state
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };

  return (
    <div className="p-4 bg-white mt-5 md:mt-0">
      <div className="flex items-center justify-between">
        <h2 className="font-bold my-1">Recent Articles</h2>
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
        {ARTICLES.map((item, index) => (
          <ul key={index} className="mt-4 md:w-full">
            <hr className="py-3"></hr>
            <li>
              <div className="flex justify-between items-start text-xs">
                <section className="flex flex-wrap gap-2 items-center">
                  <p className="p-1 bg-slate-800 text-white">{item.access}</p>
                  <p className="p-1 bg-red-500 text-white">{item.Type}</p>
                </section>
                <p className="text-slate-800 text-xs">
                  <span>{item.pageCount},</span>
                  <span>{' ' + item.size}</span>
                </p>
              </div>
              {/* title and authors section */}
              <h2 className="text-slate-800 my-3 font-bold">{item.title}</h2>
              <p className="text-xs text-slate-800">
                by
                <span className="font-bold">
                  {' ' + item.authors.slice(0, -1).join(', ') + ' '}
                </span>
                and <span className="font-bold">{item.authors.slice(-1)}</span>
              </p>
              {/* section to render doi and date */}
              <section className="text-[13px] flex flex-wrap gap-1 my-1">
                <p className="text-gray-500 italic">{item.journal}</p>
                <p className="font-bold text-gray-500">{item.year}</p>
                <p className="text-gray-500">{item.volume}</p>
                <p className="text-gray-500">{item.articleId}</p>
                <p className="text-slate-800 hover:underline hover:cursor-pointer">
                  {item.doi}
                </p>
                <p className="text-gray-500">-{' ' + item.datePublished}</p>
              </section>
              {/* abstract */}
              <>
                {openStates[index] ? (
                  <section className="my-2">
                    <p className="text-xs">
                      <span className="font-bold text-slate-600">
                        Abstract{' '}
                      </span>
                      {item.abstract} {item.readMore}
                      <span className="underline font-bold text-xs hover:cursor-pointer">
                        {' '}
                        Full article
                      </span>
                    </p>
                  </section>
                ) : (
                  <section className="my-2">
                    <p className="text-xs">
                      <span className="font-bold text-slate-600">
                        Abstract{' '}
                      </span>
                      {item.abstract}
                      <span
                        className="underline font-bold text-xs hover:cursor-pointer"
                        onClick={() => handleShowMore(index)}
                      >
                        {' '}
                        [...] Read more.
                      </span>
                    </p>
                  </section>
                )}
              </>
              <p className="text-xs">
                (This article belongs to the Special Issue){' '}
                <span className="font-bold">{item.specialIssue}</span>
              </p>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
