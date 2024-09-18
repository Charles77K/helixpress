import { useState } from 'react';
import { useSearch } from '../Context/SearchContext';

export const SelectInput = ({
  value,
  onChange,
  options,
  placeholder,
  className,
}) => (
  <select
    value={value}
    onChange={onChange}
    className={className}
    aria-label={placeholder}
  >
    <option value={''}>{placeholder}</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
export const inputStyle =
  'lg:w-50 border-slate-800 text-[12px] text-slate-800 border-solid border border-slate-400 placeholder:placeholder-custom-gray placeholder:text-[11px] px-4 py-1 rounded-md items-center focus:outline-none';

export default function Search() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    journals: '',
    articles: '',
  });

  const { isSearchOpen } = useSearch();

  const journalOptions = [
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'maths', label: 'Maths' },
    { value: 'physics', label: 'Physics' },
  ];

  const articleOptions = [
    { value: 'research', label: 'Research Article' },
    { value: 'review', label: 'Review Article' },
  ];

  const handleChange = (identifier, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [identifier]: value,
    }));
  };

  return (
    <div
      className={`${
        isSearchOpen ? 'block' : 'hidden'
      } md:flex-row md:px-10 md:gap-3 flex-col flex-wrap md:flex w-full bg-white items-start p-5 md:justify-between gap-2`}
    >
      <div>
        <p className="text-slate-800 text-l font-bold">Search for Articles:</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:flex md:gap-5">
        <input
          type="text"
          placeholder="Title/Keyword"
          className={inputStyle}
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
        <input
          type="text"
          placeholder="Author/Affiliation/Email"
          value={form.author}
          className={inputStyle}
          onChange={(e) => handleChange('author', e.target.value)}
        />
        <SelectInput
          value={form.journals}
          onChange={(e) => handleChange('journals', e.target.value)}
          options={journalOptions}
          placeholder={'All Journals'}
          className={inputStyle}
        />
        <SelectInput
          value={form.articles}
          onChange={(e) => handleChange('articles', e.target.value)}
          options={articleOptions}
          placeholder={'All Article Types'}
          className={inputStyle}
        />
        <button className="p-1 w-20 bg-slate-600 rounded-md text-stone-100 text-xs text-center hover:bg-slate-800 transition-bg ease-in-out duration-200">
          Search
        </button>
      </div>
    </div>
  );
}
