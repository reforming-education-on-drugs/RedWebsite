import React from "react";
// const imageDir = "../../assets/images/";
import symbol from "../../assets/images/Symbol.png";

export default function NotFoundPage() {
  document.title = "RED | Page Not Found";

  return (
    <main className="text-center">
      <div className="container">
        <img
          src={symbol}
          width="50px"
          height="50px"
          style={{ marginTop: "20px", marginBottom: "10px" }}
          alt="RED logo symbol"
        />
      </div>
      <div className="container redcontainer">
        <h2>Oops! Page not found!</h2>
        <br />
        <p>We're sorry, the page you requested was not found.</p>
        <p>
          Visit our <a href="https://www.rededucate.com/">home page</a> or any
          of the navigation links above.
        </p>
      </div>
    </main>
  );
}
