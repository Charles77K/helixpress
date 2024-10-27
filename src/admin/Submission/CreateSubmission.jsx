import { useState } from 'react';
import { Button, FormInput, FileInput } from '../components/Inputs';
import { useMutation } from '@tanstack/react-query';
import { createSubmission, queryClient } from '../../utils/http'; // Adjust API handler
import { toast } from 'react-toastify';
import { useFetchJournals } from '../components/Tanstack';
import SelectComponent from '../components/SelectComponent';

export default function CreateSubmission() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    institution: '',
    country: '',
    manuscript: null,
    supplementary: null,
    journal: '',
  });

  const { data, isError, isLoading } = useFetchJournals();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createSubmission({ submissionData: data }), // Adjust API handler
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      toast.success('Submission created successfully', { autoClose: 2000 });
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        institution: '',
        country: '',
        manuscript: null,
        supplementary: null,
        journal: '',
      });
    },
    onError: (error) => {
      toast.error('Failed to create submission');
      console.log(error);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    // Debugging: Log the FormData to check
    for (let pair of formDataToSubmit.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    mutate(formDataToSubmit);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
        name="firstname"
        label="First Name"
        placeholder="Enter first name"
        onChange={handleChange}
        type="text"
        value={formData.firstname}
      />
      <FormInput
        name="lastname"
        label="Last Name"
        placeholder="Enter last name"
        onChange={handleChange}
        type="text"
        value={formData.lastname}
      />
      <FormInput
        name="email"
        label="Email"
        placeholder="Enter email"
        onChange={handleChange}
        type="email"
        value={formData.email}
      />
      <FormInput
        name="phonenumber"
        label="Phone Number"
        placeholder="Enter phone number"
        onChange={handleChange}
        type="number"
        value={formData.phonenumber}
      />
      <FormInput
        name="institution"
        label="Institution"
        placeholder="Enter institution"
        onChange={handleChange}
        type="text"
        value={formData.institution}
      />
      <FormInput
        name="country"
        label="Country"
        placeholder="Enter country"
        onChange={handleChange}
        type="text"
        value={formData.country}
      />
      <FileInput
        name="manuscript"
        label="Manuscript"
        onChange={handleChange}
        accept="application/pdf"
      />
      <FileInput
        name="supplementary"
        label="Supplementary File"
        onChange={handleChange}
        accept="application/pdf"
      />

      <Button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
