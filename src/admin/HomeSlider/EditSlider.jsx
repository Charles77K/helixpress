import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { editSlider, queryClient } from '../../utils/http';
import {
  Button,
  FileInput,
  FormInput,
  SelectInput,
} from '../components/Inputs';
import { toast } from 'react-toastify';
import { useFetchSlider } from '../components/Tanstack';
import SelectComponent from '../components/SelectComponent';
import Loader from '../../UI/Loader';
import Error from '../../utils/Error';

export default function EditSlider() {
  const [selectedSlider, setSelectedSlider] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    pic: null,
  });
  const [imagePreview, setImagePreview] = useState('');
  const { sliderData, isSliderLoading, isSliderError } = useFetchSlider();
  const imageRef = useRef(null);

  // When a slider is selected, populate the form and set image preview
  useEffect(() => {
    if (selectedSlider) {
      setFormData({
        title: selectedSlider.title || '',
        body: selectedSlider.body || '',
        pic: null, // Reset pic since we can't set the file input
      });
      setImagePreview(selectedSlider.pic); // Set the preview to the previously uploaded image
    }
  }, [selectedSlider]);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ data, id }) =>
      editSlider({ sliderId: id, sliderData: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sliders'] });
      toast.success('Slider updated successfully', { autoClose: 2000 });
      setFormData({ title: '', body: '', pic: null });
      setSelectedSlider(null);
      setImagePreview(null);
      imageRef.current.value = '';
    },
    onError: (error) => {
      toast.error('Something went wrong');
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData();

    Object.keys(formData).forEach((key) => {
      // Only append the pic field if a new file is uploaded
      if (key !== 'pic' || formData.pic) {
        newForm.append(key, formData[key]);
      }
    });

    console.log(newForm);
    mutate({ data: newForm, id: selectedSlider.id });
  };

  const handleSliderChange = (e) => {
    const sliderId = e.target.value;
    const slider = sliderData.find((slider) => slider.id === sliderId);
    setSelectedSlider(slider);
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    // If the file input changes, update both formData and preview
    if (type === 'file') {
      const file = files[0];
      setFormData((prevData) => ({ ...prevData, [name]: file }));

      // Create a preview URL for the new file
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <h2 className="text-slate-800 font-bold text-2xl mb-4">Edit Slider</h2>
      <SelectComponent
        label="Slider"
        name="slider"
        onChange={handleSliderChange}
        options={sliderData}
        optionMain={(slider) => slider.title}
        optionValue={(slider) => slider.id}
        value={selectedSlider ? selectedSlider.id : ''}
        isError={isSliderError}
        isLoading={isSliderLoading}
      />
      {isSliderLoading && <Loader />}
      {isSliderError && (
        <Error title={'Error'} text={'Error fetching slider'} />
      )}
      {selectedSlider && (
        <div className="mt-3">
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

          {/* Display current image preview if available */}
          {imagePreview && (
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Current Picture
              </label>
              <img
                src={`https://ogbesomto.pythonanywhere.com/${imagePreview}`}
                alt="Preview"
                className="w-32 h-auto max-w-xs"
              />
            </div>
          )}
          <FileInput
            ref={imageRef}
            accept="image/*"
            label="Upload Picture"
            name="pic"
            onChange={handleChange}
            placeholder={'Choose a photo'}
          />
          <p className="text-xs">
            NB: leave this field empty if you dont want to update the image
          </p>
          <Button disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      )}
    </form>
  );
}
