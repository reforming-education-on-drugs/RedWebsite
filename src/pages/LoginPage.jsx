import React from "react";
import Input from "../components/Input";
import DisplayError from "../components/Error";
import auth from "../utils/auth";
import { Link } from "react-router-dom";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    document.title = "RED | Login";

    this.state = {
      email: "",
      password: "",
      formIsValid: true,
      errorMsg: "",
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    auth
      .login(email, password, true)
      .then(() => {
        this.setState({ formIsValid: true });
        window.location.href = "/volunteer";
      })
      .catch(() =>
        this.setFormState({
          formIsValid: false,
          errorMsg: "Login failed. Please ensure your password is correct.",
        })
      );
  };

  setFormState = ({ formIsValid, errorMsg }) => {
    this.setState({
      formIsValid,
      errorMsg,
    });
  };

  render() {
    return (
      <main>
        <div className="identity">
          <div className="identity-card">
            <img
              src={require("../assets/images/Logo.png")}
              alt="RED logo symbol"
            />
            <form name="login" onSubmit={this.handleSubmit}>
              <Input
                name="email"
                label="Email"
                type="email"
                onChange={this.handleInputChange}
              />
              <Input
                name="password"
                label="Password"
                type="password"
                onChange={this.handleInputChange}
              />
              <div className="password-reset">
                {/* <a href="/password-reset">Forgot your password?</a> */}
                <Link to="/password-reset">Forgot your password?</Link>
              </div>
              <button type="submit">Login</button>
              {this.state.formIsValid ? (
                ""
              ) : (
                <DisplayError msg={this.state.errorMsg} />
              )}
            </form>
          </div>
          <div className="disclaimer">
            <p>
              <span>Don't have an account?</span>&nbsp;You need to become a
              member before you can sign up to volunteer. In addition to
              completing our{" "}
              <Link to="/get-involved">club membership form</Link>, please
              contact us at{" "}
              <a href="mailto:reducalgary@gmail.com">reducalgary@gmail.com</a>{" "}
              to submit your membership fee and finalize your membership.
            </p>
          </div>
        </div>
      </main>
    );
  }
}
