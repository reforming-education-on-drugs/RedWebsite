import React from 'react';
import Input from '../components/Input';
import auth from '../utils/auth';
import DisplayError from '../components/Error';

export default class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    document.title = 'RED | Password Reset';

    this.state = {
      email: '',
      formIsValid: true,
      errorMsg: '',
      isSubmitted: false,
    };
  }

  handleInputChange = (event) => {
    const email = event.target.value;
    
    this.setState({ email: email });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { email } = this.state;

    auth
      .requestPasswordRecovery(email)
      .then(() => this.setState({
        isSubmitted: true,
        formIsValid: true,
      }))
      .catch(() => this.setFormState({
        formIsValid: false,
        errorMsg: 'Request password reset failed, please verify that the email is correct.'
      }));
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
              this.state.isSubmitted
                ? <>
                    <p>An email from <b>no-reply@netlify.com</b> will arrive shortly for you to reset your password.</p>
                    <p>No email? Contact us at reducalgary@gmail.com to request a password reset.</p>
                  </>
                : <form name="register" onSubmit={this.handleSubmit}>
                    <Input name="email" label="Email" type="email" onChange={this.handleInputChange} />
                    <button type="submit">Request password reset</button>
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

