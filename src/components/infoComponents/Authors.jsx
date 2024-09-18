// import React from 'react';

const DATA = [
  'publish thoroughly peer-reviewed journals of high scholarly impact',
  'publish thoroughly peer-reviewed journals of high scholarly impact',
  'publish thoroughly peer-reviewed journals of high scholarly impact',
  'publish thoroughly peer-reviewed journals of high scholarly impact',
  'publish thoroughly peer-reviewed journals of high scholarly impact',
];

export default function Authors() {
  return (
    <div className="bg-white p-8 flex flex-col gap-10">
      <h1 className="text-2xl font-bold text-slate-700">
        Information for Authors
      </h1>
      <div>
        <h1 className="text-xl font-bold text-slate-700">Overview</h1>
        <div className="text-xs space-y-4 mt-3">
          <p>
            MDPI is a publisher of scholarly open access journals. All journals
            uphold a peer-reviewed, rapid, and rigorous manuscript handling and
            editorial process
          </p>
          <p>
            MDPI journals are the perfect place for you to publish your work
            under an open access license, in a fast and straightforward manner.
            Our journals are indexed in the leading databases and, since they
            are open access, have a broad readership.
          </p>
          <p>
            As a pioneer open access publisher, our mission is to make new
            research findings accessible to everyone. We are serving scholars
            from across the globe and from a variety of backgrounds. To deepen
            our understanding of the research communities that we serve, we aim
            to build journals that are just as diverse and inclusive. Only by
            valuing differences can we create an equitable and inclusive work
            environment and foster the openness that is key to our mission.
          </p>
          <p>
            The daily exchange of ideas between the East and the West has been
            at the heart of MDPIs progress from day one. We understand that
            diversity does not end there. More needs to be done to bridge the
            gap between the global North and South—and to create equal
            opportunities for people without regard to race, color, sex, gender
            identity, sexual orientation, age, religion, country of origin,
            physical ability, or socio-economic status. There is no place for
            discrimination on the basis of any one of these characteristics.
          </p>
        </div>
      </div>
      {/* 2 */}
      <div className="flex justify-between">
        <h1 className="text-xl font-bold text-slate-700">
          Manuscript Submission & Instructions for Authors
        </h1>
        <p className="px-6 py-1 text-center hover:bg-slate-800 hover:cursor-pointer border-2 text-slate-800 bg-stone-100 md:w-56 w-full rounded-md hover:text-stone-100 text-sm">
          Propose a Topic
        </p>
      </div>
      {/* 3 */}
      <div className="flex">
        <section>
          {' '}
          <h1 className="text-lg font-bold text-slate-700">
            Authors and Readers Benefit from MDPI’s Pledges to:
          </h1>
          {DATA.map((item, index) => (
            <ul key={index} className="mt-4">
              <li className="text-xs mb-3">{item}</li>
            </ul>
          ))}
        </section>
        <section>
          {' '}
          <h1 className="text-lg font-bold text-slate-700">
            For Authors and Readers Open Access Means:
          </h1>
          {DATA.map((item, index) => (
            <ul key={index} className="mt-4">
              <li className="text-xs mb-3">{item}</li>
            </ul>
          ))}
        </section>
      </div>
      {/* 4 */}
      <div>
        <h1 className="text-xl font-bold text-slate-700">
          Market-Specific Taxes
        </h1>
        <p className="text-xs mt-3">
          Authors from Switzerland will have the local Value Added Tax (VAT)
          added to their invoices. Japan residents will have the Japanese
          Consumption Tax (JCT) added to their invoices at the rate set by the
          Japanese government.
        </p>
      </div>
      {/* 5 */}
      <div>
        <h1 className="text-xl font-bold text-slate-700">
          Extensive English Editing
        </h1>
        <p className="text-xs mt-3 leading-5">
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
      {/* 6 */}
      <div>
        <h1 className="text-xl font-bold text-slate-700">
          Funding of APCs and BPCs
        </h1>
        <p className="text-xs mt-3 leading-5">
          Many funding agencies and institutions explicitly allow the use of
          research grants for the payment of APCs and BPCs for publishing open
          access articles and books. For more information on APC and BPC funding
          see the following page.
        </p>
      </div>
      {/* 7 */}
      <div>
        <h1 className="text-xl font-bold text-slate-700">Discounts on APCs.</h1>
        <p className="text-xs mt-3 mb-2 leading-5">
          Waivers may be granted at the Publishers discretion and should be
          discussed with the editorial office when submitting the article. The
          editorial decision making is decoupled from the authors ability to pay
          the Processing Charges, however authors should consider in advance
          whether they have sufficient funds to cover the full APC/BPC.
        </p>
        <p className="text-xs mb-2 leading-5">
          MDPI also offers discount vouchers to selected reviewers.
        </p>
        <p className="text-xs mb-2 leading-5">
          Authors affiliated with participating universities receive a discount
          on the APC for any paper published in an MDPI journal. Note that only
          one discount through an IOAP scheme is permitted per paper, and that
          the discount can be combined with other available discounts (e.g.,
          reviewer vouchers or discounts offered by the Editorial Office)
        </p>
        <p className="text-xs mb-2 leading-5">
          FMany funding agencies and institutions explicitly allow the use of
          research grants for the payment of APCs and BPCs for publishing open
          access articles and books. For more information on APC and BPC funding
          see the following page.
        </p>
      </div>
    </div>
  );
}
