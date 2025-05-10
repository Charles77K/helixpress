import React from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Error from '../../utils/Error';
import { useFetch } from '../../services/hooks';
import JournalSubjectList from './JournalSubjectList';
import { cn } from '../../utils/utils';
import SelectInput from '../../UI/SelectInput';

export default function JournalsBySubject() {
  const [isSubjectListOpen, setIsSubjectListOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const { data, isError, isPending, error } = useFetch('/subjects/');
  const [subjectId, setSubjectId] = React.useState('');

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let content;

  if (isPending) {
    content = (
      <div className="animate-pulse flex flex-col items-start gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-gray-200 w-full h-4 rounded" />
        ))}
      </div>
    );
  } else if (isError) {
    content = <Error />;
  } else if (data && data.length > 0) {
    content = isMobile ? (
      <SelectInput
        name={'journal'}
        className={'mb-4'}
        isLoading={isPending}
        error={error}
        options={data}
        optionLabel={'name'}
        optionValue={'id'}
        onChange={(e) => setSubjectId(e.target.value)}
      />
    ) : (
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
            <p className="group-hover:underline cursor-pointer w-full text-xs text-center">
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
    <div className="px-4 sm:px-5 md:px-10 lg:px-16 py-4 bg-white text-slate-800 grid grid-cols-1 md:grid-cols-5 justify-items-start">
      {/* Journals by Subject Section */}
      <section className="flex flex-col w-full md:col-span-2 xl:col-span-1">
        <div className="flex justify-between items-start w-full">
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
        </div>
        <div
          className={`grid transition-all duration-300 ${
            isSubjectListOpen ? 'flex' : 'hidden md:flex'
          } flex-col`}
        >
          {content}
        </div>
      </section>
      <section
        className={cn(
          'md:col-span-2 xl:col-span-4',
          isSubjectListOpen ? 'block' : 'hidden md:grid'
        )}
      >
        <JournalSubjectList id={subjectId} />
      </section>
    </div>
  );
}
