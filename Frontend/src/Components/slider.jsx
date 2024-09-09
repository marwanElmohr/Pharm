import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const slides = [
    {
      id: 1,
      image1Url: 'https://static.thenounproject.com/png/5915269-200.png',
      image2Url: 'https://static.thenounproject.com/png/5915269-200.png',
      title: 'Hello world',
      subtitle: 'Carousel with TailwindCSS and React'
    },
    {
      id: 2,
      image1Url: 'https://static.thenounproject.com/png/5915269-200.png',
      image2Url: 'https://static.thenounproject.com/png/5915269-200.png',
      title: 'Hello world 2',
      subtitle: 'Carousel with TailwindCSS and React'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange((currentSlide + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleSlideChange = (index) => {
    const totalSlides = slides.length;
    let validIndex = index;
    if (index < 0) {
      validIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      validIndex = 0;
    }

    setIsFading(true);
    setTimeout(() => {
      setCurrentSlide(validIndex);
      setIsFading(false);
    }, 300);
  };

  return (
    <div className="relative sliderAx">
      <div className="slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`p-10 slider flex items-center ${index === currentSlide ? (isFading ? 'fade-out' : 'fade-in') : 'hidden'}`}
            style={{ backgroundColor: '#f3f4f6' }}
          >
            <div className="flex flex-col w-full md:flex-row items-center justify-center">
              <div className="w-full md:w-1/2 p-4 md:p-0">
                <p className="font-bold text-sm uppercase">Services</p>
                <p className="text-3xl font-bold">{slide.title}</p>
                <p className="text-2xl mb-10 leading-none">{slide.subtitle}</p>
                <a href="#" className="bg-purple-800 py-4 px-7 text-white font-bold uppercase text-xs rounded-full hover-bg hover-text">
                  Shop now
                  <FontAwesomeIcon icon={faChevronRight} className='ml-2 pb-1' />
                </a>
              </div>
              <div
                className="bg-center bg-no-repeat h-full md:h-auto text-white py-48 px-10 w-full md:w-1/2 flex items-center justify-center"
                style={{
                  backgroundImage: `url(${slide.image1Url})`,
                  backgroundSize: 'contain',
                }}
              >
              </div>
              <div
                className="bg-center bg-no-repeat h-full md:h-auto text-white py-48 px-10 w-full md:w-1/2 flex items-center justify-center"
                style={{
                  backgroundImage: `url(${slide.image2Url})`,
                  backgroundSize: 'contain',
                }}
              >
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center space-x-2 py-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-purple-800' : 'bg-gray-400'} border border-gray-300`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
