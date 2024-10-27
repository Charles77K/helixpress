import { useEffect, useState } from 'react';
import { Button, SelectInput } from '../components/Inputs';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../utils/http'; // Adjust your import path for `editNewsletter`
import { toast } from 'react-toastify';
import SelectComponent from '../components/SelectComponent';
import Error from '../../utils/Error';
import Loader from '../../UI/Loader';
import PropTypes from 'prop-types';

export default function GenericEdit({
  isData,
  isLoading,
  isError,
  mutateFn,
  QueryKey,
  label,
  name,
}) {
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({
    content: '',
  });

  useEffect(() => {
    if (selected) {
      setFormData({
        content: selected.content || '',
      });
    }
  }, [selected]);

  const { mutate, isPending } = useMutation({
    mutationFn: mutateFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey],
      });
      toast.success(`${label} updated successfully`, {
        autoClose: 2000,
      });
      setFormData({
        content: '',
      });
      setSelected(null);
    },
    onError: (error) => {
      toast.error(`Failed to update ${label}`);
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ data: formData, id: selected.id }); // Pass an object with data and id
  };

  const handleSelectChange = (e) => {
    const contentId = e.target.value;
    const contents = isData.find((data) => data.id == contentId);
    setSelected(contents);
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <h2 className="text-slate-800 font-bold text-2xl mb-4">Edit {label}</h2>

      {/* Select Newsletter */}
      <SelectComponent
        label={label}
        name={name}
        options={isData}
        isError={isError}
        isLoading={isLoading}
        onChange={handleSelectChange}
        value={selected ? selected.id : ''}
        optionMain={(data) => data.content}
        optionValue={(data) => data.id}
      />
      {isLoading && <Loader />}
      {isError && (
        <Error title={'Error'} text={'Error fetching newsletter data'} />
      )}

      {/* Select Journal */}
      {selected && (
        <>
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
        </>
      )}
    </form>
  );
}
GenericEdit.propTypes = {
  isData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      name: PropTypes.string,
    })
  ),
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  mutateFn: PropTypes.func.isRequired,
  QueryKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
