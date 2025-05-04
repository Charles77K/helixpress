import React from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Error from '../../utils/Error';
import { useFetch } from '../../services/hooks';
import JournalSubjectList from './JournalSubjectList';

export default function JournalsBySubject() {
  const [isSubjectListOpen, setIsSubjectListOpen] = React.useState(false);
  const [subjectId, setSubjectId] = React.useState('');
  const { data, isError, isLoading } = useFetch('/subjects/');

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
    content = <Error />;
  } else if (data && data.length > 0) {
    content = (
      <ul className="flex flex-col gap-2 items-start">
        {data.map((item) => (
          <li
            className=" group flex items-center gap-2"
            key={item.id}
            onClick={() => setSubjectId(item.id)}
          >
            {item.pic && (
              <img
                src={item.pic}
                alt="Subject Icon"
                className="w-[2.2rem] h-[2.2rem]"
              />
            )}
            <p className="group-hover:underline w-full text-xs text-center">
              {item.name}
            </p>
          </li>
        ))}
      </ul>
    );
  } else {
    content = <p>No journals found</p>;
  }

  return (
    <div className="p-4 bg-white text-slate-800 grid grid-cols-5 justify-items-start">
      {/* Journals by Subject Section */}
      <section className="flex flex-col items-start col-span-1">
        <h2 className="font-semibold md:text-xl mb-2">Journals by Subject</h2>
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
        <div
          className={`grid transition-all duration-300 ${
            isSubjectListOpen ? 'flex' : 'hidden md:flex'
          } flex-col`}
        >
          {content}
        </div>
      </section>
      <section className="col-span-4">
        <JournalSubjectList id={subjectId} />
      </section>
    </div>
  );
}
