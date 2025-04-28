import { useState, useMemo, useCallback } from 'react';
import { useCreate, useFetch, useFetchCustom } from '../services/hooks';
import { Button, Input, SelectInput } from '../UI/index';
import { validateField } from '../utils/SubmissionValidation';
import { toast } from 'react-toastify';

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  phonenumber: '',
  institution: '',
  country: '',
  journal: '',
  status: 'pending',
};

const initialErrors = {
  firstname: '',
  lastname: '',
  email: '',
  phonenumber: '',
  institution: '',
  country: '',
  journal: '',
};

const Submission = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: journals, isPending: isJournalLoading } =
    useFetch('/journals/');

  const { data: countries, isPending: isCountryPending } = useFetchCustom(
    'https://restcountries.com/v3.1/all?fields=name,cca2'
  );

  const { mutate, isPending } = useCreate('/submission/');

  // Enhanced change handler with input type handling
  const handleChange = useCallback(
    (e) => {
      const { name, value, type } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'number' ? Number(value) : value,
      }));

      // Clear error once user starts typing again
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    },
    [errors]
  );

  // Validate field on blur
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage || '',
    }));
  }, []);

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    for (const key in formData) {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      } else {
        newErrors[key] = '';
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      if (!validateForm()) {
        setIsSubmitting(false);
        toast.error('Please fix the errors in the form');
        return;
      }

      mutate(formData, {
        onSuccess: () => {
          toast.success('Submission uploaded successfully');
          setFormData(initialState);
          setErrors(initialErrors);
        },
        onError: (error) => {
          toast.error(
            `An error occurred: ${error?.message || 'Unknown error'}`
          );
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      });
    },
    [formData, mutate, validateForm]
  );

  // Sort countries alphabetically
  const sortedCountries = useMemo(
    () =>
      isCountryPending
        ? []
        : [...countries].sort((a, b) => {
            const nameA = a.name.common.toUpperCase();
            const nameB = b.name.common.toUpperCase();
            return nameA.localeCompare(nameB);
          }),
    [countries, isCountryPending]
  );

  // Helper to check if form is in process
  const isProcessing = isPending || isSubmitting;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <main className="drop-shadow-xl shadow-2xl max-w-xl w-full rounded-2xl p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Submit Your Application
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          aria-label="Submission form"
        >
          {/* First and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center gap-3">
            <Input
              label="First Name"
              name="firstname"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your first name"
              value={formData.firstname}
              type="text"
              className="flex-shrink-0"
              error={errors.firstname}
              required
              aria-required="true"
              aria-invalid={!!errors.firstname}
              disabled={isProcessing}
            />

            <Input
              label="Last Name"
              name="lastname"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your last name"
              value={formData.lastname}
              type="text"
              className="flex-shrink-0 w-full"
              error={errors.lastname}
              required
              aria-required="true"
              aria-invalid={!!errors.lastname}
              disabled={isProcessing}
            />
          </div>

          {/* Email */}
          <Input
            label="Email"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter your email address"
            value={formData.email}
            type="email"
            error={errors.email}
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            disabled={isProcessing}
          />

          {/* Phone Number */}
          <Input
            label="Phone Number"
            name="phonenumber"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your phone number"
            value={formData.phonenumber}
            type="tel"
            error={errors.phonenumber}
            required
            aria-required="true"
            aria-invalid={!!errors.phonenumber}
            disabled={isProcessing}
          />

          {/* Institution */}
          <Input
            label="Institution"
            name="institution"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your institution"
            value={formData.institution}
            type="text"
            error={errors.institution}
            required
            aria-required="true"
            aria-invalid={!!errors.institution}
            disabled={isProcessing}
          />

          {/* Country */}
          <SelectInput
            label="Country"
            name="country"
            onChange={handleChange}
            onBlur={handleBlur}
            options={sortedCountries}
            value={formData.country}
            isLoading={isCountryPending}
            optionLabel="name.common"
            optionValue="name.common"
            error={errors.country}
            required
            aria-required="true"
            aria-invalid={!!errors.country}
            disabled={isProcessing}
          />

          {/* Journal */}
          <SelectInput
            label="Journal"
            name="journal"
            onChange={handleChange}
            onBlur={handleBlur}
            options={journals}
            isLoading={isJournalLoading}
            value={formData.journal}
            optionLabel="name"
            optionValue="id"
            error={errors.journal}
            required
            aria-required="true"
            aria-invalid={!!errors.journal}
            disabled={isProcessing}
          />

          <Button
            type="submit"
            disabled={isProcessing}
            className={`mt-4 ${isProcessing ? 'opacity-70' : ''}`}
            aria-busy={isProcessing}
          >
            {isProcessing ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Submission;
