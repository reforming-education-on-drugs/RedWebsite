import React from 'react';
import Input from '../components/Input';
import auth from '../utils/auth';
import DisplayError from '../components/Error';

export default class InvitePage extends React.Component {
  constructor(props) {
    super(props);
    document.title = 'RED | Recover Account';

    this.state = {
      password: '',
      confirmPassword: '',
      formIsValid: true,
      errorMsg: '',
      passwordResetted: false,
    };
  }

  componentWillMount() {
    if (!window.location.hash.includes('#recovery_token=')) {
      window.location.href = '/password-reset';
    }
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

    const { password, confirmPassword } = this.state;

    password === confirmPassword
      ? this.handleRegister(password)
      : this.setFormState({
        formIsValid: false,
        errorMsg: 'Please ensure your passwords match.'
      });
  }

  handleRegister = (password) => {

    this.setFormState({ formisValid: true });
    
    if (window.location.hash.includes('#recovery_token=')) {
      const token = window.location.hash.substring(16);

      auth
        .recover(token)
        .then(() => {
          const user = auth.currentUser();
          
          user
            .update({ email: user.email, password: password })
            .then(() => this.setState({ 
              passwordResetted: true,
              formisValid: true,
            }))
            .catch(() => this.setFormState({
              formIsValid: false,
              errorMsg: 'Failed to reset password.'
            }));
        })
        .catch(() => this.setFormState({
          formIsValid: false,
          errorMsg: 'Account recovery failed. Please ensure that you have an account.'
        })
      );
    }
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
            {
              this.state.passwordResetted
                ? <div>
                    <p>Your password has successfully been changed.</p>
                    <button type="button" onClick="window.location.href='/login'">Login</button>
                  </div>
                : <form name="recover" onSubmit={this.handleSubmit}>
                    <Input name="password" label="Password" type="password" onChange={this.handleInputChange} />
                    <Input name="confirmPassword" label="Confirm password" type="password" onChange={this.handleInputChange} />
                    <button type="submit">Change password</button>
                    {
                      this.state.formIsValid ? '' : <DisplayError msg={this.state.errorMsg} />
                    }
                  </form>
            }
          </div>
        </div>
      </main>
    );
  }
}

