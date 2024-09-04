import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const slides = [
    {
      id: 1,
      imageUrl: 'https://th.bing.com/th/id/OIP.UeSwYIs0VZjDeZJH6hR0HAHaHa?rs=1&pid=ImgDetMain',
      title: 'Hello world',
      subtitle: 'Carousel with TailwindCSS and React'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      title: 'Hello world',
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
    const validIndex = Math.max(0, Math.min(index, totalSlides - 1));
  
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlide(validIndex);
      setIsFading(false);
    }, 400);
  };  

  return (
    <div className="relative sliderAx h-auto">

      <div className="slider h-auto mx-auto">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`container containerSlider mx-auto p-5 slider flex items-center ${index === currentSlide ? (isFading ? 'fade-out' : 'fade-in') : 'hidden'}`}
            style={{ backgroundColor: '#f3f4f6' }}
          >
            <div className="flex flex-col md:flex-row w-full">
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
                className="bg-center bg-no-repeat h-full md:h-auto text-white py-24 px-10 w-full md:w-1/2 flex items-center justify-center"
                style={{
                  backgroundImage: `url(${slide.imageUrl})`,
                  backgroundSize: 'contain'
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

      <div className="absolute left-16 top-1/2 transform -translate-y-1/2 p-2 rounded-full cursor-pointer fa-2x" onClick={() => handleSlideChange(currentSlide - 1)}>
        <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
      </div>
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2 p-2 rounded-full cursor-pointer fa-2x" onClick={() => handleSlideChange(currentSlide + 1)}>
        <FontAwesomeIcon icon={faChevronRight} className="text-white" />
      </div>
    </div>
  );
};

export default Slider;
