import React from 'react';
import { SelectInput } from '../../UI';

export default function FindJournal() {
  const [formData, setFormData] = React.useState({
    title: '',
    abstract: '',
    impact: '',
    apc: '',
  });

  function handleChange(identifier, value) {
    setFormData({
      ...formData,
      [identifier]: value,
    });
  }

  const JOURNAL_OPTIONS = [
    { value: 'biology', label: 'Only jornals with important factor' },
    { value: 'english', label: 'Only jornals without important factor' },
    { value: 'maths', label: 'Journals with or without important factor' },
  ];
  console.log(formData);
  return (
    <div className="bg-white p-8 text-slate-700 flex flex-col gap-5 text-xs">
      <h1 className="text-slate-700 text-2xl font-bold">Journal Finder</h1>
      <p className="text-sm py-2">
        Our search tool uses state-of-the-art technology to match your research
        paper to MDPI Journals. Simply search to find the best suited journals
        for your paper.
      </p>
      <p>
        <label>Title</label>
        <input
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          type="text"
          placeholder="Search by title or keywords"
          className="w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
      <p>
        <label>Abstract</label>
        <textarea
          value={formData.abstract}
          onChange={(e) => handleChange('abstract', e.target.value)}
          type="text"
          placeholder="Search by title or keywords"
          className="h-32 w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
      <p className="flex md:flex-row flex-col items-start md:items-center md:gap-8">
        <span className="flex-1 w-full">
          <label>impact factor</label>
          <SelectInput
            value={formData.impact}
            optionLabel={'label'}
            optionValue={'value'}
            onChange={(e) => handleChange('impact', e.target.value)}
            options={JOURNAL_OPTIONS}
          />
        </span>
        <span className="flex-1 w-full">
          <label>maximum APC</label>
          <input
            value={formData.apc}
            onChange={(e) => handleChange('apc', e.target.value)}
            type="text"
            placeholder="Search by title or keywords"
            className="w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
          />
        </span>
      </p>
      <p>
        <button className="p-1.5 w-20 bg-slate-600 rounded-md text-stone-100 text-xs text-center hover:bg-slate-800 transition-bg ease-in-out duration-200">
          Search
        </button>
      </p>
    </div>
  );
}
