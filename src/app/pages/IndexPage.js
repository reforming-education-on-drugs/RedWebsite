'use strict'

import React, { Component } from 'react'
import Carousel from '../components/Carousel'

class IndexPage extends Component {
  render() {

    document.title = 'RED | Reforming Education on Drugs';
    const imageList = ['main10.jpg', 'main3.jpg', 'main5.jpg', 'main8.jpg', 'main9.jpg']

    return(
      <main>
        <Carousel images={imageList}/>
        <Description />
        {/* TODO: Testimonials */}
        {/* TODO: MailChimp Sign Up form */}
        {/* TODO: Brands */}
        {/* TODO: Footer */}
      </main>
    )
  }
}

class Description extends Component {
  render() {

    return (
      <div className="coloredcontainer">
        <div className="container">
          <h1 className="text-center">Reforming Education on Drugs</h1>
          <p>RED’s mission is to establish a foundational understanding of the biological mechanisms involved in illicit drug use and substance abuse. With interactive in-class presentations and demonstrations, we provide students with the ability to engage and think critically with these topics, all while developing a love for learning science.</p>
        </div>  
      </div>
    )
  }
}

export default IndexPage