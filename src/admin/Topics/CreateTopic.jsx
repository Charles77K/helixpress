import { useState } from 'react';
import { useFetchJournals } from '../components/Tanstack';
import { Button, FormInput, SelectInput } from '../components/Inputs';
import { useMutation } from '@tanstack/react-query';
import { createTopic, queryClient } from '../../utils/http';
import { toast } from 'react-toastify';

export default function CreateTopic() {
  const { data: journalsData, isError, isLoading } = useFetchJournals();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    keywords: '',
    content: '',
    abstract_deadline: '',
    manuscript_deadline: '',
    participating_journals: [], // Initialize as an array for multi-selection
  });
  console.log(formData);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleJournalSelection(e) {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      participating_journals: checked
        ? [...prevData.participating_journals, value] // Add selected journal
        : prevData.participating_journals.filter(
            (journal) => journal !== value
          ), // Remove deselected journal
    }));
  }

  const { mutate, isPending } = useMutation({
    mutationFn: createTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['topics'],
      });
      toast.success('Created new topic');
      setFormData({
        title: '',
        author: '',
        keywords: '',
        content: '',
        abstract_deadline: '',
        manuscript_deadline: '',
        participating_journals: [],
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error('Unable to connect to the server');
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate({ topicData: formData });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full min-h-screen mx-auto bg-white p-6 rounded-lg justify-items-center"
    >
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Create Topic</h2>

      <div>
        <label className="text-lg font-semibold mb-2">
          Select Participating Journals
        </label>
        <div className="flex flex-wrap gap-2 mt-1">
          {isLoading ? (
            <p>Loading journals...</p>
          ) : isError ? (
            <p>Error loading journals.</p>
          ) : (
            journalsData.map((journal) => (
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

      <FormInput
        label="Title"
        name="title"
        onChange={handleChange}
        type="text"
        value={formData.title}
        placeholder="Please enter a title"
      />
      <FormInput
        label="Author"
        name="author"
        onChange={handleChange}
        type="text"
        value={formData.author}
        placeholder="Please enter the author"
      />
      <FormInput
        label="Keywords"
        name="keywords"
        onChange={handleChange}
        type="text"
        value={formData.keywords}
        placeholder="Please enter keywords"
      />
      <SelectInput
        label="Content"
        name="content"
        onChange={handleChange}
        value={formData.content}
        rows="3"
      />
      <FormInput
        type="date"
        label="Abstract Deadline"
        name="abstract_deadline"
        onChange={handleChange}
        value={formData.abstract_deadline}
      />
      <FormInput
        type="date"
        label="Manuscript Deadline"
        name="manuscript_deadline"
        onChange={handleChange}
        value={formData.manuscript_deadline}
      />

      <Button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
