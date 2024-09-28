// import React from 'react';
import { Search } from '../homeComponents';

const FlexiContainer = ({ title, body }) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <h2 className="text-4xl font-semibold text-slate-600">{title}</h2>
      <p className="text-center">{body}</p>
    </div>
  );
};
export default function Societies() {
  return (
    <div>
      <Search />
      <div className="md:max-w-[80%] mx-auto md:p-10 p-3 space-y-14 ">
        <section className="space-y-6 mb-4">
          <h1 className="text-3xl font-bold text-slate-800">
            Information for Societies
          </h1>
          <p className="w-full md:max-w-[60%] md:text-[18px]">
            As a pioneer in open access publishing with over 25 years’
            experience, MDPI is interested in helping societies willing to
            venture into this publication model. We currently support more than
            180 learned societies and organizations ranging from affiliations to
            publishing journals on behalf of the society.
          </p>
          <div className="text-xs gap-3 flex flex-col md:flex-row">
            <button className="hover:underline md:w-[20%] bg-slate-700 py-1.5 px-3 w-[30%] rounded-md text-white">
              Contact
            </button>
            <button className="hover:underline border-[1px] md:w-[20%] w-[30%] border-slate-800 rounded-md px-2 py-1.5">
              Collaborating Societies
            </button>
          </div>
          {/* 1 */}
          <section>
            <div className="flex flex-wrap justify-between">
              <h1 className="text-xl font-bold text-slate-800">
                Our Experience
              </h1>
              <aside className="flex gap-2">
                <button className="bg-slate-600 w-40 hover:bg-slate-900 hover:cursor-pointer text-xs font-bold text-white py-2 rounded-md">
                  Discover Society Journals
                </button>
                <button className="bg-slate-600 w-40 hover:bg-slate-900 hover:cursor-pointer text-xs font-bold text-white py-2 rounded-md">
                  2024 Societies Flyer (0.9mb)
                </button>
              </aside>
            </div>
            <div className="grid mt-6 md:grid-cols-4 grid-cols-2">
              <FlexiContainer
                title={'1st'}
                body={'Largest Fully Open Access Publisher'}
              />
              <FlexiContainer
                title={'10+'}
                body={'Years of Publishing Society Journals'}
              />
              <FlexiContainer
                title={'160+'}
                body={'Affliated Societies and Research Organisations'}
              />
              <FlexiContainer
                title={'19'}
                body={'Society Journals Published by MDPI'}
              />
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
