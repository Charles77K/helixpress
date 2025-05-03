import { Outlet, Link, useParams } from 'react-router-dom';
import { News, Search } from '../components/homeComponents';
import Share from '../components/Share';
import JournalBrowser from './JournalBrowser';
import { useFetchById } from '../services/hooks';

export default function JournalPage() {
  const { name, id } = useParams();

  const { data } = useFetchById('/journals', id);

  return (
    <div className="bg-slate-100">
      <Search />
      <div className="flex p-4 gap-5 flex-col md:flex-row items-start justify-center text-slate-700">
        {/* First section */}
        <section className="flex-grow md:flex-grow-[1] md:basis-1/4 min-w-[10rem] w-full flex flex-col gap-3">
          <nav className="bg-white p-6">
            <h1 className="text-slate-700 text-xl font-bold">
              Helixpress Journals
            </h1>
            <ul className="space-y-2 text-xs">
              <li>
                {data && (
                  <Link
                    to={`/journal/${name}/${id}`}
                    className="italic font-bold block whitespace-nowrap py-1 hover:underline"
                  >
                    <span className="text-gray-400 mr-1">•</span>
                    {data.abbrv} Home
                  </Link>
                )}
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
          {/* Browse journal */}
          <div className="bg-white p-3 md:p-6">
            <JournalBrowser journalId={id} />
          </div>
        </section>

        {/* Middle section (wider than the others) */}
        <section className="flex-grow md:flex-grow-[2] md:basis-[60%] min-w-[20rem] w-full flex flex-col">
          <Outlet /> {/* This is where the content will change */}
        </section>
        {/* Last section */}
        <section className="hidden flex-grow md:flex-grow-[1] md:basis-[25%] min-w-[10rem] w-full md:flex flex-col">
          <News />
          <Share linkToShare={'about/journals/'} />
        </section>
      </div>
    </div>
  );
}
