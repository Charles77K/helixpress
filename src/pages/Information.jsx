// import { useState } from 'react';

import { Search } from '../components/homeComponents';
import Share from '../components/Share';
import { Outlet } from 'react-router-dom';
import InfoList from '../components/infoComponents/InfoList';

export default function Information() {
  return (
    <>
      <Search />
      <div className="flex flex-col md:flex-row">
        <section className="md:max-w-[22.5rem] w-full flex flex-col gap-3 p-4">
          <nav className="bg-white p-4">
            <h1 className="text-2xl text-slate-700 mb-4 font-bold">
              Information
            </h1>
            <ul className="text-sm font-semibold text-slate-600 flex flex-col gap-4">
              <InfoList title={'For Authors'} />
              <InfoList title={'For Reviewers'} LinkTitle={'/reviewers'} />
              <InfoList title={'For Editors'} LinkTitle={'/editors'} />
              <InfoList title={'For Librarians'} LinkTitle={'/librarians'} />
              <InfoList title={'For Publishers'} LinkTitle={'/publishers'} />
              <InfoList title={'For Societies'} LinkTitle={'/societies'} />
              <InfoList
                title={'For Conference Organizers'}
                LinkTitle={'/conference'}
              />
              <InfoList title={'Open Access Policy'} LinkTitle={'/access'} />
              <InfoList
                title={'Institutional Open Access Program'}
                LinkTitle={'/program'}
              />
              <InfoList
                title={'Special Issues Guidelines'}
                LinkTitle={'/special'}
              />
              <InfoList title={'Editorial Process'} LinkTitle={'/editorial'} />
              <InfoList
                title={'Research and Publication Ethics'}
                LinkTitle={'/research'}
              />
              <InfoList
                title={'Article Processing Charges'}
                LinkTitle={'/article'}
              />
              <InfoList title={'Testimonials'} LinkTitle={'/testimonials'} />
            </ul>
          </nav>
        </section>
        <section className="md:max-w-[60rem] w-full flex flex-col gap-3 p-4">
          <Outlet />
        </section>
        <section className="max-w-[12rem] md:w-full hidden md:block p-4">
          <Share linkToShare={'https://www.mdpi.com/information'} />
        </section>
      </div>
    </>
  );
}
