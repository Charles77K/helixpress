import { useState } from 'react';
import {
  Button,
  FileInput,
  FormInput,
  SelectInput,
} from '../components/Inputs';
import { toast } from 'react-toastify';
import { useCreate } from '../../services/hooks';

export default function CreateSlider() {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    pic: null,
  });

  const { mutate, isPending } = useCreate('/homesliders/');

  // handle submit fn
  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData();
    Object.keys(formData).forEach((key) => newForm.append(key, formData[key]));
    console.log(newForm);
    mutate(newForm, {
      onSuccess: () => {
        toast.success('slider created successfully', {
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
