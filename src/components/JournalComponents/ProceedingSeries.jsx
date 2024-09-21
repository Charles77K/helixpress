// import React from 'react'

const SOME_SHIT = [
  { topic: 'Open Access', body: 'Unlimited and free access for readers' },
  {
    topic: 'A dedicated webpage for your conference',
    body: 'Containing all conference papers and a description of the conference, along with links to the conference homepage',
  },
  {
    topic: 'FLexibility',
    body: 'All kinds of outputs from the conferences can be included in the related conference proceedings journals, including abstracts, proceedings, posters, etc.',
  },
  {
    topic: 'High visibility',
    body: 'All published items will be assigned a digital object identifier (DOI) and are thus citable, available on mdpi.com, and they appear on search engines such as Google Scholar',
  },
  {
    topic: 'No space constraints or color charges',
    body: 'No restriction on the number of the papers in an issue, number of figures, or use of color.',
  },
  {
    topic: 'Attractive cover',
    body: 'Designed by our professional in-house design team',
  },
  {
    topic: 'Sciforum support',
    body: 'Optionally use of our free, professional platform to host your scientific conference, including the conference website, peer-review, and many additional features',
  },
  {
    topic: 'Additional services available',
    body: 'Options include English Editing, XML conversion, abstracts delivered on USB drives, printed books, etc',
  },
  {
    topic: 'Promotion',
    body: 'Promotion of your conference on MDPI journal websites, through newsletters and social media',
  },
];

export default function ProceedingSeries() {
  return (
    <div className="text-slate-700 bg-white md:px-16 px-8 py-8 text-xs flex flex-col align-start gap-5">
      <section>
        <h1 className="text-2xl font-bold">MDPI Proceeding Journals</h1>
        <p className="leading-5 my-3">
          MDPI publishes a series of open access conference journals in all
          research fields. These journals provide a high quality service and are
          dedicated to making the output of conferences widely available. If you
          are organizing an academic conference and are interested in our
          services, please click the &quot;Submit a Proposal&quot; link to get a
          quotation
        </p>
        <button className="text-white bg-slate-600 px-3 py-2 rounded-md font-semibold">
          Submit a Proposal
        </button>
      </section>
      {/* benefits on conference */}
      <section>
        <h1 className="text-xl font-bold">Benefits for your Conference</h1>
        {SOME_SHIT.map((shit, index) => (
          <ul key={index} className="flex flex-col gap-2">
            <li className="py-1 list-disc">
              <span className="font-semibold leading-5">{shit.topic}:</span>
              <span className="ml-1">{shit.body}</span>
            </li>
          </ul>
        ))}
      </section>
      <section className="space-y-2">
        <h1 className="text-xl font-bold">
          Peer-Review Process of Proceedings Series Journals
        </h1>
        <p className="leading-5">
          All published items are approved by the conference committee, and
          original research content is peer-reviewed. The following two peer
          review forms are applied to proceedings journals:
        </p>
        <p className="leading-5">
          1. Coordinated by the conference committee: single- or double-blind
          peer review is decided by the conference organizer; conference chairs
          serve as the academic editors to perform the final assessment.
        </p>
        <p className="leading-5">
          2. Coordinated by an MDPI staff member: single-blind peer review;
          suggestions of reviewers can be made by the academic editor during the
          precheck. Alternatively, MDPI editorial staff will use qualified
          Advisory Board Members, qualified reviewers from our database, or new
          reviewers identified by web searches for related articles, and the
          journal’s Advisory Board Members serve as the academic editors to make
          the final decision.
        </p>
      </section>
    </div>
  );
}
