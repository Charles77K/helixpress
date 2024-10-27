import { useState } from 'react';
import { useFetchJournals } from '../components/Tanstack';
import SelectComponent from '../components/SelectComponent';
import { Button, FormInput } from '../components/Inputs';
import { useMutation } from '@tanstack/react-query';
import { createNewsLetter, queryClient } from '../../utils/http';
import { toast } from 'react-toastify';

export default function CreateNewsLetter() {
  const [formData, setFormData] = useState({
    journal: '',
    email: '',
  });
  const { data, isError, isLoading } = useFetchJournals();

  const { mutate, isPending } = useMutation({
    mutationFn: (newsLetterData) => createNewsLetter(newsLetterData), // Adjust API handler
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-letter'] });
      toast.success('NewsLetter created successfully', { autoClose: 2000 });
      setFormData({
        journal: '',
        email: '',
      });
    },
    onError: (error) => {
      toast.error('Failed to create NewsLetter');
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <h2 className="text-slate-800 font-bold text-2xl mb-4">
        Create Submission
      </h2>
      <SelectComponent
        name="journal"
        label="Journal"
        onChange={handleChange}
        value={formData.journal}
        options={data}
        optionMain={(data) => data.name}
        optionValue={(data) => data.id}
        isError={isError}
        isLoading={isLoading}
      />
      <FormInput
        name="email"
        label="Email"
        placeholder="Enter email"
        onChange={handleChange}
        type="email"
        value={formData.email}
      />
      <Button>{isPending ? 'Submitting...' : 'Submit'}</Button>
    </form>
  );
}
