// import React from 'react';
import { PropTypes } from 'prop-types';

import Loader from '../../UI/Loader';
import Error from '../../utils/Error'; // Assuming this is the correct import path

const GenericView = ({
  genericDataLoading,
  genericData,
  genericDataError,
  label,
}) => {
  GenericView.propTypes = {
    genericData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.any.isRequired,
        content: PropTypes.string, // Assuming data has a 'content' property
      })
    ),
    genericDataLoading: PropTypes.bool.isRequired,
    genericDataError: PropTypes.bool.isRequired,
    label: PropTypes.string,
  };

  let content;
  if (genericDataLoading) {
    content = (
      <div className="flex justify-center items-center mt-10">
        <Loader />
      </div>
    );
  } else if (genericDataError) {
    content = (
      <div className="flex h-full mt-20">
        <Error title={'Error!'} text={`Error fetching ${label}`} />
      </div>
    );
  } else if (genericData && genericData.length > 0) {
    content = genericData.map((data) => (
      <ul
        key={data.id} // Using unique ID for better performance
        className="flex flex-col items-start gap-1 mb-4 px-2 py-4 bg-gray-50 rounded-lg"
      >
        <li className="font-bold text-sm">Content: {data.content}</li>
        <hr className="w-full border-t border-gray-300" />
      </ul>
    ));
  } else {
    content = <p>{`no ${label} found`}</p>;
  }
  return (
    <div className="p-4 w-full md:w-1/2">
      <h2 className="text-slate-800 font-bold text-2xl mb-4">All {label}</h2>
      {content}
    </div>
  );
};

export default GenericView;
