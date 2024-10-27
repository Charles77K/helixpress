// import React from 'react';

import { useFetchSlider } from '../components/Tanstack';
import Loader from './../../UI/Loader';
import Error from './../../utils/Error';

export default function ViewSlider() {
  const { sliderData, isSliderError, isSliderLoading } = useFetchSlider();

  let content;
  if (isSliderLoading) {
    content = (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  } else if (isSliderError) {
    content = (
      <div className="flex justify-center items-center">
        <Error title={'Error!'} text={'Error fetching sliders'} />
      </div>
    );
  } else if (sliderData && sliderData.length > 0) {
    content = sliderData.map((slider, index) => (
      <ul
        key={index}
        className="flex flex-col items-start gap-1 mb-4 p-2 bg-gray-50 rounded-lg"
      >
        <li className="font-bold text-sm">Title: {slider.title}</li>
        <li className="text-xs leading-5 text-gray-700 mb-1">
          <span className="font-bold">Body</span>: {slider.body}
        </li>
        <li className="text-xs leading-5 text-gray-700 mb-1">
          <span className="font-bold">Date</span>:{' '}
          {new Date(slider.date_created).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </li>
        <hr className="w-full border-t border-gray-300" />
      </ul>
    ));
  } else if (sliderData && !sliderData.length > 0) {
    content = <p className="text-gray-500">{'no slider found'}</p>;
  }
  return (
    <div className="p-4 w-full md:w-1/2">
      <h2 className="text-slate-800 font-bold text-2xl mb-4">
        All Home-Slider
      </h2>
      {content}
    </div>
  );
}
