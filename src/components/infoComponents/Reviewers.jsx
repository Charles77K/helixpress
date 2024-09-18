import React from 'react';
import { SelectInput } from '../homeComponents/Search';
import { REVIEWERS_GUIDE } from '../DOCS';

export default function Reviewers() {
  const [journal, setJournal] = React.useState('');

  function handleChange(event) {
    setJournal(event.target.value);
  }

  const journalOptions = [
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'maths', label: 'Maths' },
    { value: 'physics', label: 'Physics' },
  ];

  const inputStyle =
    'my-3 w-full lg:block my-2 border-slate-800 text-[12px] text-slate-800 border-solid border border-slate-400 placeholder:placeholder-custom-gray placeholder:text-[12px] px-4 py-1 rounded-md items-center focus:outline-none';

  return (
    <div className="bg-white p-8 flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-700">
          Guidelines for Reviewers
        </h1>
        <p className="text-xs leading-5">
          “We are sincerely grateful to scholars who give their time to
          peer-review articles submitted to MDPI journals. Rigorous peer-review
          is the cornerstone of high-quality academic publishing.”
        </p>
        <p className="text-xs leading-5">— The MDPI editorial team.</p>
      </div>

      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Find a journal in your field
        </h1>
        <SelectInput
          value={journal}
          onChange={handleChange}
          placeholder={'All Journals'}
          options={journalOptions}
          className={inputStyle}
        />
        <p className="space-x-3">
          <span className="px-5 py-1 text-center hover:bg-slate-700 hover:cursor-pointer border-2 text-slate-800 bg-white-100 md:w-56 w-40 rounded-md hover:text-stone-100 text-xs">
            Aims and scope
          </span>
          <span className="px-5 py-1 text-center hover:bg-slate-700 hover:cursor-pointer border-2 text-slate-800 bg-white-100 w-40 md:w-56  rounded-md hover:text-stone-100 text-xs">
            Become a Reviewer
          </span>
        </p>
      </div>

      <div>
        <h1 className="text-xl font-bold text-slate-800">Reviewers Guide</h1>
        {REVIEWERS_GUIDE.map((item, id) => (
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
          1. Peer Review and Editorial Procedure
        </h1>
        <p className="text-xs leading-5 my-3">
          Peer review is an essential part of the publication process and it
          ensures that MDPI maintains the highest quality standards for its
          published papers. All manuscripts submitted to our journals are
          strictly and thoroughly peer-reviewed by experts.
        </p>
        <p className="text-xs leading-5">
          Immediately after submission, the journal’s Managing Editor will
          perform a technical pre-check of the manuscript. A suitable academic
          editor will be notified of the submission and invited to perform an
          editorial pre-check and recommend reviewers. Academic editors can
          decide to continue with the peer review process, reject a manuscript,
          or request revisions before peer-review. In the case of continuing the
          peer review process, the Editorial Office will organize the peer
          review, which is performed by independent experts, and collect at
          least two review reports per manuscript. We ask authors for sufficient
          revisions (with a second round of peer review, when necessary) before
          a final decision is made. The final decision is made by an academic
          editor (usually the Editor-in-Chief/Editorial Board Member of a
          journal or the Guest Editor of a Special Issue). Accepted manuscripts
          are then copy-edited and English-edited internally. More details about
          the editorial process can be found here. A brochure for the reviewers
          can be found here.
        </p>
      </div>
      {/* guide 2 */}
      <div id="section2">
        <h1 className="text-xl font-bold text-slate-800">
          2. Reviewers’ Profile and Responsibilities
        </h1>
        <p className="text-xs leading-5 my-3">
          Peer review is an essential part of the publication process and it
          ensures that MDPI maintains the highest quality standards for its
          published papers. All manuscripts submitted to our journals are
          strictly and thoroughly peer-reviewed by experts.
        </p>
        <p className="text-xs leading-5">
          Immediately after submission, the journal’s Managing Editor will
          perform a technical pre-check of the manuscript. A suitable academic
          editor will be notified of the submission and invited to perform an
          editorial pre-check and recommend reviewers. Academic editors can
          decide to continue with the peer review process, reject a manuscript,
          or request revisions before peer-review. In the case of continuing the
          peer review process, the Editorial Office will organize the peer
          review, which is performed by independent experts, and collect at
          least two review reports per manuscript. We ask authors for sufficient
          revisions (with a second round of peer review, when necessary) before
          a final decision is made. The final decision is made by an academic
          editor (usually the Editor-in-Chief/Editorial Board Member of a
          journal or the Guest Editor of a Special Issue). Accepted manuscripts
          are then copy-edited and English-edited internally. More details about
          the editorial process can be found here. A brochure for the reviewers
          can be found here.
        </p>
      </div>
    </div>
  );
}
