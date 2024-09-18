// import React from 'react';
import { Search } from '../components/homeComponents';

export default function About() {
  return (
    <div className="mb-8">
      <Search />
      <div className="flex p-6 md:px-20 md:py-10 gap-2 overflow-hidden flex-col items-start justify-center mx-auto text-slate-700  max-w-[60rem] bg-white mt-8">
        <section>
          <h1 className="text-3xl font-bold my-5 text-slate-700">About Us</h1>
          <h1 className="text-xl font-bold text-slate-700">Overview</h1>
          <div className="text-xs space-y-4 mt-3">
            <p>
              A pioneer in scholarly, open access publishing, MDPI has supported
              academic communities since 1996. Based in Basel, Switzerland, MDPI
              has the mission to foster open scientific exchange in all forms,
              across all disciplines.
            </p>
            <p>
              Our 450 diverse and open access journals, including 441
              peer-reviewed journals and 9 conference journals, are supported by
              more than 295,000 academic experts who share our mission, values,
              and commitment to providing high-quality service for our authors.
              We serve scholars from around the world to ensure the latest
              research is freely available and all content is distributed under
              a Creative Commons Attribution License (CC BY).
            </p>
            <p>
              MDPI’s portfolio comprises at least 237 journals with impact
              factors, 72% of which are ranked in the top 2 quartiles of their
              respective fields. To view the current impact factors for MDPI
              journals (according to the Journal Citation Reports), please visit
              our yearly announcement page here.
            </p>
            <p>
              With additional offices in Beijing, Wuhan, Tianjin and Nanjing
              (China), Barcelona (Spain), Belgrade and Novi Sad (Serbia),
              Manchester (UK), Tokyo (Japan), Cluj and Bucharest (Romania),
              Toronto (Canada), Kraków (Poland), Singapore (Singapore), Bangkok
              (Thailand) and Seoul (Republic of Korea), MDPI has published the
              research of more than 330,000 individual authors and our journals
              receive more than 25 million monthly webpage views.
            </p>
          </div>
        </section>
        <section>
          <h1 className="text-xl font-bold text-slate-700">
            Indexing of MDPI Journals
          </h1>
          <div className="text-xs space-y-4 mt-3">
            <p>
              At MDPI, we aim to continuously expand coverage of our
              publications within the following main academic databases:
            </p>
            <li className="font-bold text-xs text-slate-600 hover:underline">
              Scopus
            </li>
            <li className="font-bold text-xs text-slate-600 hover:underline">
              Web of Science
            </li>
            <li className="font-bold text-xs text-slate-600 hover:underline">
              PMC, PubMed, and MEDLINE
            </li>
            <p>
              In addition to the main databases, we also focus on ensuring
              coverage of our journals within as many scope-specific databases
              as possible, in order to increase visibility for our authors, and
              further disseminate their impactful data. Moreover, we also work
              with various universities and government organizations, to ensure
              that our journals are listed within country-specific journal
              ranking lists that are often required by funders or institutions
              for authors to publish with a journal.
            </p>
            <p>
              Furthermore, all MDPI journals are digitally preserved
              cover-to-cover, by the Swiss National Library and CLOCKSS,
              ensuring long-term archival of all of our publications.
            </p>
          </div>
        </section>
        {/* blehhh */}
        <section>
          <h1 className="text-xl font-bold text-slate-700">
            All Content is Open Access and Free for Readers
          </h1>
          <div className="text-xs space-y-4 mt-3">
            <p>
              Journals published by MDPI are fully open access: research
              articles, reviews or any other content on this platform is
              available to everyone free of charge. To be able to provide open
              access journals, we finance publication through article processing
              charges (APC); these are usually covered by the authors institutes
              or research funding bodies. Read more about our open access
              policy.
            </p>
          </div>
        </section>
        {/* bleh */}
        <section>
          <h1 className="text-xl font-bold text-slate-700">
            MDPI Publication Ethics Statement
          </h1>
          <div className="text-xs space-y-4 mt-3">
            <p>
              MDPI is a member of the Committee on Publication Ethics (COPE).
              MDPI takes the responsibility to enforce a rigorous peer-review
              together with strict ethical policies and standards to ensure to
              add high quality scientific works to the field of scholarly
              publication. Unfortunately, cases of plagiarism, data
              falsification, inappropriate authorship credit, and the like, do
              arise. MDPI takes such publishing ethics issues very seriously and
              our editors are trained to proceed in such cases with a zero
              tolerance policy. To verify the originality of content submitted
              to our journals, we use iThenticate to check submissions against
              previous publications.
            </p>
          </div>
        </section>
        {/* bleh */}
      </div>
    </div>
  );
}
