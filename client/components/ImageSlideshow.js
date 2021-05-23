import React from "react";
import Slider from "react-slick";

const ImageSlideshow = (props) => {
  const { slides } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="image-slideshow">
      <Slider {...settings}>
        {slides.map((slide, i) => (
          <div className="image-slide" key={slide.id}>
            <img src={slide.imageUrl} />
            <span>
              {i + 1}/{slides.length}
            </span>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlideshow;
