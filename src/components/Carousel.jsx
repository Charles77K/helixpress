import { useEffect, useState } from 'react';
import { useFetch } from '../services/hooks';
import Error from '../utils/Error';

const Carousel = () => {
  const {
    data: sliderData,
    isError: isSliderError,
    isPending: isSliderLoading,
  } = useFetch('/homesliders/');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  let content;

  if (isSliderLoading) {
    content = (
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="w-full h-64 bg-gray-300 animate-pulse"></div>{' '}
        {/* Skeleton box for the image */}
      </div>
    );
  } else if (isSliderError) {
    content = (
      <div className="flex-center">
        <Error text={'Error fetching slider!'} title={'Error'} />
      </div>
    );
  } else if (sliderData && sliderData.length > 0) {
    content = (
      <div
        className="relative w-full max-w-4xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative flex items-center">
          <button
            className="absolute left-2 z-10 text-white rounded-full p-2 opacity-75 hover:opacity-100 focus:outline-none"
            onClick={() =>
              setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1
              )
            }
          >
            &#10094;
          </button>

          <div className="w-full h-64 relative overflow-hidden">
            {sliderData.map((slide, index) => (
              <div
                key={slide.id}
                className={`${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-500 ease-in-out absolute w-full h-full`}
              >
                {index === currentIndex && (
                  <>
                    <img
                      src={`https://ogbesomto.pythonanywhere.com/${slide.pic}`} // Assuming `pic` contains the image URL
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-teal-600 bg-opacity-75 text-white p-4">
                      <h3 className="font-semibold text-lg">{slide.title}</h3>
                      <p className="text-sm">{slide.body}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {sliderData.map((_, index) => (
                <div
                  key={index}
                  className={`${
                    index === currentIndex ? 'bg-gray-700' : 'bg-gray-300'
                  } w-2 h-2 rounded-full cursor-pointer`}
                  onClick={() => setCurrentIndex(index)}
                ></div>
              ))}
            </div>
          </div>

          <button
            className="absolute right-2 z-10 text-white rounded-full p-2 opacity-75 hover:opacity-100 focus:outline-none"
            onClick={() =>
              setCurrentIndex(
                (prevIndex) => (prevIndex + 1) % sliderData.length
              )
            }
          >
            &#10095;
          </button>
        </div>
      </div>
    );
  } else {
    content = <p className="text-center text-gray-500">No data available</p>;
  }

  useEffect(() => {
    if (isPaused || !sliderData || sliderData.length === 0) return;
    const intervalId = setInterval(
      () => setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderData.length),
      3000
    );
    return () => clearInterval(intervalId);
  }, [currentIndex, isPaused, sliderData]);

  return <>{content}</>;
};

export default Carousel;
