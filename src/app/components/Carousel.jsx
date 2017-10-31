import React from "react";
import Swiper from "react-id-swiper";

function Carousel() {
  const swiperParams = {
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
        <Swiper {...swiperParams}>
          {
            this.props.images.map(image =>
              <div style={{ backgroundImage: `url(${this.props.path}${image})` }} />)
          }
        </Swiper>
      </div>
    </div>
  );
}

export default Carousel;
