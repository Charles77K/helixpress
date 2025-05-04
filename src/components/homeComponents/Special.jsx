import { useState } from 'react';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useFetch } from '../../services/hooks';
import { formatDate } from '../../utils/utils';
import Error from '../../utils/Error';
import NotFound from '../NotFound';

export default function Special() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending, isError, refetch } = useFetch('/issues/');
  const SPECIAL = data?.filter((item) => item.special);

  let content;

  if (isPending) {
    content = (
      <div className="animate-pulse space-y-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <ul key={idx} className="flex flex-col gap-2">
            <li className="w-1/2 h-4 rounded bg-gray-200"></li>
            <li className="w-full h-4 rounded bg-gray-200"></li>
            <li className="w-1/2 h-4 rounded bg-gray-200"></li>
          </ul>
        ))}
      </div>
    );
  } else if (isError) {
    content = <Error title={'Error'} onRetry={() => refetch()} />;
  } else if (SPECIAL) {
    content = SPECIAL.map((item, index) => (
      <ul key={index} className="text-xs">
        {/* <li className="flex flex-col items-start">
          <p className="my-1 ">
            Special Issue in <span className="italic">{item.category}</span>
          </p>
          <p className="font-bold	">{item.topic}</p>
          <p className="text-gray-500 my-1">
            Guest Editors:
            <span>{' ' + item.editors.slice(0, -1).join(', ')}</span> and
            <span>{' ' + item.editors.slice(-1)}</span>
          </p> */}
        <p className="text-red-500">
          Deadline: {formatDate(item.date_created)}
        </p>
        {/* </li> */}
        <hr className="my-3"></hr>
      </ul>
    ));
  } else {
    content = <NotFound label="Special Issues" />;
  }
  return (
    <div className="bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold my-2">Selected Special Issues</h2>
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
        {content}
      </div>
    </div>
  );
}
