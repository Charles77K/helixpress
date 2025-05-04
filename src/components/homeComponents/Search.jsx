import { useState } from 'react';
import { useSearch } from '../Context/SearchContext';
import { Input, SelectInput } from '../../UI';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../services/hooks';

export default function Search() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    author: '',
    journals: '',
  });

  const { data, isPending } = useFetch('/journals/');

  const { isSearchOpen } = useSearch();

  const handleChange = (identifier, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [identifier]: value,
    }));
  };

  const handleSearch = () => {
    // Build search query parameters
    const params = new URLSearchParams();

    // Only add parameters that have values
    if (form.title) params.append('title', form.title);
    if (form.author) params.append('author', form.author);
    if (form.journals) params.append('journal', form.journals);

    // Create search query string
    const queryString = params.toString();

    // Navigate to search page with query parameters
    navigate(`/search${queryString ? `?${queryString}` : ''}`);
  };

  // Handle enter key press in input fields
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      className={`${
        isSearchOpen ? 'block' : 'hidden'
      } md:flex-row md:px-10 md:gap-10 px-4 py-4 flex-col flex-wrap md:flex w-full bg-white items-center gap-2`}
    >
      <div className="flex-col flex md:flex-row items-center gap-2">
        <p className="text-slate-800 text-sm sm:text-base font-medium">
          Search for Articles:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center gap-2 sm:gap-5">
          <Input
            type="text"
            placeholder="Title/Keyword"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Input
            type="text"
            placeholder="Author/Affiliation/Email"
            value={form.author}
            onChange={(e) => handleChange('author', e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SelectInput
            value={form.journals}
            onChange={(e) => handleChange('journals', e.target.value)}
            options={data}
            name={'journal'}
            isLoading={isPending}
            optionLabel={'name'}
            optionValue={'name'}
            placeholder={'All Journals'}
          />
          <div className="">
            <button
              onClick={handleSearch}
              className="px-6 py-2 w-fit bg-slate-600 rounded-md text-stone-100 text-xs text-center hover:bg-slate-800 transition-all ease-in-out duration-200"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
