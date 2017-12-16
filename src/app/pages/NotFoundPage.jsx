import React from "react";

export default function NotFoundPage() {
  document.title = "RED | Page Not Found";

  return (
    <main className="text-center">
      <img src="../assets/img/symbol.png" width="50px" height="50px" style={{ margin: "2em 0" }} alt="RED logo symbol" />
      <div className="container redcontainer">
        <h2>Oops! Page not found!</h2>
        <p>We're sorry, the page you requested was not found.</p>
        <p>Visit our <a href="http://www.rededucate.com/">home page</a> or any of the navigation links above.</p>
      </div>
    </main>
  );
}
