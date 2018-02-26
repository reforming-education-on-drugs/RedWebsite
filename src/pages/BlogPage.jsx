import React from "react";
import BlogData from "../data/blog-content.json";
// Don't import white version of these images because we use CSS to dictate the black/white altnerating
import BlackCalendar from '../assets/images/blog-images/blog-icons/calendar-black.png';
import BlackLocation from '../assets/images/blog-images/blog-icons/location-black.png';

export default function BlogPage() {
  document.title = "RED | Blog";

  return (
    <main>
      <section id="blog">
        <div className="redcontainer container blog-header">
          <h2>RED Events</h2>
          <p>There is always more to learn! Join us at our events and get the information you need.</p>
        </div>

        <div className="blog container" id="blogcontainer">
          {
            BlogData.blog.map(blogItem => (
              <div className="blog-item">
                <h2>{blogItem.title}</h2>
                <div className="date-location">
                  <span>
                    <img className="blog-icons" id="date" src={BlackCalendar} alt="calendar-icon" />
                    {blogItem.date}
                  </span>
                  <span>
                    <img className="blog-icons" id="location" src={BlackLocation} alt="location-icon" />
                    {blogItem.location}
                  </span>
                </div>
                <div className="blog-content">
                  <img src={require(`../assets/images/blog-images/${blogItem.imageName}`)} width="80%" alt={blogItem.imageAltText} />
                  { /* only way to set HTML from strings */ }
                  <p dangerouslySetInnerHTML={{ __html: blogItem.content }} />
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </main>
  );
}
