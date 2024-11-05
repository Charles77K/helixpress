import { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { editJournal, getJournals, queryClient } from '../../utils/http';
import Loader from '../../UI/Loader';
import Error from '../../utils/Error';
import { toast } from 'react-toastify';
4;

const initialForm = {
  name: '',
  about: '',
  abbrv: '',
  impact: '',
  pic: null,
  issn: '',
  aim_scope: '',
  reviewer_board: '',
  author_instructions: '',
  article_processing_charge: '',
  indexing_and_archiving: '',
  visibility: '',
  rapid_publication: '',
  rank: '',
  cite_score: '',
};

export default function EditJournal() {
  const [selectedJournal, setSelectedJournal] = useState(null);
  const imageRef = useRef('');
  const [formData, setFormData] = useState(initialForm);

  const resetForm = () => {
    setFormData(initialForm);
    setImagePreview(null);
    imageRef.current.value = '';
    setSelectedJournal('');
  };

  console.log(formData);

  const {
    data: journals,
    isPending: isJournalLoading,
    isError: isJournalError,
  } = useQuery({
    queryKey: ['journals'],
    queryFn: getJournals,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (selectedJournal) {
      if (typeof selectedJournal.pic === 'string') {
        setImagePreview(selectedJournal.pic);
      } else if (selectedJournal.pic instanceof Blob) {
        setImagePreview(URL.createObjectURL(selectedJournal.pic));
      } else {
        setImagePreview(null);
      }
    }
  }, [selectedJournal]);

  useEffect(() => {
    if (selectedJournal) {
      setFormData({
        name: selectedJournal.name || '',
        about: selectedJournal.about || '',
        abbrv: selectedJournal.abbrv || '',
        impact: selectedJournal.impact || '',
        pic: selectedJournal.pic,
        issn: selectedJournal.issn || '',
        aim_scope: selectedJournal.aim_scope || '',
        reviewer_board: selectedJournal.reviewer_board || '',
        author_instructions: selectedJournal.author_instructions || '',
        article_processing_charge:
          selectedJournal.article_processing_charge || '',
        indexing_and_archiving: selectedJournal.indexing_and_archiving || '',
        visibility: selectedJournal.visibility || '',
        rapid_publication: selectedJournal.rapid_publication || '',
        rank: selectedJournal.rank || '',
        cite_score: selectedJournal.cite_score || '',
      });
    }
  }, [selectedJournal]);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, journalData }) => editJournal({ id, journalData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] });
      toast.success('Journal updated successfully');
      resetForm();
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An error occurred while updating the journal';
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.pic) {
      toast.error('Please upload a file.');
      return;
    }

    const dataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      dataToSubmit.append(key, formData[key]);
    });

    mutate({ id: selectedJournal.id, journalData: dataToSubmit });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
    if (type === 'file' && files[0]) {
      setImagePreview(URL.createObjectURL(files[0]));
    }
  };

  //get the current journal
  const handleSelectChange = (e) => {
    const journalId = e.target.value;
    const journal = journals.find((j) => j.id === journalId);
    setSelectedJournal(journal);
  };

  return (
    <div>
      <div className="w-full p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Select a Journal
        </label>
        <select
          value={selectedJournal ? selectedJournal.id : ''}
          onChange={handleSelectChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="" disabled>
            Select a journal
          </option>
          {isJournalLoading && <option>Loading...</option>}
          {isJournalError && <option>Error fetching data...</option>}
          {journals &&
            journals.map((journal) => (
              <option key={journal.id} value={journal.id}>
                {journal.name}
              </option>
            ))}
        </select>
      </div>

      {isJournalError && <Error text={'Error fetching data'} title={'Error'} />}
      {isJournalLoading && <Loader text="Loading journals..." />}

      {selectedJournal && (
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto bg-white shadow-md p-6 rounded-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-slate-800">
            Edit Journal of {selectedJournal.name}
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Journal Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows="5"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Abbreviation
            </label>
            <input
              type="text"
              name="abbrv"
              value={formData.abbrv}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Impact</label>
            <input
              type="text"
              name="impact"
              value={formData.impact}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Visibility
            </label>
            <input
              type="text"
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Rapid Publication
            </label>
            <input
              type="text"
              name="rapid_publication"
              value={formData.rapid_publication}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Rank</label>
            <input
              type="text"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Cite Score
            </label>
            <input
              type="number"
              step="0.01"
              name="cite_score"
              value={formData.cite_score}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {imagePreview && (
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Current Picture
              </label>
              <img
                src={`https://ogbesomto.pythonanywhere.com/${imagePreview}`}
                alt="Journal"
                className="w-32 h-32 object-cover mb-2"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Upload Picture
            </label>
            <input
              type="file"
              ref={imageRef}
              name="pic"
              onChange={handleChange}
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">ISSN</label>
            <input
              type="text"
              name="issn"
              value={formData.issn}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Aim & Scope
            </label>
            <textarea
              name="aim_scope"
              value={formData.aim_scope}
              onChange={handleChange}
              rows="5"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Reviewers Board
            </label>
            <textarea
              name="reviewer_board"
              value={formData.reviewer_board}
              onChange={handleChange}
              rows="5"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Author Instructions
            </label>
            <textarea
              name="author_instructions"
              value={formData.author_instructions}
              onChange={handleChange}
              rows="5"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Article Processing Charge
            </label>
            <input
              type="text"
              name="article_processing_charge"
              value={formData.article_processing_charge}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Indexing & Archiving
            </label>
            <textarea
              name="indexing_and_archiving"
              value={formData.indexing_and_archiving}
              onChange={handleChange}
              rows="5"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-slate-800 text-white py-3 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isPending ? 'Updating...' : 'Update Journal'}
          </button>
        </form>
      )}
    </div>
  );
}
