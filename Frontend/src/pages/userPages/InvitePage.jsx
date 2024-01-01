import React from "react";
import Input from "../../components/Input";
import auth from "../../utils/auth";
import DisplayError from "../../components/Error";
const imageDir = "../../assets/images/";

export default class InvitePage extends React.Component {
  constructor(props) {
    super(props);
    document.title = "RED | Register";

    this.state = {
      password: "",
      confirmPassword: "",
      formIsValid: true,
      errorMsg: "",
    };

    if (!window.location.hash.includes("#invite_token=")) {
      window.location.href = "/login";
    }
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

    const { password, confirmPassword } = this.state;

    password === confirmPassword
      ? this.handleRegister(password)
      : this.setFormState({
          formIsValid: false,
          errorMsg:
            "Please ensure your passwords match and that you already do not have an account.",
        });
  };

  handleRegister = (password) => {
    this.setFormState({ formisValid: true });

    if (window.location.hash.includes("#invite_token=")) {
      const token = window.location.hash.substring(14);

      auth
        .acceptInvite(token, password, true)
        .then(() => {
          this.setState({ formIsValid: true });
          window.location.href = "/volunteer";
        })
        .catch(() =>
          this.setFormState({
            formIsValid: false,
            errorMsg:
              "Registration failed. Please ensure that you do not already have an account.",
          })
        );
    }
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
            <img src={require(imageDir + "Logo.png")} alt="RED logo symbol" />
            <form name="register" onSubmit={this.handleSubmit}>
              <Input
                name="password"
                label="Password"
                type="password"
                onChange={this.handleInputChange}
              />
              <Input
                name="confirmPassword"
                label="Confirm password"
                type="password"
                onChange={this.handleInputChange}
              />
              <button type="submit">Register</button>
              {this.state.formIsValid ? (
                ""
              ) : (
                <DisplayError msg={this.state.errorMsg} />
              )}
            </form>
          </div>
        </div>
      </main>
    );
  }
}
