import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { PostJournals, queryClient } from '../../utils/http';


export default function CreateJournal() {
  const [formData, setFormData] = useState({
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
  });
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: PostJournals,
    onSuccess: () => {
      console.log('Form data sent successfully');
      queryClient.invalidateQueries['journals'];
      setFormData({
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
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    mutate({ journalsData: form });
  };

  let content;

  if (isPending) {
    content = <div className="p-4 bg-red text-xs">Loading...</div>;
  }
  if (isError) {
    content = <div className="p-4 bg-red text-xs">{error.message}</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto bg-white shadow-md p-6 rounded-lg"
    >
      {content}
      <h2 className="text-3xl font-bold mb-6 text-slate-800">
        Create a Journal
      </h2>

      {/* Name */}
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

      {/* About */}
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

      {/* Abbreviation */}
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

      {/* Impact */}
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

      {/* Picture */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Upload Picture
        </label>
        <input
          type="file"
          name="pic"
          onChange={handleChange}
          accept="image/*"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* ISSN */}
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

      {/* Aim & Scope */}
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

      {/* Reviewer's Board */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Reviewer`&apos;`s Board
        </label>
        <textarea
          name="reviewer_board"
          value={formData.reviewer_board}
          onChange={handleChange}
          rows="5"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Author Instructions */}
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

      {/* Article Processing Charge */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Article Processing Charge
        </label>
        <textarea
          name="article_processing_charge"
          value={formData.article_processing_charge}
          onChange={handleChange}
          rows="5"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Indexing and Archiving */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Indexing and Archiving
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
        className="w-full bg-slate-700 text-white font-bold py-2 px-4 rounded-md hover:bg-slate-900 transition duration-300"
      >
        {isPending ? 'Submitting....' : 'Sumbit'}
      </button>
    </form>
  );
}
