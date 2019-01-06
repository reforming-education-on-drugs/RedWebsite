import React from "react";
import Input from "../components/Input";

export default function LoginPage() {
  document.title = "RED | Login";

  return (
    <main>
      <div className="login">
        <div className="login-card">
          <img src={require('../assets/images/Logo.png')} alt="RED logo symbol" />
          <form>
            <Input label="Email" type="email" />
            <Input label="Password" type="password" />
          </form>
          <div className="password-reset">
            <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Forgot your password?</a>
          </div>
          <button>Sign in</button>
        </div>
        <div className="disclaimer">
          <p><span>Don't have an account?</span>&nbsp;You need to become a member before you can sign up to volunteer.</p>
        </div>
      </div>
    </main>
  );
}
