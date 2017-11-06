import React from "react";

export default function DonatePage() {
  document.title = "RED | Donate";

  return (
    <main>
      <div className="container">
        <h1 className="text-center">Donate</h1>
      </div>
      <div className="container">
        <h2 className="text-center">Thank You!</h2>
        <p>You can click the link below to donate to RED using PayPal. PayPal is a secure method for transferring funds online.
          <br />
          We are thankful for your donation and every contribution helps.
        </p>
        <p>
          <a
            href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RTQAEFUZQ9XVN"
            role="button"
            id="donateButton"
            className="btn btn-primary btn-lg"
          >
            Donate
          </a>
        </p>
      </div>
    </main>
  );
}
