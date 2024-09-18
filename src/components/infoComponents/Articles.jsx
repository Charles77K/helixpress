// import React from 'react'

import { ARTICLES } from '../DOCS';

export default function Articles() {
  return (
    <div className="bg-white p-8 flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-700">
          Article Processing Charges (APC) Information
        </h1>
        <h1 className="text-xl font-bold text-slate-800">Contents</h1>
        {ARTICLES.map((item, id) => (
          <ul key={id}>
            <li>
              <a
                href={`#${item.section}`}
                className="text-xs hover:underline text-slate-700 font-semibold py-2 space-x-2"
              >
                <span>{item.id}</span> <span>{item.title}</span>
              </a>
            </li>
          </ul>
        ))}
      </div>
      {/* guide 1 */}
      <div id="section1">
        <h1 className="text-xl font-bold text-slate-800">
          General Information on MDPI’s Article Processing Charges (APC)
        </h1>
        <p className="text-xs leading-5 my-3">
          MDPI publishes all its journals in full open access, meaning unlimited
          use and reuse of articles, in addition to giving credit to the
          authors. All of our articles are published under a Creative Commons
          (CC BY) license.
        </p>
        <p className="text-xs leading-5">
          Authors pay a one-time Article Processing Charge (APC) to cover the
          costs of peer review administration and management, professional
          production of articles in PDF and other formats, and dissemination of
          published papers in various venues, in addition to other publishing
          functions. Please note that the option to process an advance payment
          remains but does not guarantee acceptance of manuscripts. There are no
          charges for rejected articles, no submission charges, and no
          surcharges based on the length of an article, figures or supplementary
          data. Some items (Editorials, Corrections, Addendums, Retractions,
          Comments, etc.) are published free of charge.
        </p>
      </div>
      {/* guide 2 */}
      <div id="section2">
        <h1 className="text-xl font-bold text-slate-800">
          Journal Specific APCs
        </h1>
        <p className="text-xs leading-5">
          MDPI journals uphold a rigorous peer-review process together with
          clear ethical policies and standards to support the addition of
          high-quality scientific studies to the field of scholarly publication.
          Where we become aware of ethical issues, we are committed to
          investigating and taking necessary action to maintain the integrity of
          the literature and ensure the safety of research participants.
        </p>
      </div>
      {/* guide 3 */}
      <div id="section3">
        <h1 className="text-xl font-bold text-slate-800">
          Market-Specific Taxes
        </h1>
        <p className="text-xs leading-5 my-3">
          Authors from Switzerland will have the local Value Added Tax (VAT)
          added to their invoices. Japan residents will have the Japanese
          Consumption Tax (JCT) added to their invoices at the rate set by the
          Japanese government.
        </p>
      </div>
      {/* guide 4 */}
      <div id="section4">
        <h1 className="text-xl font-bold text-slate-800">
          Extensive English Editing
        </h1>
        <p className="text-xs leading-5 my-3">
          It is the authors’ responsibility to submit their work in correct
          English. The APC includes only minor English editing, conducted by
          native English speakers. The APC does not include extensive English
          editing. If extensive editing is required, your paper could be
          returned to you at the English editing stage of the publication
          process. This could delay the publication of your work. You may have
          your work reviewed by an experienced English-speaking colleague or use
          a paid language-editing service before submitting your paper for
          publication. We offer rapid English editing, completed in 1 day, here:
          Author Services. Vouchers that have been obtained for providing peer
          review can be used to pay for Author Services professional English
          editing.
        </p>
      </div>
    </div>
  );
}
