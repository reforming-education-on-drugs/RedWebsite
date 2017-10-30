import React, { Component } from 'react'
import Swiper from 'react-id-swiper'

class IndexPage extends Component {
  render() {

    document.title = "RED | Reforming Education on Drugs";

    return(
      <main>
        <SwiperSlider />
        <Description />
        {/* TODO: Testimonials */}
        {/* TODO: MailChimp Sign Up form */}
        {/* TODO: Brands */}
        {/* TODO: Footer */}
      </main>
    )
  }
}

class SwiperSlider extends Component {
  render() {

    const swiperParams = {
      slidesPerView: 1,
      autoplay: {
        delay: 5000,
      },
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    }

    return (
      <div className="container" id="swiper">
        <div className="simple-slider">
          <Swiper {...swiperParams}>
            <div style={{backgroundImage: 'url(/assets/img/main10.jpg)'}} />
            <div style={{backgroundImage: 'url(/assets/img/main3.jpg)'}} />
            <div style={{backgroundImage: 'url(/assets/img/main5.jpg)'}} />
            <div style={{backgroundImage: 'url(/assets/img/main8.jpg)'}} />
            <div style={{backgroundImage: 'url(/assets/img/main9.jpg)'}} />
          </Swiper>
        </div>
      </div>
    )
  }
}

class Description extends Component {
  render() {

    return (
      <div className="coloredcontainer">
        <div className="container">
          <h1 className="text-center">Reforming Education on Drugs</h1>
          <p>RED’s mission is to establish within students a foundational understanding of the biological mechanisms involved in illicit drug use and substance abuse. Through the use of interactive in-class presentations and demonstrations, we provide individuals with the ability to engage and think critically with these topics, all the while developing a love for science learning.</p>
        </div>
      </div>
    )
  }
}

export default IndexPage