import { useEffect, useState } from 'react';
import { useFetchJournals, useFetchTopics } from '../components/Tanstack';
import { Button, FormInput, SelectInput } from '../components/Inputs';
import { useMutation } from '@tanstack/react-query';
import { editTopics, queryClient } from '../../utils/http';
import { toast } from 'react-toastify';
import SelectComponent from '../components/SelectComponent';

const initialFormData = {
  title: '',
  author: '',
  keywords: '',
  content: '',
  abstract_deadline: '',
  manuscript_deadline: '',
  participating_journals: [],
};

export default function EditTopic() {
  const { data: journalsData, isError, isLoading } = useFetchJournals();
  const { topicsData, isTopicsError, isTopicsLoading } = useFetchTopics();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  console.log(formData);

  const resetForm = () => {
    setFormData(initialFormData);
    setSelectedTopic('');
  };

  useEffect(() => {
    if (selectedTopic) {
      setFormData({
        title: selectedTopic.title || '',
        author: selectedTopic.author || '',
        keywords: selectedTopic.keywords || '',
        content: selectedTopic.content || '',
        abstract_deadline: selectedTopic.abstract_deadline || '',
        manuscript_deadline: selectedTopic.manuscript_deadline || '',
        participating_journals: selectedTopic.participating_journals || [],
      });
    }
  }, [selectedTopic]);

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

  function handleChangeTopic(e) {
    const topicId = e.target.value;
    const topics = topicsData.find((topic) => topic.id == topicId);
    setSelectedTopic(topics);
  }

  const { mutate, isPending } = useMutation({
    mutationFn: editTopics,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['topics'],
      });
      toast.success('Topic updated successfully');
      resetForm();
    },
    onError: (error) => {
      console.log(error);
      toast.error('Unable to connect to the server');
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (selectedTopic?.id) {
      mutate({ topicData: formData, topicId: selectedTopic.id });
    } else {
      console.log('Please select a topic');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full min-h-screen mx-auto bg-white p-6 rounded-lg justify-items-center"
    >
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Edit Topic</h2>

      <SelectComponent
        label="Topic"
        name="topic"
        value={selectedTopic?.id || ''}
        onChange={handleChangeTopic}
        isLoading={isTopicsLoading}
        isError={isTopicsError}
        options={topicsData}
        optionMain={(topic) => topic.title}
        optionValue={(topic) => topic.id}
      />

      {selectedTopic && (
        <>
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
                      checked={formData.participating_journals.includes(
                        journal.id
                      )}
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
        </>
      )}
    </form>
  );
}
