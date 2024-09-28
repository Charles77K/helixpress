// import React from 'react'
import { IoMdArrowForward } from 'react-icons/io';
import { Search } from '../homeComponents';

function GridBox({ header, body, link }) {
  return (
    <div className="bg-gray-200 p-4 w-full justify-between flex flex-col items-start md:h-[280px]">
      <section className="space-y-3">
        <h1 className="text-xl font-bold">{header}</h1>
        <p className="text-slate-600">{body}</p>
      </section>
      <p className="hover:underline text-slate-600 flex items-center">
        {' '}
        <span>{link ? link : ''}</span>{' '}
        <span>{link && <IoMdArrowForward size={15} />}</span>{' '}
      </p>
    </div>
  );
}

export default function Librarians() {
  return (
    <div>
      <Search />
      <div className="max-w-[80%] mx-auto p-10 space-y-14 ">
        <section className="space-y-6 mb-4">
          <h1 className="text-3xl font-bold text-slate-800">
            Content Access and Indexing
          </h1>
          <p className="w-full md:max-w-[60%] md:text-[18px]">
            MDPI collaborates with a number of academic institutions, indexing
            databases, platforms, and external companies that wish to index our
            content. If you would like to learn more about accessing or indexing
            our content, or you would like to discuss the possibility of setting
            up a depositing feed with us, please contact MDPIs Indexing Team via
            our Contact Form.
          </p>
          <button className="hover:underline px-12 bg-slate-700 py-1.5 rounded-md text-white">
            Contact
          </button>
        </section>
        <section>
          <h1 className="text-xl font-bold text-slate-800 mb-4">
            Our content can be accessed in a variety of ways
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-5">
            <GridBox
              header={'Depositing Feeds'}
              body={
                'For partnering indexing databases, we offer customized electronic depositing feeds. Our feeds deliver content via FTP, in which we can deliver full-text content as well as metadata (PDF, XML or both)'
              }
            />
            <GridBox
              header={'Full-Text Download'}
              body={
                'The full-text of all MDPI papers can be downloaded via sFTP. New content is added twice a month, in the middle and end of each month. Please contact MDPIs Indexing Team via our Contact Form to learn how.'
              }
              link={'Contact form'}
            />
            <GridBox
              header={'Crossref'}
              body={
                'All MDPI’s newly published metadata is deposited to Crossref within approximately 24 hours after publication. Please visit Crossref to find further details on metadata retrieval.'
              }
              link={'Crossref'}
            />
            <GridBox
              header={'Open Archives Initiative (OAI)'}
              link={'OAI Platform'}
              body={
                'MDPI maintains an OAI-PMH interface for metadata sharing (accessed below). The metadata is in Dublin Core and in AGRIS format.'
              }
            />
            <GridBox
              header={'Manual Export'}
              link={'Search Result Page'}
              body={
                'All MDPI content is open access and can be exported from our search results page. The data can be exported as Plain Text, RIS, BibTeX, Endnote, and Tab-delimited.'
              }
            />
            <GridBox
              header={'Page Scrapping'}
              body={
                'We provide standardized metadata in Dublin Core, PRISM and Google Scholar formats that are embedded in the source code of each papers abstract pages.'
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
}
