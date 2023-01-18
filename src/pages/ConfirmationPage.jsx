import React, { useState } from "react";
import Input from "../components/Input";
import auth from "../utils/auth";
import DisplayError from "../components/Error";

export default function ConfirmationPage() {
  document.title = "RED | Register";

  const [state, setState] = useState({
    loading: true,
    formIsValid: true,
    errorMsg: "",
  });
  if (!window.location.hash.includes("#confirmation_token=")) {
    window.location.href = "/confirmation";
  }

  setFormState = ({ formIsValid, errorMsg }) => {
    setState({
      formIsValid,
      errorMsg,
    });
  };

  handleRegister = () => {
    this.setFormState({ loading: true });

    if (window.location.hash.includes("#confirmation_token=")) {
      const token = window.location.hash.substring(14);

      auth
        .verifyToken("confirmation", token)
        .then(() => {
          this.setState({ formIsValid: true, loading: false });
          window.location.href = "/volunteer";
        })
        .catch(() =>
          this.setFormState({
            formIsValid: false,
            loading: false,
            errorMsg: "Registration failed. You may have already registered.",
          })
        );
    }
  };

  useEffect(() => {
    return () => {
      handleRegister();
    };
  }, []);

  return (
    <main>
      <div className="identity">
        <div className="identity-card">
          <img
            src={require("../assets/images/Logo.png")}
            alt="RED logo symbol"
          />
          {state.loading ? (
            "loading..."
          ) : state.formIsValid ? (
            "Success!"
          ) : (
            <DisplayError msg={state.errorMsg} />
          )}
        </div>
      </div>
    </main>
  );
}
