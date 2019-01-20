import React from "react";
import Input from "../components/Input";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    document.title = "RED | Login";

    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    
    this.setState({
      [name]: target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <main>
        <div className="identity">
          <div className="identity-card">
            <img src={require('../assets/images/Logo.png')} alt="RED logo symbol" />
            <form name="login">
              <Input name="email" label="Email" type="email" onChange={this.handleInputChange} />
              <Input name="password" label="Password" type="password" onChange={this.handleInputChange} />
              <div className="password-reset">
                <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Forgot your password?</a>
              </div>
              <button type="submit">Sign in</button>
            </form>
          </div>
          <div className="disclaimer">
            <p><span>Don't have an account?</span>&nbsp;You need to become a member before you can sign up to volunteer.</p>
          </div>
        </div>
      </main>
    );
  }
}
