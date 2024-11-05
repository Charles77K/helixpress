import { useState } from 'react';
import {
  useFetchIssues,
  useFetchJournals,
  useFetchVolumes,
} from '../components/Tanstack';
import SelectComponent from '../components/SelectComponent';

export default function ViewIssues() {
  const [journalId, setJournalId] = useState('');
  const [jounalName, setJournalName] = useState('');
  const [volumeName, setVolumeName] = useState('');
  const [volumeId, setVolumeId] = useState('');
  const [formData, setFormData] = useState({
    volume: '',
    journal: '',
  });

  const { data, isError, isLoading } = useFetchJournals();
  const { isVolumeError, isVolumeLoading, volumeData } = useFetchVolumes({
    id: journalId,
  });
  const { issuesData, isIssuesError, isIssuesLoaing } = useFetchIssues({
    id: volumeId,
  });
  console.log(issuesData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'journal') {
      const selectedJournal = data.find((journal) => journal.name === value);
      console.log(selectedJournal.id);
      if (selectedJournal) {
        setJournalName(selectedJournal.name);
        setJournalId(selectedJournal.id);
        setFormData({
          ...formData,
          journal: selectedJournal.name,
          volume: '',
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value, // Set the appropriate field value
      });
    }
  };

  const handleVolumeChange = (e) => {
    const { name, value } = e.target;
    if (name === 'volume') {
      const selectedVolumes = volumeData.find(
        (volumes) => volumes.number == value
      );
      console.log(selectedVolumes.id);
      if (selectedVolumes) {
        setVolumeName(selectedVolumes.number);
        setVolumeId(selectedVolumes.id);
        setFormData({
          ...formData,
          volume: selectedVolumes.number,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value, // Set the appropriate field value
      });
    }
  };

  console.log(formData);

  let content;

  if (isIssuesLoaing) {
    content = <p className="text-center text-gray-500">Loading...</p>;
  } else if (isIssuesError) {
    content = (
      <p className="text-center text-red-500">Error loading journals.</p>
    );
  } else if (issuesData && issuesData.length > 0) {
    content = issuesData.map((issue, index) => (
      <ul key={index} className="border-b border-gray-200 p-4">
        <li className="flex flex-col gap-2 text-slate-700">
          <p className="text-sm font-bold">
            {(formData.volume && issue.number) ||
              'chooose a volume to see the issues'}
          </p>
        </li>
      </ul>
    ));
  } else if (issuesData && !issuesData.length > 0) {
    content = (
      <p className="text-gray-500">{formData.volume && 'issues found'}</p>
    );
  }

  return (
    <div className=" flex flex-col gap-4 w-full h-screen mx-auto bg-white shadow-md p-6 rounded-lg justify-items-center">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">View Issues</h2>

      {/* Journals */}
      <SelectComponent
        name="journal"
        isError={isError}
        isLoading={isLoading}
        options={data}
        label="Journals"
        onChange={handleChange}
        value={formData.journal}
        optionValue={(journal) => journal.name}
        optionMain={(journal) => journal.name}
      />

      {/* Volumes */}
      <SelectComponent
        name="volume"
        isError={isVolumeError}
        isLoading={isVolumeLoading}
        options={volumeData}
        label="Volumes"
        onChange={handleVolumeChange}
        value={formData.volume}
        optionValue={(volume) => volume.number}
        optionMain={(volume) => volume.number}
      />

      <div>
        {formData.volume && (
          <h2 className="font-semibold text-sm">
            Issues for volume
            <span className="text-bold text-[15px]"> {volumeName}</span> in{' '}
            {jounalName}
          </h2>
        )}
      </div>
      {content}
    </div>
  );
}
