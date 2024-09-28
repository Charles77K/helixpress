// import React from 'react'
import { List } from './Conference';

export default function Institutional() {
  const listItems = [
    'Participating institutions will be granted access to a dedicated Institutional Dashboard on our submission system, ‘Susy’, which allows real-time visibility over articles that have been submitted by their researchers to MDPI journals. It also provides detailed article metadata, up-to-date APC information, downloadable reports, and information about editorial engagement',
    'Affiliated researchers of participating universities receive a discount on APCs across all MDPI journals. This can be combined with reviewer vouchers, but any discount offered by the Editorial Office is already inclusive of the IOAP discount.',
    'Researchers can also benefit from a 10% discount on the Book Processing Charges (BPCs) for MDPI Books and a 15% discount on Language Editing Services.',
    'Institutions can receive automated Institutional Repository deposits of papers from affiliated authors using the SWORD 1.3 protocol.',
    'A direct point of contact at MDPI for questions and support.',
  ];
  return (
    <div className="bg-white px-12 py-4 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Institutional Open Access Program (IOAP)
        </h1>
        <div className="text-xs space-y-4 mt-3">
          <p>
            MDPI offers institutions and consortia the opportunity to join over
            800 institutions on our Institutional Open Access Program (IOAP),
            which provides transparency to the MDPI submission process, access
            to a unique institutional dashboard environment, and a discount on
            Article Processing Charges (APC) for affiliated researchers.
          </p>
          <p>
            With flexible agreement models that offer a variety of payment
            workflows, MDPI can cater to individual institutional needs in order
            to help simplify administrative processes
          </p>
          <p>
            We support institutions to abide by Plan S and national mandates,
            whilst making it easy for authors to publish in fully compliant
            (CC-BY) Open Access journals.
          </p>
          <button className="hover:bg-slate-600 hover:text-white border-[1px] border-slate-600 text-slate-600 p-1.5 rounded-md transition-hover ease-in-out duration-300">
            Contact Us
          </button>
        </div>
      </div>
      {/* 2 */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Partner Benefits</h1>
        <div className="text-xs space-y-4 mt-3">
          <h1 className="text-sm font-semibold">
            Website and Program Management
          </h1>
          <ul className="text-xs text-black">
            {listItems.map((item, index) => (
              <List key={index} title={item} />
            ))}
          </ul>
        </div>
      </div>
      {/* 3 */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Agreement Models</h1>
        <div className="text-xs space-y-3 mt-3">
          <p className=" hover:cursor-pointer hover:underline">
            <span className="text-sm text-slate-800 font-bold">
              Flat fee agreement:
            </span>{' '}
            the institution can pay a one-time yearly fee for their
            Corresponding Authors to publish an unlimited number of articles in
            MDPI journals.
          </p>
          <p className=" hover:cursor-pointer hover:underline">
            <span className="text-sm text-slate-800 font-bold">
              Discount agreement:
            </span>{' '}
            Authors affiliated with participating universities receive an IOAP
            discount on the APC for any paper published in a MDPI journal at no
            charge to the institution.
          </p>
        </div>
      </div>
      {/* 4 */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Flexible Workflows</h1>
        <div className="text-xs space-y-3 mt-3">
          <p className=" hover:cursor-pointer hover:underline">
            <span className="text-sm text-slate-800 font-bold">
              Flat fee agreement:
            </span>{' '}
            the institution can pay a one-time yearly fee for their
            Corresponding Authors to publish an unlimited number of articles in
            MDPI journals.
          </p>
          <p className=" hover:cursor-pointer hover:underline">
            <span className="text-sm text-slate-800 font-bold">
              Discount agreement:
            </span>{' '}
            Authors affiliated with participating universities receive an IOAP
            discount on the APC for any paper published in a MDPI journal at no
            charge to the institution.
          </p>
        </div>
      </div>
      {/* 4 */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Sponsorship Support
        </h1>
        <div className="text-xs space-y-4 mt-3">
          <p>
            MDPI cooperates with hundreds of academic conferences each year.
            Besides the above services, we can also provide various types of
            sponsorship support, such as conference advertisements on journal
            homepages, awards, keynote speeches, booths, etc.
          </p>
          <p>If you are interested, please contact sponsorship@mdpi.com.</p>
        </div>
      </div>
    </div>
  );
}
