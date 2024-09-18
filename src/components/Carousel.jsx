import React, { useEffect, useState } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const intervalId = setInterval(goToNext, 3000);
    return () => clearInterval(intervalId);
  }, [currentIndex, isPaused]);

  const setMouseOver = () => {
    setIsPaused(true);
  };
  const setMouseLeave = () => {
    setIsPaused(false);
  };
  return (
    <div
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={setMouseOver}
      onMouseLeave={setMouseLeave}
    >
      {/* Carousel Wrapper */}
      <div className="relative flex items-center">
        {/* Previous Button */}
        <button
          className="absolute left-2 z-10 text-white rounded-full p-2 opacity-75 hover:opacity-100 focus:outline-none"
          onClick={goToPrevious}
        >
          &#10094;
        </button>

        {/* Carousel Images */}
        <div className="w-full h-64 relative overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-500 ease-in-out absolute w-full h-full`}
            >
              {index === currentIndex && (
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}

          {/* Circle Indicators (Positioned Absolutely) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`${
                  index === currentIndex ? 'bg-gray-700' : 'bg-gray-300'
                } w-2 h-2 rounded-full cursor-pointer`}
                onClick={() => goToSlide(index)}
              ></div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          className="absolute right-2 z-10 text-white rounded-full p-2 opacity-75 hover:opacity-100 focus:outline-none"
          onClick={goToNext}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
