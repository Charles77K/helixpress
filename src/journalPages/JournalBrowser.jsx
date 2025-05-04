import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import SelectComponent from '../admin/components/SelectComponent';
import Error from '../utils/Error';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useFetchById } from '../services/hooks';
import NotFound from '../components/NotFound';

export default function JournalBrowser({ journalId }) {
  const [volumeId, setVolumeId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    volume: '',
    issue: '',
  });

  const {
    data,
    isLoading: isVolumeLoading,
    isError: isVolumeError,
  } = useFetchById('/journals/:id/volumes', journalId);

  // Added null check before accessing data.results
  const volumeData = !isVolumeLoading && data?.results ? data.results : [];

  const {
    data: issuesData,
    isError: isIssuesError,
    isLoading: isIssuesLoading,
  } = useFetchById('/volumes/:id/issues', volumeId);

  // Added null check and only fetch issues when volumeId exists
  // const issuesData = !isIssuesLoading && dataIssue?.results ? dataIssue.results : [];

  // Reset issue selection when volume changes
  useEffect(() => {
    if (volumeId) {
      setFormData((prev) => ({
        ...prev,
        issue: '',
      }));
    }
  }, [volumeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'volume') {
      // Use strict equality and add null check
      const selectedVolume = volumeData?.find(
        (volume) => volume.number === value || volume.number === Number(value)
      );
      if (selectedVolume) {
        setVolumeId(selectedVolume.id);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your navigation logic here, for example:
    // navigate(`/journals/${journalId}/volumes/${volumeId}/issues/${formData.issue}`);
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
          chooseStyle="block w-full md:w-full p-2 text-xs bg-gray-100 border border-gray-300 rounded"
          name="volume"
          label="Volume"
          onChange={handleChange}
          optionMain={(volume) => volume.number}
          optionValue={(volume) => volume.number}
          options={volumeData || []}
          value={formData.volume}
        />

        {/* Issue - Only show when volume is selected */}
        {formData.volume && (
          <SelectComponent
            isError={isIssuesError}
            isLoading={isIssuesLoading}
            chooseStyle="block w-full text-xs p-2 bg-gray-100 border border-gray-300 rounded"
            name="issue"
            label="Issue"
            onChange={handleChange}
            optionMain={(issue) => issue.number}
            optionValue={(issue) => issue.number}
            options={issuesData?.results || []}
            value={formData.issue}
            isDisabled={isIssuesLoading || issuesData.length === 0}
          />
        )}

        {/* cta */}
        <button
          type="submit"
          disabled={!formData.volume || !formData.issue}
          className={`block w-full p-2 mt-4 text-xs rounded-md ${
            !formData.volume || !formData.issue
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-slate-600 hover:bg-slate-800 text-white'
          }`}
        >
          Go
        </button>

        {/* show volumes for this journal */}
        <section className="mt-4">
          {isVolumeLoading && (
            <div className="animate-pulse space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded w-full h-5"></div>
              ))}
            </div>
          )}

          {isVolumeError && (
            <Error text="Error fetching volumes" title="Error" />
          )}

          {!isVolumeLoading && !isVolumeError && volumeData.length > 0
            ? volumeData.map((vol) => (
                <ul key={vol.id} className="flex flex-col gap-1">
                  <li
                    className={`text-sm hover:underline cursor-pointer ${
                      formData.volume === vol.number
                        ? 'font-bold text-blue-600'
                        : ''
                    }`}
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, volume: vol.number }));
                      setVolumeId(vol.id);
                    }}
                  >
                    Vol. {vol.number} ({vol.year || '2024'})
                  </li>
                </ul>
              ))
            : !isVolumeLoading && (
                <NotFound
                  label="Volumes"
                  message={'No volumes found for this journal'}
                />
              )}
        </section>
      </form>
    </div>
  );
}

JournalBrowser.propTypes = {
  journalId: PropTypes.string.isRequired,
};
