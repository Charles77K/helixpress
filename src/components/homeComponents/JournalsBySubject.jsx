import React from 'react';
import { SUBJECTS } from './DUMMY_FILES';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export default function JournalsBySubject() {
  const [isSubjectListOpen, setIsSubjectListOpen] = React.useState(false);

  return (
    <div className="p-4 bg-white text-slate-800">
      {/* Journals by Subject Section */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold md:mb-10 md:ml-10 md:text-2xl my-1">
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
          isSubjectListOpen ? 'grid' : 'hidden'
        } sm:grid-cols-3 lg:grid-cols-5 md:grid gap-4 w-full`}
      >
        {SUBJECTS.map((item, index) => (
          <ul key={index} className="flex flex-col items-center">
            <li className="flex items-center gap-2">
              <img
                src={item.img}
                alt="Subject Icon"
                className="w-[2.2rem] h-[2.2rem]"
              />
              <p className="text-sm text-center">{item.topic}</p>
            </li>
            <hr className="w-full my-2" />
          </ul>
        ))}
      </section>
    </div>
  );
}
