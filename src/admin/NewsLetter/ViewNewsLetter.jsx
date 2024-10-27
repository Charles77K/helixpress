import { useFetchNewsLetters } from '../components/Tanstack'; // Adjust the import according to your file structure
import Loader from './../../UI/Loader';
import Error from './../../utils/Error';

export default function ViewNewsletter() {
  const { newsLetterData, isnewsLetterPending, isNewsLetterError } =
    useFetchNewsLetters();

  let content;

  if (isnewsLetterPending) {
    content = (
      <div className="flex justify-center items-center mt-10">
        <Loader />
      </div>
    );
  } else if (isNewsLetterError) {
    content = (
      <div className="flex h-full mt-20">
        <Error title={'Error!'} text={'Error fetching newsletters'} />
      </div>
    );
  } else if (newsLetterData && newsLetterData.length > 0) {
    content = newsLetterData.map((newsletter) => (
      <ul
        key={newsletter.id} // Using unique ID for better performance
        className="flex flex-col items-start gap-1 mb-4 p-2 bg-gray-50 rounded-lg"
      >
        <li className="font-bold text-xs">
          Journal: {newsletter.journal ? newsletter.journal : 'N/A'}
        </li>
        <li className="text-xs leading-5 text-gray-700">
          <span className="font-bold">Email</span>: {newsletter.email}
        </li>
        <hr className="w-full border-t border-gray-300" />
      </ul>
    ));
  } else if (newsLetterData && newsLetterData.length === 0) {
    content = <p className="text-gray-500">{'No newsletters found'}</p>;
  }

  return (
    <div className="p-4 w-full md:w-1/2">
      <h2 className="text-slate-800 font-bold text-2xl mb-4">
        All Newsletters
      </h2>
      {content}
    </div>
  );
}
