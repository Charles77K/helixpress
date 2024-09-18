import React from 'react';

import { GiShare } from 'react-icons/gi';
import { Search } from '../components/homeComponents';
import { inputStyle, SelectInput } from '../components/homeComponents/Search';
import { BiSolidMessageError } from 'react-icons/bi';
import { MDPI_TOPICS } from '../components/DOCS';

const TOPICS = [
  '  Biology & Life Sciences',
  'Business & Economics',
  'Chemistry & Materials Science',
  'Computer Science & Mathematics',
  'Engineering',
  'Environmental & Earth Sciences',
  'Medicine & Pharmacology',
  'Physical Sciences',
  'Social Sciences, Arts and Humanities',
  'Public Health & Healthcare',
  'All Disciplines',
];
const RESULTS = [
  { value: '15', label: '15 Results per Page' },
  { value: '50', label: '50 Results per Page' },
  { value: '100', label: '100 Results per Page' },
];
const DEADLINE = [
  { value: 'deadline', label: 'Submission Deadline' },
  { value: 'times', label: 'Times Viewed' },
  { value: 'Number', label: 'Number of Articles' },
];
export default function Topics() {
  const [results, setResults] = React.useState('');
  const [deadline, setDeadline] = React.useState('');
  return (
    <>
      <Search />
      <div className="flex flex-col md:flex-row gap-3">
        <section className="md:max-w-[22rem] flex flex-col p-4 gap-4 w-full">
          <div className="bg-white p-4 flex justify-center">
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
        <section className="md:max-w-[59rem] w-full flex flex-col p-4">
          <div className="bg-white p-8">
            {/* begining of mdpi header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl md:text-2xl text-slate-800">
                  MDPI Topics
                </h1>
              </div>
              <div className="space-x-3">
                <SelectInput
                  className={inputStyle}
                  onChange={(e) => setResults(e.target.value)}
                  value={results}
                  placeholder={'Select Prefered Result'}
                  options={RESULTS}
                />
                <SelectInput
                  className={inputStyle}
                  onChange={(e) => setDeadline(e.target.value)}
                  value={deadline}
                  placeholder={'Select Deadline'}
                  options={DEADLINE}
                />
              </div>
            </div>
            {/* end of mdpi topics */}
            <div>
              {MDPI_TOPICS.map((item, index) => (
                <ul key={index}>
                  <li className="py-2">
                    <h1 className="text-sm text-slate-800 font-bold py-2 hover:underline hover:cursor-pointer">
                      {item.title}
                    </h1>
                    <p className="text-xs mb-1">
                      edited by{' '}
                      <span className="font-bold text-slate-700">
                        {item.editors.slice(0, -1).join('')}
                      </span>{' '}
                      and
                      <span className="font-bold text-slate-700">
                        {' '}
                        {' ' + item.editors.slice(-1)}
                      </span>
                    </p>
                    <p className="text-xs">
                      submission deadline{' '}
                      <span className="text-xs font-bold">
                        {item.submissionDeadline}
                      </span>{' '}
                      | <span>{item.articlesCount} artciles </span> |{' '}
                      <span className="text-xs font-bold">
                        viewed by {item.views}
                      </span>{' '}
                      |{' '}
                      <span className="text-stone-100 bg-slate-600 p-0.5 text-[11px] text-center">
                        Submission {item.submissionStatus}
                      </span>
                    </p>
                    <p className="text-xs py-2">
                      Participating journals{' '}
                      <span className="text-slate-600 italic text-xs font-bold">
                        {item.participatingJournals.slice(0, -1).join(', ')}
                      </span>{' '}
                      <span className="text-slate-600 italic text-xs font-bold">
                        {' ' + item.participatingJournals.slice(-1)}
                      </span>
                    </p>
                  </li>
                  <hr></hr>
                </ul>
              ))}
            </div>
          </div>
        </section>
        <section className="max-w-[12rem] md:w-full hidden md:block p-4">
          <div className="w-full">
            <div className="bg-white py-6 px-4 md:px-8 flex flex-col items-center gap-4">
              <GiShare size={30} aria-label="Share" />
              <BiSolidMessageError size={30} aria-label="Error" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
