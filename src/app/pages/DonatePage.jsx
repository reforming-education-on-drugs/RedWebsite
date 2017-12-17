import React from "react";

export default function DonatePage() {
  document.title = "RED | Donate";

  return (
    <main>
      <div className="container">
        <h1>Donate</h1>
      </div>
      <div className="container redcontainer">
        <h2>Like what we do? Please consider donating.</h2>
        <br />
        <p>Please click the link below to donate to RED through PayPal. PayPal is a secure method for transferring funds online.
          <br />
          We are thankful for your support. Every contribution will go towards improving our presentations and operational efficiencies.
        </p>
      </div>
      <div className="text-center">
        <a
          href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RTQAEFUZQ9XVN"
          role="button"
          id="donateButton"
          className="btn btn-primary btn-lg"
        >
          Donate
        </a>
      </div>
    </main>
  );
}
