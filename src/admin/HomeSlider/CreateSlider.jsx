import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { createSlider, queryClient } from '../../utils/http';
import {
  Button,
  FileInput,
  FormInput,
  SelectInput,
} from '../components/Inputs';
import { toast } from 'react-toastify';

export default function CreateSlider() {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    pic: null,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createSlider({ sliderData: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sliders'],
      });
      toast.success('slder created successfully', {
        autoClose: 2000,
      });
      setFormData({
        title: '',
        body: '',
        pic: null,
      });
    },
    onError: (error) => {
      toast.error('something went wrong');
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData();
    Object.keys(formData).forEach((key) => newForm.append(key, formData[key]));
    console.log(newForm);
    mutate(newForm);
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };
  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <h2 className="text-slate-800 font-bold text-2xl mb-4">Create Slider</h2>
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
      <FileInput
        accept="image/*"
        label="Upload Picture"
        name="pic"
        onChange={handleChange}
        placeholder={'choose a photo'}
      />
      <Button disabled={isPending}>
        {' '}
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
