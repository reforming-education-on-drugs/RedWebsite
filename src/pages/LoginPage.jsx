import React from 'react';
import Input from '../components/Input';
import DisplayError from '../components/Error';
import auth from '../utils/auth';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    document.title = 'RED | Login';

    this.state = {
      email: '',
      password: '',
      formIsValid: true,
      errorMsg: '',
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

    const { email, password } = this.state;

    auth
      .login(email, password, true)
      .then(() => window.location.href = '/volunteer')
      .catch(() => this.setFormState({
        formIsValid: false,
        errorMsg: 'Login failed. Please ensure your password is correct.'
      })
    );
  }

  setFormState = ({ formIsValid, errorMsg }) => { 
    this.setState({ 
      formIsValid,
      errorMsg
    });
  }

  render() {
    return (
      <main>
        <div className="identity">
          <div className="identity-card">
            <img src={require('../assets/images/Logo.png')} alt="RED logo symbol" />
            <form name="login" onSubmit={this.handleSubmit}>
              <Input name="email" label="Email" type="email" onChange={this.handleInputChange} />
              <Input name="password" label="Password" type="password" onChange={this.handleInputChange} />
              <div className="password-reset">
                <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Forgot your password?</a>
              </div>
              <button type="submit">Sign in</button>
              {
                this.state.formIsValid ? '' : <DisplayError msg={this.state.errorMsg} />
              }
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
