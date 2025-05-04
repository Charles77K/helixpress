import React from 'react';

import { Search } from '../components/homeComponents';
import { useFetch } from '../services/hooks';
import { DEADLINE, RESULTS, TOPICS } from '../../constants/static';
import { SelectInput } from '../UI';
import { Link, useNavigate } from 'react-router-dom';
import useScrollToTop from '../utils/scrollToTop';
import Seo from '../components/Seo';

import NotFound from '../components/NotFound';
import Error from '../utils/Error';
import { formatDate } from '../utils/utils';
import Share from '../components/Share';

export default function Topics() {
  useScrollToTop();
  const navigate = useNavigate();
  const {
    data,
    isPending: isTopicsLoading,
    isError: isTopicsError,
  } = useFetch('/topics');

  const topicsData = !isTopicsLoading && data?.results;

  let content;

  if (isTopicsLoading) {
    content = (
      <div className="animate-pulse space-y-4">
        {/* Repeat the skeleton for each topic item */}
        {[...Array(3)].map((_, index) => (
          <ul key={index} className="space-y-2">
            <li className="py-2">
              {/* Placeholder for the title */}
              <div className="bg-gray-300 h-5 w-48 rounded-md mb-2"></div>

              {/* Placeholder for edited by line */}
              <div className="bg-gray-300 h-4 w-40 rounded-md mb-1"></div>

              {/* Placeholder for submission deadline and views */}
              <div className="bg-gray-300 h-4 w-60 rounded-md mb-1"></div>

              {/* Placeholder for the status badge */}
              <div className="bg-gray-300 h-4 w-24 rounded-md inline-block mb-1"></div>

              {/* Placeholder for participating journals */}
              <div className="bg-gray-300 h-4 w-52 rounded-md mt-2"></div>
            </li>
            <hr />
          </ul>
        ))}
      </div>
    );
  } else if (isTopicsError) {
    content = (
      <div className="flex justify-center">
        <Error title="Error!" text="An error occurred while fetching papers" />
      </div>
    );
  } else if (topicsData && topicsData.length > 0) {
    content = topicsData.map((item) => (
      <ul key={item.id}>
        <li className="py-2">
          <Link to={`/topics/${item.id}`}>
            <h1 className="text-sm text-slate-800 font-bold py-1 hover:underline hover:cursor-pointer">
              {item.title}
            </h1>
          </Link>
          <p className="text-xs mb-1">
            created by{' '}
            <span className="font-bold text-slate-600">{item.author}</span>
          </p>
          <p className="text-xs">
            submission deadline{' '}
            <span className="text-xs font-bold">
              {formatDate(item.deadline)}
            </span>{' '}
            |{' '}
            <span className="text-stone-100 bg-slate-600 p-0.5 text-[11px] text-center">
              Submission {item.submissionStatus}
            </span>
          </p>
          <p className="text-xs py-2">
            keywords{' '}
            <span className="text-slate-600 italic text-xs font-bold">
              {item.keywords}
            </span>
          </p>
        </li>
        <hr></hr>
      </ul>
    ));
  } else {
    content = (
      <NotFound
        label="Topics"
        actionText={'Go back'}
        onAction={() => navigate(-1)}
      />
    );
  }

  const [results, setResults] = React.useState('');
  const [deadline, setDeadline] = React.useState('');
  return (
    <>
      <Seo title={'Topics'} description={'Helixpress Topics'} />
      <div className="bg-gray-100">
        <Search />
        <div className="flex flex-col md:flex-row gap-5">
          <section className="md:max-w-[22rem] flex flex-col p-4 gap-4 w-full">
            <div className="bg-white p-4 flex flex-wrap justify-center">
              <p className="px-6 py-1 text-center bg-slate-600 md:w-52 w-full rounded-md text-stone-100 text-sm">
                Propose a Topic
              </p>
            </div>
            <div className="bg-white p-4 flex flex-col items-start">
              <h1 className="font-bold text-xl text-slate-800 mb-2">
                Categories
              </h1>
              {TOPICS.map((item, index) => (
                <ul key={index} className="ml-3">
                  <li className="text-xs list-disc py-0.5 hover:underline ">
                    {item}
                  </li>
                </ul>
              ))}
            </div>
          </section>
          {/* middle section */}
          <section className="md:max-w-[59rem] w-full flex flex-col p-4">
            <div className="bg-white p-8">
              {/* beginning of helixpress header */}
              <div className="flex flex-wrap gap-2 justify-between items-center mb-10">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-slate-800">
                    Helixpress Topics
                  </h1>
                </div>
                <div className="space-x-3 flex items-center flex-wrap gap-2">
                  <SelectInput
                    onChange={(e) => setResults(e.target.value)}
                    value={results}
                    options={RESULTS}
                    optionLabel={'label'}
                    optionValue={'value'}
                  />
                  <SelectInput
                    onChange={(e) => setDeadline(e.target.value)}
                    value={deadline}
                    placeholder={'Select Deadline'}
                    optionLabel={'label'}
                    optionValue={'value'}
                    options={DEADLINE}
                  />
                </div>
              </div>
              {/* end of mdpi topics */}
              <div>{content}</div>
            </div>
          </section>
          <section className="max-w-[12rem] md:w-full hidden md:block p-4">
            <div className="w-full">
              <div className="bg-white flex flex-col items-center gap-4">
                <div className="bg-white p-6 hidden md:block">
                  <Share linkToShare={'topics'} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
