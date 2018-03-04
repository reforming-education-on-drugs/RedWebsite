import React from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import { Row, Col } from "react-bootstrap";

export default function TextCarousel(props) {
  TextCarousel.propTypes = {
    testimonials: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  const swiperProps = {
    slidesPerView: 1,
    autoplay: {
      delay: 4000,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };

  return (
    <div className="container" id="testimonial">
      <Row>
        <Col md={8} lgOffset={2}>
          <div className="testimonial-quote">
            <div className="fa fa-quote-left fa-4x" />
            <div className="testimonial-slider">
              <Swiper {...swiperProps}>
                {
                  props.testimonials.map(testimonial => (
                    <div key={testimonial.quote}>
                      <blockquote>
                        <p>&quot;{testimonial.quote}&quot;</p>
                        <p className="testimonial-from">{testimonial.name}</p>
                      </blockquote>
                    </div>
                  ))
                }
              </Swiper>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
