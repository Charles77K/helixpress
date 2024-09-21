// import React from 'react';

export default function NewJournal({ formValues, Changer }) {
  return (
    <div className="bg-white text-slate-700 flex flex-col gap-5 text-xs">
      <h1 className="font-bold text-xl">New Journal Information</h1>
      <p>
        <label>Potential editor-in-chief</label>
        <span className="relative bottom-1"> req</span>
        <input
          name="editorInChief"
          value={formValues.editorInChief}
          onChange={Changer}
          type="text"
          className="w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
      <p>
        <label>Proposed title</label>
        <textarea
          name="proposedTitle"
          value={formValues.proposedTitle}
          onChange={Changer}
          type="text"
          placeholder="Please type the intended journal title"
          className="h-20 w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
      <p>
        <label>Aims & scope</label>
        <textarea
          name="aimsScope"
          value={formValues.aimsScope}
          onChange={Changer}
          type="text"
          placeholder="Please briefly describe the main topic and areas this journal intend to cover, and types of submission you expect to receive"
          className="h-32 w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
      <p>
        <label>Any other relevant information</label>
        <textarea
          name="otherInfo"
          value={formValues.otherInfo}
          onChange={Changer}
          type="text"
          placeholder="Please enter any other relevant information"
          className="h-32 w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
    </div>
  );
}
