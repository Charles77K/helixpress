import PropTypes from 'prop-types';
import { useState } from 'react';
import SelectComponent from '../admin/components/SelectComponent';
import Loader from '../UI/Loader';
import Error from '../utils/Error';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useFetchById } from '../services/hooks';

export default function JournalBrowser({ journalId }) {
  const [volumeId, setVolumeId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    volume: '',
    issue: '',
  });

  const {
    data: volumeData,
    isLoading: isVolumeLoading,
    iisError: isVolumeError,
  } = useFetchById('/journals/:id/volumes', journalId);

  const { issuesData, isIssuesError, isIssuesLoading } = useFetchById(
    '/volumes/:id/issues',
    volumeId
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'volume') {
      const selectedVolume = volumeData.find(
        (volume) => volume.number == value
      );
      setVolumeId(selectedVolume.id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold mb-3 text-xl text-slate-700">
          Journal Browser
        </h1>
        <button
          className="md:hidden text-slate-600 hover:underline"
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          {isOpen ? <IoIosArrowUp size={23} /> : <IoIosArrowDown size={23} />}
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'block' : 'hidden'
        } md:block`}
      >
        {/* Volume */}
        <SelectComponent
          isError={isVolumeError}
          isLoading={isVolumeLoading}
          chooseStyle="block w-full md:w-full p-2 bg-gray-100 border border-gray-300 rounded"
          name="volume"
          label="Volume"
          onChange={handleChange}
          optionMain={(volume) => volume.number}
          optionValue={(volume) => volume.number}
          options={volumeData}
          value={formData.volume}
        />

        {/* Issue */}
        <SelectComponent
          isError={isIssuesError}
          isLoading={isIssuesLoading}
          chooseStyle="block w-full p-2 bg-gray-100 border border-gray-300 rounded"
          name="issue"
          label="Issue"
          onChange={handleChange}
          optionMain={(issue) => issue.number}
          optionValue={(issue) => issue.number}
          options={issuesData}
          value={formData.issue}
        />

        <button
          type="submit"
          className="block w-full p-2 bg-gray-300 hover:bg-slate-800 text-white mt-4 rounded-md"
        >
          Go
        </button>
        <section className="mt-4">
          {isVolumeLoading && <Loader />}
          {isVolumeError && (
            <Error text="Error fetching volumes" title="Error!!" />
          )}
          {volumeData && volumeData.length > 0 ? (
            volumeData.map((vol, index) => (
              <ul key={index} className="flex flex-col gap-1">
                <li className="text-sm hover:underline cursor-pointer">
                  Vol. {vol.number} (2024)
                </li>
              </ul>
            ))
          ) : (
            <p>No volume found</p>
          )}
        </section>
      </form>
    </div>
  );
}

JournalBrowser.propTypes = {
  journalId: PropTypes.string.isRequired,
};
