import React from "react";
import PropTypes from "prop-types";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import Swiper from "react-id-swiper";

const ImageCarousel = (props) => {
  ImageCarousel.propTypes = {
    path: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  SwiperCore.use([Navigation, Pagination, Autoplay]);

  const swiperProps = {
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  return (
    <div className="container" id="swiper">
      <div className="simple-slider">
        <Swiper {...swiperProps}>
          {props.images.map((image) => (
            <div
              key={image}
              style={{ backgroundImage: `url(${props.path}${image})` }}
            />
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageCarousel;
