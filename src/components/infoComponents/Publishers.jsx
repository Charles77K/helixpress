// import React from 'react'

export default function Publishers() {
  return (
    <div>
      <div className="bg-white p-8 flex flex-col gap-10">
        <section className="space-y-4 text-xs">
          <h1 className="text-2xl font-bold text-slate-800">
            MDPI Publishing Services
          </h1>
          <ul className="space-y-1">
            <li className="text-xs font-semibold hover:underline hover:cursor-pointer text-slate-600">
              Managed Journals: Administrative support from MDPI staff
            </li>
            <li className="text-xs font-semibold hover:underline hover:cursor-pointer text-slate-600">
              JAMS: Integrated services to run every aspect of your journal
            </li>
            <li className="text-xs font-semibold hover:underline hover:cursor-pointer text-slate-600">
              Scilit: A database to support your publications
            </li>
          </ul>
          <p>
            MDPI offers services to support academic journal publishers of all
            sizes, including publishers with a single journal, university
            presses, or larger enterprises. By partnering with us, publishers
            can take advantage of simple, rapid, scalable procedures and
            intuitive software that will take attention away from procedural
            details and free up time to focus on journal development.
          </p>
        </section>
        {/* 1 */}
        <div>
          <h1 className="text-xl font-bold text-slate-800">Managed Journals</h1>
          <div className="text-xs space-y-4 mt-3">
            <p>
              Are you running a journal at a university, society or other
              research institution? MDPI can manage your open access journal on
              your behalf. We will assign a dedicated Managing Editor as a
              single point of contact and, depending on the size of the journal,
              Assistant Editors as support. Our staff will handle all
              administrative aspects of the journal, including contact with
              authors and reviewers, marketing, and invoicing. By regular
              contact with the appointed Editor-in-Chief, you can set the
              direction of the journal and maintain oversight of all aspects.
              Please see here for further details or get in touch with Dr. Carla
              Aloè at info-societies@mdpi.com
            </p>
          </div>
        </div>
        {/* 2 */}
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            JAMS: Editorial Support Functions
          </h1>
          <div className="text-xs space-y-3 mt-3">
            <p>
              JAMS (the Journal and Article Management System) is a set of
              services to allow you to run your journal in an efficient way. It
              includes two major aspects: a journal management website and
              supporting production services. We offer a high level of
              flexibility, so you can select the services you need and integrate
              your existing workflow.
            </p>
            <h3 className="text-slate-700 text-sm">
              A Fully Integrated Journal Management Website
            </h3>
            <p>
              JAMS is the submission system behind MDPI’s 451 journals. It is a
              comprehensive, web-based software that integrates:
            </p>
            <ul className="list-disc space-y-1">
              <li>The editorial process</li>
              <li>Production and publication</li>
              <li>invoicing of journal APCs or other costs</li>
              <li>Journal and user management</li>
            </ul>
            <p>
              For futher details, see the{' '}
              <span className="text-slate-600 hover:cursor-pointer"> JAMS</span>{' '}
              website
            </p>
            <h3 className="text-slate-700 text-sm">
              Production Services: From Acceptance to Publication
            </h3>
            <p>
              JAMS also integrates a full production service, taking papers
              accepted for publication and returning a formatted PDF, along with
              other file types and details of the production procedures.
            </p>
            <p>
              Papers can be prepared for publication in as little as one week
              and we offer a 7 day per week service, ensuring minimal delays
              between acceptance and final publication
            </p>
            <p>
              For further details and to request a quotation, see the JAMS
              website or send an email to contact@jams.pub
            </p>
          </div>
        </div>
        {/* 3 */}
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Scilit: A Database to Support Your Publications
          </h1>
          <div className="text-xs space-y-4 mt-3">
            <p>
              Scilit is a comprehensive database of over 153 million scholarly
              articles. It can be searched directly from Scilit and also
              supports functions for publishers, authors and organizations.
            </p>
            <p className="font-semibold">Scitations</p>
            <p>
              Keep authors informed about papers in your journal that cite their
              work. The Scitations function sends an email to authors of cited
              papers informing them about the new publication.
            </p>
            <p className="font-semibold">Reviewer Search</p>
            <p>
              Put in a few keywords and the Scilit search engine will retrieve a
              list of potential reviewers, along with their contact details and
              titles of papers they have published. These can be incorporated
              directly into your submission system to invite
            </p>
            <p className="font-semibold">
              Reviewer Blast (Conflict of interest checker)
            </p>
            <p>
              Editors want to avoid inviting reviewers that have a conflict of
              interest with authors. Scilit can do an automatic check based on
              author names and/or email addresses, and return a percentage
              match. By linking to the original publication, editors can verify
              the full details for themselves.
            </p>
            <p className="font-semibold">SciFeed</p>
            <p>
              Authors can stay up-to-date with latest research from all
              publishers by using customized searches. They receive daily or
              weekly notifications of papers that match their criteria as soon
              as it is added to Scilit, often within hours of publication.
            </p>
          </div>
        </div>
        {/* 4 */}
      </div>
    </div>
  );
}
