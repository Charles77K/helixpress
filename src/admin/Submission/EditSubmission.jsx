import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { editSubmission, queryClient } from '../../utils/http'; // Adjust API handler
import { toast } from 'react-toastify';
import { useFetchSubmissions } from '../components/Tanstack'; // Hook to fetch submissions
import { Button, FormInput, FileInput } from '../components/Inputs';
import SelectComponent from '../components/SelectComponent';
import Loader from '../../UI/Loader';
import Error from '../../utils/Error';

export default function EditSubmission() {
  const [selectedSubmission, setSelectedSubmission] = useState('');
  const supplementaryRef = useRef(null);
  const manuscriptRef = useRef(null);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    institution: '',
    country: '',
    manuscript: null, // Will hold the new file or URL
    supplementary: null, // Will hold the new file or URL
    journal: '',
  });

  const { submissionData, isSubmissionError, isSubmissionLoading } =
    useFetchSubmissions();

  // When a submission is selected, populate the form
  useEffect(() => {
    if (selectedSubmission) {
      setFormData({
        firstname: selectedSubmission.firstname || '',
        lastname: selectedSubmission.lastname || '',
        email: selectedSubmission.email || '',
        phonenumber: selectedSubmission.phonenumber || '',
        institution: selectedSubmission.institution || '',
        country: selectedSubmission.country || '',
        manuscript: selectedSubmission.manuscript || null, // Store the existing file URL
        supplementary: selectedSubmission.supplementary || null, // Store the existing file URL
        journal: selectedSubmission.journal || '',
      });
    }
  }, [selectedSubmission]);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ data, id }) =>
      editSubmission({ submissionId: id, submissionData: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      toast.success('Submission updated successfully', { autoClose: 2000 });
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
      setSelectedSubmission('');
      supplementaryRef.current.value = '';
      manuscriptRef.current.value = '';
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update submission';
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();

    // Append all fields to formDataToSubmit
    Object.keys(formData).forEach((key) => {
      if (key === 'manuscript') {
        if (formData[key] instanceof File) {
          formDataToSubmit.append(key, formData[key]); // Append new file if uploaded
        } else if (formData[key]) {
          formDataToSubmit.append(key, formData[key]); // Append existing URL if no new file
        }
      } else if (key === 'supplementary') {
        if (formData[key] instanceof File) {
          formDataToSubmit.append(key, formData[key]); // Append new file if uploaded
        } else if (formData[key]) {
          formDataToSubmit.append(key, formData[key]); // Append existing URL if no new file
        }
      } else {
        formDataToSubmit.append(key, formData[key]); // Append other fields
      }
    });

    // Call mutate regardless of file uploads, since normal data can be sent
    mutate({ data: formDataToSubmit, id: selectedSubmission.id });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Handle file input
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Handle text input
      }));
    }
  };

  const handleSubmissionChange = (e) => {
    const submissionId = e.target.value;
    const submission = submissionData.find(
      (submission) => submission.id === submissionId
    );
    setSelectedSubmission(submission);
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <h2 className="text-slate-800 font-bold text-2xl mb-4">
        Edit Submission
      </h2>
      <SelectComponent
        name="submission"
        label="Submission"
        onChange={handleSubmissionChange}
        value={selectedSubmission ? selectedSubmission.id : ''}
        options={submissionData}
        optionMain={(submission) =>
          `${submission.firstname} ${submission.lastname}`
        } // Display full name
        optionValue={(submission) => submission.id}
        isError={isSubmissionError}
        isLoading={isSubmissionLoading}
      />
      {isSubmissionLoading && <Loader />}
      {isSubmissionError && (
        <Error title={'Error'} text={'Error fetching submissions'} />
      )}
      {selectedSubmission && (
        <>
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

          {/* Display a link or preview of the current manuscript */}
          {formData.manuscript && !(formData.manuscript instanceof File) && (
            <a
              href={formData.manuscript}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Current Manuscript
            </a>
          )}
          <FileInput
            name="manuscript"
            label="Manuscript"
            onChange={handleChange}
            accept="application/pdf"
            ref={manuscriptRef}
          />

          {/* Display a link or preview of the current supplementary file */}
          {formData.supplementary &&
            !(formData.supplementary instanceof File) && (
              <a
                href={formData.supplementary}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Current Supplementary File
              </a>
            )}
          <FileInput
            name="supplementary"
            label="Supplementary File"
            onChange={handleChange}
            accept="application/pdf"
            ref={supplementaryRef}
          />

          <Button disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </>
      )}
    </form>
  );
}
