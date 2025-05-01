import { useFetch } from '../services/hooks';
import Error from '../utils/Error';
import { Link } from 'react-router-dom';
import useScrollToTop from '../utils/scrollToTop';

const Blogs = () => {
  useScrollToTop();
  const { data, isPending, isError } = useFetch('/blogs/');
  const blogs = !isPending && data.results;

  let content;

  if (isPending) {
    content = (
      <div className="flex-center">
        <p>Loading.....</p>
      </div>
    );
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-start mt-10 gap-5">
        {blogs.map((blog, index) => (
          <div key={blog.id || index}>
            <img src={blog.pic} alt="Blog-Image" className="w-80 h-52" />
            <Link to={`blog/${blog.id}`} className="hover:underline">
              <p className="text-lg font-light mt-2">{blog.title}</p>
            </Link>
            {/* Add more blog properties here as needed */}
          </div>
        ))}
      </div>
    );
  } else {
    content = (
      <div className="text-black h-screen flex-center text-2xl">
        <p>No blogs found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 py-4 container mx-auto">
      <header className="">
        <h1 className="font-light text-2xl md:text-4xl text-slate-800">
          Helixpress Blogs
        </h1>
      </header>
      <main className="">{content}</main>
    </div>
  );
};

export default Blogs;
