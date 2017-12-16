import React from "react";
import BlogData from "../data/blog-content.json";

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
            BlogData.blogs.map(blog => (
              <div className="blog-item">
                <h2 className="text-center">{blog.title}</h2>
                <div className="date-location">
                  <span>
                    <img className="blog-icons" id="date" src="../assets/img/blog-imgs/blog-icons/calendar-black.png" alt="calendar-icon" />
                    {blog.date}
                  </span>
                  <span>
                    <img className="blog-icons" id="location" src="../assets/img/blog-imgs/blog-icons/location-black.png" alt="location-icon" />
                    {blog.location}
                  </span>
                </div>
                <div className="blog-content">
                  <img src={`/assets/img/blog-imgs/${blog.imageName}`} width="80%" alt={blog.imageAltText} />
                  { /* only way to set HTML from strings */ }
                  <p dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </main>
  );
}
