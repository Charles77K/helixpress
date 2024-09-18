import { useState } from 'react';
import { SelectInput } from './Search';
import { SUBJECTS } from './DUMMY_FILES';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export default function AccessJournals() {
  const [journal, setJournal] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility

  function handleChange(event) {
    setJournal(event.target.value);
  }

  const journalOptions = [
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'maths', label: 'Maths' },
    { value: 'physics', label: 'Physics' },
  ];

  const inputStyle =
    'my-3 lg:w-50 lg:block hidden w-60 border-slate-800 text-[12px] text-slate-800 border-solid border border-slate-400 placeholder:placeholder-custom-gray placeholder:text-[12px] px-4 py-1 rounded-md items-center focus:outline-none';

  return (
    <div className="p-4 bg-white">
      {/* Header and Toggle Button */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold my-1">Open Access Journals</h2>
        <button
          className="md:hidden text-slate-600 hover:underline"
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          {isOpen ? <IoIosArrowUp size={23} /> : <IoIosArrowDown size={23} />}
        </button>
      </div>

      {/* Dropdown Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'block' : 'hidden'
        } md:block`}
      >
        <SelectInput
          value={journal}
          onChange={handleChange}
          placeholder={'All Journals'}
          options={journalOptions}
          className={inputStyle}
        />
        {SUBJECTS.map((subject, index) => (
          <ul key={index} className="flex flex-col gap-2 mt-3 text-xs">
            <li className="flex gap-3 items-center">
              <img src={subject.img} className="w-10 h-10" />
              <p>{subject.topic}</p>
            </li>
            <hr />
          </ul>
        ))}
        <p className="my-4 font-bold text-slate-800 hover:cursor-pointer hover:underline text-xs">
          Explore All Journals...
        </p>
      </div>
    </div>
  );
}
