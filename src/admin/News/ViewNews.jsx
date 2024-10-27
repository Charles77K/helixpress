// import React from 'react';
import { useFetchNews } from '../components/Tanstack';
import Loader from '../../UI/Loader';
import Error from '../../utils/Error';

export default function ViewNews() {
  const { newsData, isNewsError, isNewsLoading } = useFetchNews();

  let content;
  if (isNewsLoading) {
    content = <Loader />;
  } else if (isNewsError) {
    content = <Error title={'Error!'} text={'Error fetching news'} />;
  } else if (newsData && newsData.length > 0) {
    content = newsData.map((issue, index) => (
      <ul
        key={index}
        className="flex flex-col items-start gap-1 mb-4 p-2 bg-gray-50 rounded-lg"
      >
        <li className="font-bold text-sm mb-1">Title: {issue.title}</li>
        <li className="text-xs leading-5 text-gray-700 mb-1">
          <span className="font-bold">Body</span>: {issue.body}
        </li>
        <li className="text-xs leading-5 text-gray-700 mb-1">
          <span className="font-bold">Date</span>:{' '}
          {new Date(issue.date_created).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </li>
        <hr className="w-full border-t border-gray-300" />
      </ul>
    ));
  } else if (newsData && !newsData.length > 0) {
    content = <p className="text-gray-500">{'no issues found'}</p>;
  }

  return (
    <div className="p-4 w-full md:w-1/2">
      <h2 className="text-slate-800 font-bold text-2xl mb-4">All News</h2>
      {content}
    </div>
  );
}
