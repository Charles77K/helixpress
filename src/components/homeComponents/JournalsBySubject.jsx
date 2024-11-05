import React from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useFetchJournals } from '../../admin/components/Tanstack';
import Error from '../../utils/Error';
import { Link } from 'react-router-dom';

export default function JournalsBySubject() {
  const [isSubjectListOpen, setIsSubjectListOpen] = React.useState(false);
  const { data, isError, isLoading } = useFetchJournals();

  let content;

  if (isLoading) {
    content = (
      <div className="animate-pulse">
        {Array.from({ length: 4 }).map((_, index) => (
          <ul key={index} className="flex flex-row items-center">
            <li className="flex items-center gap-2">
              <p className="bg-gray-100 h-[2.2.rem] w-[2.2rem]"></p>
              <p className="bg-gray-100 h-4 w-32"></p>
            </li>
            <hr className="w-full my-2" />
          </ul>
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <div className="flex justify-center">
        <Error />
      </div>
    );
  } else if (data && data.length > 0) {
    content = (
      <>
        {data.map((item, index) => (
          <ul
            key={index}
            className="flex flex-col items-start px-10 md:mt-1 mt-7"
          >
            <Link className="group" to={`/journal/${item.name}/${item.id}`}>
              <li className="flex items-center gap-2">
                <img
                  src={`https://ogbesomto.pythonanywhere.com/${item.pic}`}
                  alt="Subject Icon"
                  className="w-[2.2rem] h-[2.2rem]"
                />
                <p className="group-hover:underline text-sm text-center">
                  {item.name}
                </p>
              </li>
              <hr className="w-full my-2" />
            </Link>
          </ul>
        ))}
      </>
    );
  } else {
    content = <p>No journals found</p>;
  }

  return (
    <div className="p-4 bg-white text-slate-800">
      {/* Journals by Subject Section */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold ml-6 md:mb-10 md:ml-10 md:text-2xl my-1">
          Journals by Subject
        </h2>
        <button
          className="md:hidden text-slate-600 hover:underline"
          onClick={() => setIsSubjectListOpen((prevState) => !prevState)}
          aria-expanded={isSubjectListOpen}
          aria-controls="subject-list"
        >
          {isSubjectListOpen ? (
            <IoIosArrowUp size={23} />
          ) : (
            <IoIosArrowDown size={23} />
          )}
        </button>
      </div>
      {/* Subject Grid */}
      <section
        className={`grid transition-all duration-300 ${
          isSubjectListOpen ? 'grid' : 'hidden md:grid'
        } sm:grid-cols-3 md:grid-cols-5 gap-4 w-full`}
      >
        {content}
      </section>
    </div>
  );
}
