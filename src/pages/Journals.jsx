import { useState } from 'react';

import { Outlet, Link } from 'react-router-dom';
import { Search } from '../components/homeComponents';
import Share from '../components/Share';
import { useFetch } from '../services/hooks';
import { SelectInput } from '../UI';

export const inputClass =
  'border border-gray-300 text-xs my-2 border-[0.5px] rounded-md p-1.5 w-full text-gray-700 focus:outline-none';

export default function Journals() {
  const { data: journals, isPending } = useFetch('/journals/');
  const [activeJournal, setActiveJournal] = useState('');

  return (
    <div className="bg-gray-100">
      <Search />
      <div className="flex p-4 gap-10 flex-col md:flex-row items-start justify-center text-slate-700">
        {/* First section */}
        <section className="flex-grow md:flex-grow-[1] md:basis-1/4 min-w-[10rem] w-full flex flex-col gap-3">
          <nav className="bg-white p-6">
            <h1 className="text-slate-700 text-xl font-bold">
              Helixpress Journals
            </h1>
            <SelectInput
              className={inputClass}
              value={activeJournal}
              onChange={(e) => setActiveJournal(e.target.value)}
              optionLabel={'name'}
              optionValue={'id'}
              isLoading={isPending}
              options={journals}
              placeholder={'Find active Journal'}
            />
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/journals"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  <span className="text-gray-400">•</span> Active Journals
                </Link>
                <Link
                  to="/journals/find"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  <span className="text-gray-400">•</span> Find a Journal
                </Link>
                <Link
                  to="/journals/proposal"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  <span className="text-gray-400">•</span> Journal Proposal
                </Link>
                <Link
                  to="/journals/proceeding"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  <span className="text-gray-400">•</span> Proceeding Series
                </Link>
              </li>
            </ul>
          </nav>
        </section>

        {/* Middle section (wider than the others) */}
        <section className="flex-grow md:flex-grow-[2] md:basis-[75%] min-w-[20rem] w-full flex flex-col">
          <Outlet /> {/* This is where the content will change */}
        </section>
        {/* Last section */}
        <section className="hidden flex-grow md:flex-grow-[1] md:basis-[10%] min-w-[10rem] w-full md:flex flex-col">
          <Share linkToShare={'about/journals/'} />
        </section>
      </div>
    </div>
  );
}
