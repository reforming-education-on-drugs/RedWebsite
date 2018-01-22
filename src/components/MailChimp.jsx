import React from "react";

export default function MailChimp() {
  const mcEmbedSignup = {
    clear: "left",
    font: "14px Helvetica, Arial, sans-serif",
    width: "100%",
  };

  return (
    <div>
      <link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css" />
      <div id="mc_embed_signup" style={mcEmbedSignup}>
        <form
          action="//rededucate.us14.list-manage.com/subscribe/post?u=a34f6f98c67b9ff0980cca0e9&amp;id=d8c093bfa0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
          noValidate
        >
          <div id="mc_embed_signup" style={mcEmbedSignup}>
            <label htmlFor="EMAIL">Subscribe to our Newsletter</label>
            <input
              type="email"
              name="EMAIL"
              className="email"
              id="mce-EMAIL"
              placeholder="email address"
              required
            />
            <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
              <input type="text" name="b_a34f6f98c67b9ff0980cca0e9_d8c093bfa0" tabIndex="-1" value="" />
            </div>
            <div className="clear">
              <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
