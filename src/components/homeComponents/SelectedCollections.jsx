import { useState } from 'react';

import { COLLECTIONS } from './DUMMY_FILES';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export default function SelectedCollectios() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold my-1">Selected Collections </h2>
        <button
          className="md:hidden text-slate-600 hover:underline"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoIosArrowUp size={23} /> : <IoIosArrowDown size={23} />}
        </button>
      </div>
      <div
        className={`transition-all ease-in-out duration-300 ${
          isOpen ? 'block' : 'hidden'
        } md:block `}
      >
        {COLLECTIONS.map((item, index) => (
          <ul key={index} className="text-xs">
            <li className="flex flex-col items-start">
              <p className="my-1 ">{item.topic}</p>
              <p className="font-bold	">{item.title}</p>
              <p className="text-gray-500 my-1">
                Topic Editors:
                <span>{' ' + item.editors.slice(0, -1).join(', ')}</span> and
                <span>{' ' + item.editors.slice(-1)}</span>
              </p>
            </li>
            <hr className="my-3"></hr>
          </ul>
        ))}
      </div>
    </div>
  );
}
