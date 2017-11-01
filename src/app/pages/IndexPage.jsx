import React from "react";
import Carousel from "../components/Carousel";

function IndexPage() {
  document.title = "RED | Reforming Education on Drugs";
  const carousel = {
    path: "/assets/img/",
    images: ["main10.jpg", "main3.jpg", "main5.jpg", "main8.jpg", "main9.jpg"],
  };

  return (
    <main>
      <Carousel path={carousel.path} images={carousel.images} />
      <Description />
      <Testimonials />
      {/* TODO: MailChimp Sign Up form */}
      {/* TODO: Brands */}
      {/* TODO: Footer */}
    </main>
  );
}

function Description() {
  return (
    <div className="coloredcontainer">
      <div className="container">
        <h1 className="text-center">Reforming Education on Drugs</h1>
        { // eslint-disable-next-line
        }<p>RED’s mission is to establish a foundational understanding of the biological mechanisms involved in illicit drug use and substance abuse. With interactive in-className presentations and demonstrations, we provide students with the ability to engage and think critically with these topics, all while developing a love for learning science.</p>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div className="container" id="testimonial">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="quote"><i className="fa fa-quote-left fa-4x" />
            <div className="carousel slide" id="fade-quote-carousel" data-ride="carousel" data-interval="5000">
              <ol className="carousel-indicators">
                <li data-target="#fade-quote-carousel" data-slide-to="0" className="active" />
                <li data-target="#fade-quote-carousel" data-slide-to="1" />
                <li data-target="#fade-quote-carousel" data-slide-to="2" />
              </ol>
              <div className="carousel-inner">
                <div className="item">
                  <blockquote>
                    <p>&quot;It was really informative, I learned new things myself.&quot;</p>
                    <p id="testimonialfrom">- G.P. Vanier Grade 7 Teacher</p>
                  </blockquote>
                </div>
                <div className="item">
                  <blockquote>
                    <p>&quot;Your instructors were excellent. Thank you so much.&quot;</p>
                    <p id="testimonialfrom">- G.P. Vanier Grade 7 Teacher</p>
                  </blockquote>
                </div>
                <div className="active item">
                  <blockquote>
                    <p>&quot;Same time next year. With thanks to all.&quot;</p>
                    <p id="testimonialfrom">- G.P. Vanier Grade 9 Teacher</p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default IndexPage;
