import { useState } from 'react';
import { Button, FormInput, SelectInput } from '../components/Inputs';
import { useMutation } from '@tanstack/react-query';
import { createNews, queryClient } from '../../utils/http';
import { toast } from 'react-toastify';

export default function CreateNews() {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createNews({ newsData: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['news'],
      });
      toast.success('news created successfully', {
        autoClose: 2000,
      });
      setFormData({
        title: '',
        body: '',
      });
    },
    onError: (error) => {
      toast.error('failed to create news');
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
      <h2 className="text-slate-800 font-bold text-2xl mb-4">Create News</h2>
      <FormInput
        name="title"
        label="Title"
        placeholder={'Enter a title'}
        onChange={handleChange}
        type="text"
        value={formData.title}
      />
      <SelectInput
        name="body"
        label="Body"
        onChange={handleChange}
        rows="4"
        value={formData.body}
      />

      <Button disabled={isPending}>
        {' '}
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
