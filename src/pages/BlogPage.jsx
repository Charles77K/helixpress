import { useParams } from 'react-router-dom';
import useScrollToTop from '../utils/scrollToTop';
import { useFetchById } from '../services/hooks';
import Error from '../utils/Error';
import { formatDate } from '../utils/utils';

const BlogPage = () => {
  useScrollToTop();
  const { id } = useParams();
  const { data, isPending, isError, error } = useFetchById('/blogs/', id);
  console.log(error);

  let content;
  if (isPending) {
    content = (
      <div>
        <p> Loading...</p>
      </div>
    );
  } else if (isError) {
    content = <Error title="An Error occurred" text={`${error}`} />;
  } else if (data) {
    content = (
      <div key={data.id} className="flex flex-col gap-3">
        <img src={data.pic} width={600} height={400} alt="Blog-Image" />
        <h1 className="text-xl md:text-2xl font-light">
          {data.title}: {formatDate(data.date_created)}
        </h1>
        <p className="text-sm font-light leading-5">{data.body}</p>
      </div>
    );
  } else {
    return <p>Blog not found</p>;
  }

  return (
    <div className="min-h-screen  flex-center p-4">
      <div className="max-w-2xl">{content}</div>
    </div>
  );
};

export default BlogPage;
