import { useNavigate, useParams } from 'react-router-dom';
import { Search } from '../components/homeComponents';
import Share from '../components/Share';
import { useFetchById } from '../services/hooks';
import Seo from '../components/Seo';
import Error from '../utils/Error';
import { formatDate } from '../utils/utils';
import NotFound from '../components/NotFound';

const NewsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isPending, isError, error, refetch } = useFetchById(
    '/news/',
    id
  );

  let content;

  if (isPending) {
    content = (
      <div className="space-y-4 animate-pulse ">
        <p className="w-1/2 h-5 bg-gray-200"></p>
        <h1 className="w-full h-5 bg-gray-200"></h1>
        <p className="w-full h-40 shimmer bg-gray-200"></p>
      </div>
    );
  } else if (isError) {
    content = (
      <Error
        title="Error"
        text={`${
          error.message ||
          'An error has occurred. Please try again or contact support if the problem persists.'
        }`}
        onRetry={() => refetch()}
      />
    );
  } else if (data) {
    content = (
      <div className="text-black">
        <p className="text-black text-xs">{formatDate(data.date_created)}</p>
        <h1 className="font-semibold text-lg md:text-xl">{data.title}</h1>
        <p className="text-xs md:text-sm md:leading-6 mt-2">{data.body}</p>
      </div>
    );
  } else
    content = (
      <NotFound
        label="Blogs"
        message="No blogs available at this time. Check back later"
        actionText={'Go back'}
        onAction={() => navigate(-1)}
      />
    );
  return (
    <>
      {data && (
        <Seo
          title={`News | ${data.title}`}
          description={data.body.slice(0, 20)}
        />
      )}
      <Search />
      <div className="p-4 md:p-6 w-full bg-gray-100 flex flex-col md:flex-row items-start justify-center md:gap-10">
        {/* Announcements */}
        <div className="w-full md:w-[65%] bg-white p-10">
          <div className="my-3 w-full">{content}</div>
        </div>
        {/* Share Section */}
        <div className="bg-white px-2 hidden md:block">
          <Share linkToShare={'about/news'} />
        </div>
      </div>
    </>
  );
};

export default NewsPage;
