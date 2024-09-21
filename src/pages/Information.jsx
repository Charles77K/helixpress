import { useState } from 'react';

import Authors from '../components/infoComponents/Authors';
import { Search } from '../components/homeComponents';
import Reviewers from '../components/infoComponents/Reviewers';
import Editors from '../components/infoComponents/Editors';
import AccessPolicy from '../components/infoComponents/AccessPolicy';
import Editorial from '../components/infoComponents/Editorial';
import Reasearch from '../components/infoComponents/Reasearch';
import Articles from '../components/infoComponents/Articles';
import Share from '../components/Share';

export default function Information() {
  const [selectedSection, setSelectedSection] = useState('authors');

  const renderContent = () => {
    switch (selectedSection) {
      case 'authors':
        return <Authors />;
      case 'reviewers':
        return <Reviewers />;
      case 'editors':
        return <Editors />;
      case 'access':
        return <AccessPolicy />;
      case 'editorial':
        return <Editorial />;
      case 'publication':
        return <Reasearch />;
      case 'article':
        return <Articles />;
      default:
        'authors';
    }
  };
  return (
    <>
      <Search />
      <div className="flex flex-col md:flex-row">
        <section className="md:max-w-[22.5rem] w-full flex flex-col gap-3 p-4">
          <div className="bg-white p-4">
            <h1 className="text-2xl text-slate-700 mb-4 font-bold">
              Information
            </h1>
            <ul className="text-sm font-semibold text-slate-600 flex flex-col gap-4">
              <li
                className="hover:underline mb-1 hover:cursor-pointer"
                onClick={() => setSelectedSection('authors')}
              >
                For Authors
              </li>
              <hr></hr>
              <li
                onClick={() => setSelectedSection('reviewers')}
                className="hover:underline mb-1 hover:cursor-pointer"
              >
                For Reviewers
              </li>
              <hr></hr>

              <li
                onClick={() => setSelectedSection('editors')}
                className="hover:underline mb-1 hover:cursor-pointer"
              >
                For Editors
              </li>
              <hr></hr>

              <li
                onClick={() => setSelectedSection('access')}
                className="hover:underline mb-1 hover:cursor-pointer"
              >
                Open Access Policy
              </li>
              <hr></hr>

              <li
                onClick={() => setSelectedSection('editorial')}
                className="hover:underline mb-1 hover:cursor-pointer"
              >
                Editorial Process
              </li>
              <hr></hr>

              <li
                onClick={() => setSelectedSection('publication')}
                className="hover:underline mb-1 hover:cursor-pointer"
              >
                Research and Publication Ethics
              </li>
              <hr></hr>

              <li
                onClick={() => setSelectedSection('article')}
                className="hover:underline mb-1 hover:cursor-pointer"
              >
                Article Processing Charges
              </li>
            </ul>
          </div>
        </section>
        <section className="md:max-w-[60rem] w-full flex flex-col gap-3 p-4">
          {renderContent()}
        </section>
        <section className="max-w-[12rem] md:w-full hidden md:block p-4">
          <Share />
        </section>
      </div>
    </>
  );
}
