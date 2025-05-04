import { Link } from 'react-router-dom';
import Share from '../components/Share';
import Error from '../utils/Error';
import Search from './../components/homeComponents/Search';
import { useFetch } from '../services/hooks';

export default function AllNews() {
  const {
    data,
    isPending: isNewsLoading,
    isError: isNewsError,
  } = useFetch('/news/');

  const newsData = !isNewsLoading && data.results;

  let content;

  if (isNewsLoading) {
    content = (
      <div className="animate-pulse space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-200 rounded-lg p-4"
          >
            <div className="flex flex-col w-3/4 space-y-2">
              <div className="h-4 w-3/4 bg-gray-300 rounded-sm"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded-sm"></div>
            </div>
            <div className="h-4 w-1/4 bg-gray-300 rounded-sm"></div>
          </div>
        ))}
      </div>
    );
  } else if (isNewsError) {
    content = (
      <div className="flex items-center justify-center">
        <Error text="Error fetching news" title="Error!" />;
      </div>
    );
  } else if (newsData && newsData.length > 0) {
    content = newsData.map((news, index) => (
      <>
        <ul
          key={index}
          className="flex bg-white justify-between py-4 text-xs w-full"
        >
          <Link to={`/about/news/${news.id}`}>
            <li className="text-slate-700 font-bold hover:underline cursor-pointer">
              {news.title}
            </li>
          </Link>
          <li className="text-slate-800">
            {new Date(news.date_created).toLocaleDateString('en-us', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </li>
        </ul>
        <hr></hr>
      </>
    ));
  }

  return (
    <div>
      <Search />
      <div className="p-4 md:p-6 w-full bg-gray-100 flex flex-col md:flex-row items-start justify-center md:gap-10">
        {/* Announcements */}
        <div className="w-full md:w-[65%] bg-white p-10">
          <h1 className="text-slate-800 font-semibold text-xl md:text-3xl my-6">
            Announcements
          </h1>
          <div className="my-3 w-full">
            <hr />
            {content}
          </div>
        </div>
        {/* Share Section */}
        <div className="bg-white p-6 hidden md:block">
          <Share linkToShare={'about/news'} />
        </div>
      </div>
    </div>
  );
}
