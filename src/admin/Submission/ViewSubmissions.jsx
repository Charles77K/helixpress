// import React from 'react';
import { useFetchSubmissions } from '../components/Tanstack'; // Adjust the import according to your file structure
import Loader from './../../UI/Loader';
import Error from './../../utils/Error';

export default function ViewSubmissions() {
  const { submissionData, isSubPending, isSubError } = useFetchSubmissions();

  let content;

  if (isSubPending) {
    content = (
      <div className="flex justify-center items-center mt-10">
        <Loader />
      </div>
    );
  } else if (isSubError) {
    content = (
      <div className="flex h-full mt-20">
        <Error title={'Error!'} text={'Error fetching submissions'} />
      </div>
    );
  } else if (submissionData && submissionData.length > 0) {
    content = submissionData.map((submission) => (
      <ul
        key={submission.id} // Using unique ID for better performance
        className="flex flex-col items-start gap-1 mb-4 p-2 bg-gray-50 rounded-lg"
      >
        <li className="font-bold text-xs">
          First Name: {submission.firstname}
        </li>
        <li className="font-bold text-xs">Last Name: {submission.lastname}</li>
        <li className="text-xs leading-5 text-gray-700">
          <span className="font-bold">Email</span>: {submission.email}
        </li>
        <li className="text-xs leading-5 text-gray-700">
          <span className="font-bold">Country</span>: {submission.country}
        </li>
        <li className="text-xs leading-5 text-gray-700">
          <span className="font-bold">Date Submitted</span>:{' '}
          {new Date(submission.date_submitted).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </li>
        <hr className="w-full border-t border-gray-300" />
      </ul>
    ));
  } else if (submissionData && submissionData.length === 0) {
    content = <p className="text-gray-500">{'No submissions found'}</p>;
  }

  return (
    <div className="p-4 w-full md:w-1/2">
      <h2 className="text-slate-800 font-bold text-2xl mb-4">
        All Submissions
      </h2>
      {content}
    </div>
  );
}
