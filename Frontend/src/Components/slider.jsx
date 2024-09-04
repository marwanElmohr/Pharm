import React, { useState, useEffect } from 'react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const slides = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1422&q=80',
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
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsFading(false);
    }, 400);
  };

  return (
    <div className="sliderAx h-auto">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`container containerSlider mx-auto slider ${index === currentSlide ? (isFading ? 'fade-out' : 'fade-in') : 'hidden'}`}
        >
          <div
            className="bg-cover bg-center h-auto text-white py-24 px-10 object-fill"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <div className="md:w-1/2">
              <p className="font-bold text-sm uppercase">Services</p>
              <p className="text-3xl font-bold">{slide.title}</p>
              <p className="text-2xl mb-10 leading-none">{slide.subtitle}</p>
              <a href="#" className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded-3 hover-bg hover-text">Contact us</a>
            </div>
          </div>
          <br />
        </div>
      ))}

      <div className="flex justify-between w-12 mx-auto pb-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`slider-button ${index === currentSlide ? 'selected' : 'unselected'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
