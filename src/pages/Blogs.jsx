import { useFetch } from '../services/hooks';
import Error from '../utils/Error';

const Blogs = () => {
  const { data, isPending, isError } = useFetch('/blogs/');
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
  } else if (data && data.length > 0) {
    content = (
      <div>
        {data.map((blog, index) => (
          <div key={blog.id || index}>
            <p>{blog.title}</p>
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
    <div className="min-h-screen px-8 py-4">
      <header>
        <h1 className="font-bold text-2xl md:text-4xl text-slate-800">
          Helixpress Blogs
        </h1>
      </header>
      <main>{content}</main>
    </div>
  );
};

export default Blogs;
