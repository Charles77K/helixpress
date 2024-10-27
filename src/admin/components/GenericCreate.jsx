import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
import { Button, SelectInput } from './Inputs';
import { queryClient } from '../../utils/http';
import PropTypes from 'prop-types';

export default function GenericCreate({ createFn, QueryKey, label, name }) {
  const [formData, setFormData] = React.useState({
    content: '',
  });
  const { mutate, isPending } = useMutation({
    mutationFn: createFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey],
      });
      toast.success(`${label} created successfully`, {
        autoClose: 2000,
      });
      setFormData({
        content: '',
      });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || 'Something went wrong';
      toast.error(errorMessage);
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ createData: formData });
  };
  console.log(formData);

  return (
    <div>
      <form className="p-4" onSubmit={handleSubmit}>
        <h2 className="text-slate-800 font-bold text-2xl mb-4">
          Create {label}
        </h2>
        <SelectInput
          name={name}
          rows="4"
          label={'Content'}
          placeholder={`Enter content`}
          onChange={(e) => setFormData({ content: e.target.value })}
          value={formData.content}
        />
        <Button disabled={isPending}>
          {' '}
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}

GenericCreate.propTypes = {
  createFn: PropTypes.func.isRequired,
  QueryKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
