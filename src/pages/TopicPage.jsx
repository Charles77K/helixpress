import { useNavigate, useParams } from 'react-router-dom';
import { useFetchById } from '../services/hooks';
import useScrollToTop from '../utils/scrollToTop';
import PropTypes from 'prop-types';
import Seo from '../components/Seo';
import { Search } from '../components/homeComponents';
import Share from '../components/Share';
import Error from '../utils/Error';
import NotFound from '../components/NotFound';
import { formatDate } from '../utils/utils';

const TopicPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useScrollToTop();
  const { data, isPending, isError, error, refetch } = useFetchById(
    '/topics/',
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
      <div className="text-black space-y-3">
        <h1 className="font-semibold text-lg md:text-xl">{data.title}</h1>

        <InfoBlock label="Deadline" value={formatDate(data.deadline)} />
        <InfoBlock label="Viewed by" value={data.viewed_by} />

        <div className="pt-7 space-y-2">
          <h2 className="font-semibold text-lg md:text-xl">
            Topic Information
          </h2>
          <p className="text-xs font-light md:leading-6">{data.content}</p>
        </div>
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
          title={`Topics | ${data.title}`}
          description={data.content.slice(0, 20)}
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
          <Share linkToShare={'about/topics'} />
        </div>
      </div>
    </>
  );
};

export default TopicPage;

const InfoBlock = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-xs">{label}</p>
    <p className="text-black font-semibold text-xs">{value}</p>
  </div>
);

InfoBlock.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};
