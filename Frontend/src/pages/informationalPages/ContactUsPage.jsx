import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class ContactUsPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { isSubmitting: false };
  }

  handleSubmit() {
    this.setState({ isSubmitting: true });
    return true;
  }

  render() {
    document.title = "RED | Contact Us";

    return (
      <main>
        <div className="container">
          <h1>Contact Us</h1>
        </div>
        <div className="container greycontainer">
          <form
            name="contactform"
            method="post"
            onSubmit={this.handleSubmit}
            action="send_form_email.php"
          >
            <br style={{ clear: "both" }} />
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                placeholder="Subject"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                type="textarea"
                id="message"
                name="message"
                placeholder="Message"
                maxLength="10000"
                rows="10"
                required
              />
            </div>
            <Button
              className="pull-right"
              type="submit"
              id="submit"
              value="Submit"
              name="submit"
            >
              Send
            </Button>
          </form>
          {this.state.isSubmitting && (
            <div className="container">
              <p className="text-center">
                Thank you for your email.
                <br /> We will get back to you shortly.
              </p>
            </div>
          )}
        </div>
      </main>
    );
  }
}
