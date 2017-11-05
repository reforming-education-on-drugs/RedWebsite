import React from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";

export default function ImageCarousel(props) {
  ImageCarousel.propTypes = {
    path: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

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
          {
            props.images.map(image =>
              <div key={image} style={{ backgroundImage: `url(${props.path}${image})` }} />)
          }
        </Swiper>
      </div>
    </div>
  );
}
