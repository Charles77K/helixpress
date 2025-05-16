import { useNavigate, useParams } from 'react-router-dom';
import useScrollToTop from '../utils/scrollToTop';
import { useFetchById } from '../services/hooks';
import Error from '../utils/Error';
import { formatDate } from '../utils/utils';
import DoubleGridLayout from '../layouts/DoubleGridLayout';
import BlogPageSkeleton from '../components/LoadingSkeletons/BlogPageSkeleton';
import NotFound from '../components/NotFound';

const BlogPage = () => {
  useScrollToTop();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error, refetch } = useFetchById(
    '/blogs/',
    id
  );

  let content;
  if (isPending) {
    content = <BlogPageSkeleton />;
  } else if (isError) {
    content = (
      <Error
        title="An Error occurred"
        text={`${error || 'Error fetching blog data'}`}
        onRetry={() => refetch()}
      />
    );
  } else if (data) {
    content = (
      <div key={data.id} className="flex flex-col gap-5">
        <div className="relative overflow-hidden">
          <img
            src={data.pic}
            alt={data.title || 'Blog Image'}
            className="w-full h-[30rem] object-cover shadow-md hover:shadow-lg transition-all duration-300"
          />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-800">
            {data.title}
          </h1>

          <div className="flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm">{formatDate(data.date_created)}</span>
          </div>

          {/* {data.author && (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-sm text-gray-600">{data.author}</span>
            </div>
          )} */}
        </div>

        <div className="mt-2 pt-4 border-t border-gray-200">
          <p className="text-sm font-light leading-5 text-gray-700 whitespace-pre-line">
            {data.body}
          </p>
        </div>
      </div>
    );
  } else {
    content = (
      <NotFound
        label="Blog"
        actionText={'Go back'}
        onAction={() => navigate(-1)}
      />
    );
  }

  return (
    <DoubleGridLayout link={`blog/${data?.title}`}>
      <div>{content}</div>
    </DoubleGridLayout>
  );
};

export default BlogPage;
