import { useState } from 'react';
import { Button, FormInput, SelectInput } from '../components/Inputs';
import { toast } from 'react-toastify';
import { useCreate, useFetch } from '../../services/hooks';

export default function CreateTopic() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    keywords: '',
    content: '',
    deadline: '',
    participating_journals: [],
    editors: [],
  });

  const [editorInput, setEditorInput] = useState('');
  const { data: journalsData, isError, isLoading } = useFetch('/journals/');
  const { mutate, isPending } = useCreate('/topics/');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleJournalSelection = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      participating_journals: checked
        ? [...prevData.participating_journals, value]
        : prevData.participating_journals.filter(
            (journal) => journal !== value
          ),
    }));
  };

  const handleAddEditor = () => {
    if (editorInput.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        editors: [...prevData.editors, editorInput.trim()],
      }));
      setEditorInput('');
    }
  };

  const handleRemoveEditor = (editorToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      editors: prevData.editors.filter((editor) => editor !== editorToRemove),
    }));
  };

  const handleEditorKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEditor();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(formData, {
      onSuccess: () => {
        toast.success('Created new topic');
        setFormData({
          title: '',
          author: '',
          keywords: '',
          content: '',
          deadline: '',
          participating_journals: [],
          editors: [],
        });
      },
      onError: (error) => {
        console.error(error);
        toast.error('Unable to connect to the server');
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full min-h-screen mx-auto bg-white p-6 rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Create Topic</h2>

      <FormInput
        label="Title"
        name="title"
        onChange={handleChange}
        type="text"
        value={formData.title}
        placeholder="Please enter a title"
        required
      />

      <FormInput
        label="Author"
        name="author"
        onChange={handleChange}
        type="text"
        value={formData.author}
        placeholder="Please enter the author"
        required
      />

      <FormInput
        label="Keywords"
        name="keywords"
        onChange={handleChange}
        type="text"
        value={formData.keywords}
        placeholder="Please enter keywords (comma-separated)"
      />

      <SelectInput
        label="Content"
        name="content"
        onChange={handleChange}
        value={formData.content}
        rows="3"
      />

      <div>
        <label className="block text-lg font-semibold mb-2">Editors</label>
        <div className="flex mb-2">
          <input
            type="text"
            value={editorInput}
            onChange={(e) => setEditorInput(e.target.value)}
            onKeyPress={handleEditorKeyPress}
            className="flex-grow border border-gray-300 px-3 py-2 rounded-l"
            placeholder="Add an editor"
          />
          <button
            type="button"
            onClick={handleAddEditor}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {formData.editors.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.editors.map((editor, index) => (
              <div
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
              >
                <span>{editor}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveEditor(editor)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-lg font-semibold mb-2">
          Select Participating Journals
        </label>
        <div className="flex flex-wrap gap-2 mt-1">
          {isLoading ? (
            <p>Loading journals...</p>
          ) : isError ? (
            <p>Error loading journals.</p>
          ) : (
            journalsData?.map((journal) => (
              <label key={journal.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={journal.id}
                  checked={formData.participating_journals.includes(journal.id)}
                  onChange={handleJournalSelection}
                  className="mr-2"
                />
                {journal.name}
              </label>
            ))
          )}
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="mt-4">
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
