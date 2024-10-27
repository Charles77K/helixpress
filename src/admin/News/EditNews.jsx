import { useEffect, useState } from 'react';
import { Button, FormInput, SelectInput } from '../components/Inputs';
import { useMutation } from '@tanstack/react-query';
import { editNews, queryClient } from '../../utils/http';
import { toast } from 'react-toastify';
import SelectComponent from '../components/SelectComponent';
import { useFetchNews } from '../components/Tanstack';
import Error from '../../utils/Error';
import Loader from '../../UI/Loader';

export default function EditNews() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  const { newsData, isNewsError, isNewsLoading } = useFetchNews();

  useEffect(() => {
    if (selectedNews) {
      setFormData({
        title: selectedNews.title || '',
        body: selectedNews.body || '',
      });
    }
  }, [selectedNews]);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ data, id }) => editNews({ newsData: data, newsId: id }), // Adjusted to accept an object
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['news'],
      });
      toast.success('news updated successfully', {
        autoClose: 2000,
      });
      setFormData({
        title: '',
        body: '',
      });
      setSelectedNews('');
    },
    onError: (error) => {
      toast.error('failed to update news');
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ data: formData, id: selectedNews.id }); // Pass an object with data and id
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const newsId = e.target.value;
    const news = newsData.find((news) => news.id === newsId);
    setSelectedNews(news);
  };
  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <h2 className="text-slate-800 font-bold text-2xl mb-4">Edit News</h2>
      <SelectComponent
        label="News"
        name="news"
        options={newsData}
        isError={isNewsError}
        isLoading={isNewsLoading}
        onChange={handleSelectChange}
        value={selectedNews ? selectedNews.id : ''}
        optionMain={(news) => news.title}
        optionValue={(news) => news.id}
      />
      {isNewsLoading && <Loader />}
      {isNewsError && (
        <Error title={'Error'} text={'Error fetching news data'} />
      )}
      {selectedNews && (
        <>
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

          <Button disabled={isPending ? true : false}>
            {' '}
            {isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </>
      )}
    </form>
  );
}
