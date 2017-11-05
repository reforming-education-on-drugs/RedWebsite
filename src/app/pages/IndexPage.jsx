import React from "react";
import ImageCarousel from "../components/ImageCarousel";
import Testimonials from "../components/TextCarousel";
import MailChimp from "../components/MailChimp";

export default function IndexPage() {
  document.title = "RED | Reforming Education on Drugs";

  const carousel = {
    path: "/assets/img/",
    images: ["main10.jpg", "main3.jpg", "main5.jpg", "main8.jpg", "main9.jpg"],
  };

  const textCarousel = {
    quotes: [
      {
        name: "- G.P. Vanier Grade 7 Teacher",
        quote: "It was really informative, I learned new things myself.",
      },
      {
        name: "- G.P. Vanier Grade 7 Teacher",
        quote: "Your instructors were excellent. Thank you so much.",
      },
      {
        name: "- G.P. Vanier Grade 9 Teacher",
        quote: "Same time next year, with thanks to all.",
      },
    ],
  };

  return (
    <main>
      <ImageCarousel path={carousel.path} images={carousel.images} />
      <Description />
      <Testimonials testimonials={textCarousel.quotes} />
      <MailChimp />
      <Brands />
    </main>
  );
}

function Description() {
  return (
    <div className="coloredcontainer">
      <div className="container">
        <h1 className="text-center">Reforming Education on Drugs</h1>
        { // eslint-disable-next-line
        }<p>RED’s mission is to establish a foundational understanding of the biological mechanisms involved in illicit drug use and substance abuse. With interactive in-class presentations and demonstrations, we provide students with the ability to engage and think critically with these topics, all while developing a love for learning science.</p>
      </div>
    </div>
  );
}

function Brands() {
  return (
    <div className="brands">
      <img src="/assets/img/UniversityOfCalgary.png" alt="University of Calgary" />
      <img src="/assets/img/StudentUnion.png" alt="Students' Union" />
      <img src="/assets/img/Devon.png" alt="Devon" />
    </div>
  );
}
