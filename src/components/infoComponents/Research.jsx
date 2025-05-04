// import React from 'react';
import { CONTENT } from '../DOCS';

export default function Research() {
  return (
    <div className="bg-white p-8 flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-700">Contents</h1>
      </div>
      <div>
        <h1 className="text-xl font-bold text-slate-800">Contents</h1>
        {CONTENT.map((item, id) => (
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
        <h1 className="text-xl font-bold text-slate-800">MDPI Statement</h1>
        <p className="text-xs leading-5 my-3">
          All submitted manuscripts must conform to MDPI’s policies as
          described. In all instances, MDPI closely follows the Committee on
          Publication Ethics (COPE) principles of publication ethics laid out in
          its core practices documents. Their advice includes support on
          handling issues such as: conflicts of interest, authorship and
          contributorship issues and disputes, misconduct allegations and data
          issues, overlap and plagiarism, and peer review integrity.
        </p>
        <p className="text-xs leading-5">
          MDPI Editorial Boards are independent, and the publisher will not
          interfere with editorial decision making. Where ethical or legal
          concerns are present, a decision may be changed; acceptance of a
          manuscript may be rescinded should an ethical issue or conflict with
          policies be identified. Manuscripts that do not conform to MDPI
          ethical policies may be withdrawn from submission by the publisher.
        </p>
        <p className="text-xs leading-5">
          MDPI performs checks on all manuscripts to confirm that they conform
          with the Publication Ethics Guidelines. Some of the checks described
          are performed with the support of automatic checks, facilitated by
          SuSy, while others are performed manually by the Journal Editorial
          Office teams. Where potential issues are flagged, these are confirmed
          by a human decision maker. Where a manuscript does not conform to
          policies or is flagged upon check, in many cases, an Academic Editor
          is consulted.
        </p>
      </div>
      {/* guide 2 */}
      <div id="section2">
        <h1 className="text-xl font-bold text-slate-800">
          Publication Ethics Statement
        </h1>
        <p className="text-xs leading-5 my-3">
          MDPI is a member of COPE. We fully adhere to its Core Practices and to
          its Guidelines.
        </p>
        <p className="text-xs leading-5">
          MDPI journals uphold a rigorous peer-review process together with
          clear ethical policies and standards to support the addition of
          high-quality scientific studies to the field of scholarly publication.
          Where we become aware of ethical issues, we are committed to
          investigating and taking necessary action to maintain the integrity of
          the literature and ensure the safety of research participants.
        </p>
        <p className="text-xs leading-5">
          Submitted manuscripts should conform with MDPI editorial policies and
          ethical policies as outlined on this webpage and MDPI Instructions for
          Authors. In addition, submissions should adhere to individual journal
          guidelines. is consulted.
        </p>
      </div>
      {/* guide 3 */}
      <div id="section3">
        <h1 className="text-xl font-bold text-slate-800">
          Ethical Guidelines for Authors
        </h1>
        <p className="text-xs leading-5 my-3">
          Authors submitting to MDPI journals must ensure that their manuscripts
          are ethically sound and meet industry-recognized standards that are
          reflected in MDPI policies.
        </p>
        <p className="text-xs leading-5">
          Accurately present their research findings and include an objective
          discussion of the significance of their findings. Uphold accurate
          authorship, by including all and only those who qualify for authorship
          and clearly stating their contribution. Disclose any facts that might
          be perceived as a possible conflict of interest at submission. Present
          their data and methods with attention to detail. Data and methods used
          in the research need to be presented in sufficient detail in the
          manuscript so that other researchers can replicate their work. Raw
          data must be made publicly available unless there is a compelling
          reason otherwise (e.g., patient confidentiality). Be aware that
          simultaneous submission of manuscripts to more than one journal is not
          permitted. Original research results must be novel and not previously
          published, and any translations must abide by our policy on
          translations.
        </p>
      </div>
      {/* guide 4 */}
      <div id="section3">
        <h1 className="text-xl font-bold text-slate-800">Authorship</h1>
        <p className="text-xs leading-5 my-3">
          Authors submitting to MDPI journals must ensure that their manuscripts
          are ethically sound and meet industry-recognized standards that are
          reflected in MDPI policies.
        </p>
        <p className="text-xs leading-5">
          Accurately present their research findings and include an objective
          discussion of the significance of their findings. Uphold accurate
          authorship, by including all and only those who qualify for authorship
          and clearly stating their contribution. Disclose any facts that might
          be perceived as a possible conflict of interest at submission. Present
          their data and methods with attention to detail. Data and methods used
          in the research need to be presented in sufficient detail in the
          manuscript so that other researchers can replicate their work. Raw
          data must be made publicly available unless there is a compelling
          reason otherwise (e.g., patient confidentiality). Be aware that
          simultaneous submission of manuscripts to more than one journal is not
          permitted. Original research results must be novel and not previously
          published, and any translations must abide by our policy on
          translations.
        </p>
      </div>
    </div>
  );
}
