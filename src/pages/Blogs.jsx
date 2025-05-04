import { useFetch } from '../services/hooks';
import Error from '../utils/Error';
import { Link, useNavigate } from 'react-router-dom';
import DoubleGridLayout from '../layouts/DoubleGridLayout';
import useScrollToTop from '../utils/scrollToTop';
import NotFound from '../components/NotFound';
import BlogsGridSkeleton from '../components/LoadingSkeletons/BlogsGridSkeleton';
import { formatDate } from '../utils/utils';

const Blogs = () => {
  useScrollToTop();
  const { data, isPending, isError } = useFetch('/blogs/');
  const blogs = !isPending && data?.results;
  const navigate = useNavigate();

  let content;

  if (isPending) {
    content = <BlogsGridSkeleton />;
  } else if (isError) {
    content = (
      <div>
        <Error
          title="An Error occurred"
          text="Something went wrong please try again later"
        />
      </div>
    );
  } else if (blogs && blogs.length > 0) {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {blogs.map((blog, index) => (
          <div
            key={blog.id || index}
            className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="overflow-hidden">
              <img
                src={blog.pic}
                alt={blog.title || 'Blog Image'}
                className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-4 bg-white">
              <Link to={`${blog.id}`} className="hover:underline">
                <h3 className="text-lg font-medium text-gray-800 transition-colors">
                  {blog.title}
                </h3>
              </Link>

              {blog.date_created && (
                <p className="text-sm text-gray-500 mt-px">
                  {formatDate(blog.date_created)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    content = (
      <div className="text-black h-screen flex-center text-2xl">
        <NotFound
          label="Blogs"
          actionText={'Go back'}
          onAction={() => navigate(-1)}
        />
      </div>
    );
  }

  return (
    <DoubleGridLayout title={'Helixpress Blogs'} link={'blogs'}>
      <main className="">{content}</main>
    </DoubleGridLayout>
  );
};

export default Blogs;
