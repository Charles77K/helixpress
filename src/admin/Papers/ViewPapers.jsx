import { useState } from 'react';
import {
  useFetchIssues,
  useFetchJournals,
  useFetchPapers,
  useFetchVolumes,
} from '../components/Tanstack';
import SelectComponent from '../components/SelectComponent';
import Loader from '../../UI/Loader';
import Error from '../../utils/Error';

export default function ViewPaper() {
  const [journalId, setJournalId] = useState();
  const [volumeId, setVolumeId] = useState();
  const [issueId, setIssueId] = useState();
  //   const [paperId, setPaperId] = useState();

  const [formData, setFormData] = useState({
    volume: '',
    issue: '',
    journal: '',
  });

  const { volumeData, isVolumeLoading, isVolumeError } = useFetchVolumes({
    id: journalId,
  });
  const { data, isError, isLoading } = useFetchJournals();
  const { issuesData, isIssuesError, isIssuesLoading } = useFetchIssues({
    id: volumeId,
  });
  const { paper, isPaperLoading, isPaperError } = useFetchPapers({
    id: issueId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'journal') {
      const selectedJournal = data?.find((journal) => journal.name === value);
      if (selectedJournal) {
        setJournalId(selectedJournal.id);
        setFormData({
          ...formData,
          volume: '',
          issue: '',
        });
        setIssueId('');
        setVolumeId('');
      }
    }

    if (name === 'volume') {
      const selectedVolume = volumeData?.find(
        (volume) => volume.number == value
      );
      if (selectedVolume) {
        setVolumeId(selectedVolume.id);
        setFormData({
          ...formData,
          issue: '',
        });
      }
    }

    if (name === 'issue') {
      const selectedIssue = issuesData?.find((issue) => issue.number == value);
      if (selectedIssue) {
        setIssueId(selectedIssue.id);
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  let content;

  if (isPaperLoading) {
    content = (
      <p>
        <Loader />
      </p>
    );
  } else if (isPaperError) {
    content = (
      <p>
        <Error
          title={'Error'}
          text={'Error fetching papers! please try again later'}
        />
      </p>
    );
  } else if (paper && paper.length > 0) {
    content = (
      <>
        {paper.map((paper, index) => (
          <ul key={index} className="border-b border-gray-200 p-3 space-y-2">
            <li className="text-xl font-bold text-gray-900">
              Title: {paper.title}
            </li>
            <li className="text-sm text-gray-700">Author: {paper.author}</li>
            <li className="text-sm text-gray-700">
              Institution: {paper.institution}
            </li>
            <li className="text-sm text-gray-700">
              Keywords: {paper.keywords}
            </li>
            <li className="text-sm text-gray-700">DOI: {paper.doi}</li>
            <li className="text-sm text-gray-700">Issue: {paper.issue}</li>
            <li className="text-sm text-gray-700">Volume: {paper.volume}</li>
            <li className="text-sm text-gray-700">
              Editor&#39;s Choice: {paper.editorsChoice ? 'Yes' : 'No'}
            </li>
            <li className="text-sm text-gray-700">
              Date Created: {new Date(paper.date_created).toLocaleDateString()}
            </li>
          </ul>
        ))}
      </>
    );
  } else if (paper && !paper.length > 0) {
    content = <p>No paper found</p>;
  }

  return (
    <div className="w-full h-screen mx-auto bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Edit Paper</h2>
      {/* Journal */}
      <SelectComponent
        isError={isError}
        isLoading={isLoading}
        label="Journal"
        name="journal"
        onChange={handleChange}
        optionMain={(journal) => journal.name}
        optionValue={(journal) => journal.name}
        options={data}
        value={formData.journal}
      />

      {/* Volume */}
      <SelectComponent
        isError={isVolumeError}
        isLoading={isVolumeLoading}
        label="Volume"
        name="volume"
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
        label="Issue"
        name="issue"
        onChange={handleChange}
        optionMain={(issue) => issue.number}
        optionValue={(issue) => issue.number}
        options={issuesData}
        value={formData.issue}
      />
      <div>{content}</div>
    </div>
  );
}
