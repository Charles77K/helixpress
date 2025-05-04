import { useState } from 'react';
import NewJournal from './NewJournal';

import { IoMdRemoveCircleOutline } from 'react-icons/io';

export default function JournalProposal() {
  const [newJournal, setNewJournal] = useState({
    editorInChief: '',
    proposedTitle: '',
    aimsScope: '',
    otherInfo: '',
  });
  const [personalInfo, setPersonalInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    affiliations: [''], // Start with one empty affiliation
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewJournal({
      ...newJournal,
      [name]: value,
    });
  }

  const handleAddAffiliation = () => {
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      affiliations: [...prevInfo.affiliations, ''], // Add a new empty input field
    }));
  };

  const handleAffiliationChange = (index, value) => {
    setPersonalInfo((prevInfo) => {
      const updatedAffiliations = [...prevInfo.affiliations];
      updatedAffiliations[index] = value;
      return {
        ...prevInfo,
        affiliations: updatedAffiliations,
      };
    });
  };
  const handleRemoveAffiliation = (index) => {
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      affiliations: prevInfo.affiliations.filter((_, i) => i !== index), // Remove input at specified index
    }));
  };

  const AffiliationItem = ({ affiliation, index, onRemove }) => {
    return (
      <div className="flex items-center mb-2">
        <input
          value={affiliation}
          onChange={(e) => handleAffiliationChange(index, e.target.value)}
          type="text"
          required
          className="w-[75%] border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none mr-2"
        />
        {personalInfo.affiliations.length > 1 && (
          <button type="button" onClick={onRemove}>
            <IoMdRemoveCircleOutline color="#800000" size={25} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white md:px-16 px-8 py-8 text-slate-700 flex flex-col gap-5 text-xs">
      <h1 className="text-slate-700 text-2xl font-bold">Journal Proposal</h1>
      <p>
        MDPI invites experts and scholars in various fields to submit proposals
        for new journals here.
      </p>
      <p>
        If your institution (university, institute, college, national key
        laboratory, society, etc.) intends to establish a journal, you can also
        submit a draft to MDPI on its behalf.
      </p>
      <div>
        <button
          className={'border-[0.5px] border-gray-300 p-2 hover:underline'}
        >
          New Journal
        </button>

        <hr></hr>
      </div>
      {/* personal information */}
      <h1 className="font-bold text-xl">Personal Information</h1>
      <p className="grid md:grid-cols-2 grid-col-1 items-start md:items-center md:gap-8">
        <span>
          <label>First name</label>
          <span className="relative bottom-1"> req</span>
          <input
            value={personalInfo.firstname}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, firstname: e.target.value })
            }
            type="text"
            required
            className="w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
          />
        </span>
        <span>
          <label>Last name</label>
          <span className="relative bottom-1"> req</span>
          <input
            value={personalInfo.lastname}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, lastname: e.target.value })
            }
            type="text"
            required
            className="w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
          />
        </span>
        <span>
          <label>Email (academic)</label>
          <span className="relative bottom-1"> req</span>
          <input
            value={personalInfo.email}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, email: e.target.value })
            }
            type="email"
            required
            className="w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
          />
        </span>
      </p>
      {/* affiliations */}
      <p>
        <label>Affiliations</label>
        <span className="relative bottom-1"> req</span>
      </p>
      {personalInfo.affiliations.map((affiliation, index) => (
        <AffiliationItem
          key={index}
          affiliation={affiliation}
          index={index}
          onRemove={() => handleRemoveAffiliation(index)}
        />
      ))}
      <button
        className="border-[0.5px] border-gray-300 w-1/2 p-2 rounded-md hover:bg-slate-600 hover:text-stone-50 text-sm"
        onClick={handleAddAffiliation}
      >
        Add new affiliation
      </button>
      <div>
        <NewJournal formValues={newJournal} Changer={handleInputChange} />
      </div>
      <div>
        <h1 className="font-bold text-xl mb-4">Validate and Submit Form</h1>
        <button className="border-[0.5px] border-gray-300 w-1/2 p-1.5 rounded-md bg-slate-600 text-stone-50 text-sm">
          Submit
        </button>
      </div>
    </div>
  );
}
