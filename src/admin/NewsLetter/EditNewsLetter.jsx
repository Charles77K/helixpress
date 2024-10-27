import { useEffect, useState } from 'react';
import { Button, FormInput } from '../components/Inputs';
import { useMutation } from '@tanstack/react-query';
import { editNewsletter, queryClient } from '../../utils/http'; // Adjust your import path for `editNewsletter`
import { toast } from 'react-toastify';
import SelectComponent from '../components/SelectComponent';
import { useFetchNewsLetters, useFetchJournals } from '../components/Tanstack'; // Custom hooks for fetching newsletters and journals
import Error from '../../utils/Error';
import Loader from '../../UI/Loader';

export default function EditNewsletter() {
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);
  const [formData, setFormData] = useState({
    journal: '',
    email: '',
  });

  const { newsLetterData, isNewsLetterError, isnewsLetterPending } =
    useFetchNewsLetters();
  const { isLoading, isError, data } = useFetchJournals(); // Fetching available journals

  useEffect(() => {
    if (selectedNewsletter) {
      setFormData({
        journal: selectedNewsletter.journal || '',
        email: selectedNewsletter.email || '',
      });
    }
  }, [selectedNewsletter]);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ data, id }) =>
      editNewsletter({ newsletterData: data, newsletterId: id }), // Adjusted to accept an object
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['news-letter'],
      });
      toast.success('Newsletter updated successfully', {
        autoClose: 2000,
      });
      setFormData({
        journal: '',
        email: '',
      });
      setSelectedNewsletter(null);
    },
    onError: (error) => {
      toast.error('Failed to update newsletter');
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ data: formData, id: selectedNewsletter.id }); // Pass an object with data and id
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const newsletterId = e.target.value;
    const newsletter = newsLetterData.find(
      (newsletter) => newsletter.id === newsletterId
    );
    setSelectedNewsletter(newsletter);
  };

  const handleJournalSelectChange = (e) => {
    const journalId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      journal: journalId,
    }));
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <h2 className="text-slate-800 font-bold text-2xl mb-4">
        Edit Newsletter
      </h2>

      {/* Select Newsletter */}
      <SelectComponent
        label="Newsletter"
        name="newsletter"
        options={newsLetterData}
        isError={isNewsLetterError}
        isLoading={isnewsLetterPending}
        onChange={handleSelectChange}
        value={selectedNewsletter ? selectedNewsletter.id : ''}
        optionMain={(newsletter) => newsletter.email}
        optionValue={(newsletter) => newsletter.id}
      />
      {isnewsLetterPending && <Loader />}
      {isNewsLetterError && (
        <Error title={'Error'} text={'Error fetching newsletter data'} />
      )}

      {/* Select Journal */}
      {selectedNewsletter && (
        <>
          <SelectComponent
            label="Journal"
            name="journal"
            options={data}
            isError={isError}
            isLoading={isLoading}
            onChange={handleJournalSelectChange}
            value={formData.journal}
            optionMain={(journal) => journal.name} // Display journal name
            optionValue={(journal) => journal.id} // Use journal id as value
          />

          {/* Email Input */}
          <FormInput
            name="email"
            label="Email"
            placeholder={'Enter an email address'}
            onChange={handleChange}
            type="email"
            value={formData.email}
          />

          {/* Submit Button */}
          <Button disabled={isPending ? true : false}>
            {isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </>
      )}
    </form>
  );
}
