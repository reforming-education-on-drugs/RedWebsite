import React from "react";
import GoTrue from 'gotrue-js';
import Input from "../components/Input";

const auth = new GoTrue({
  APIUrl: "https://reducalgary.netlify/identity",
  audience: "",
  setCookie: false
});



export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    document.title = "RED | Login";
  }

  render() {
    return (
      <main>
        <div className="login">
          <div className="login-card">
            <img src={require('../assets/images/Logo.png')} alt="RED logo symbol" />
            <form name="login">
              <Input label="Email" type="email" />
              <Input label="Password" type="password" />
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
