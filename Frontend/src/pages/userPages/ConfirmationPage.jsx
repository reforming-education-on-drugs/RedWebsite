import React, { useState, useEffect } from "react";
// import Input from "../components/Input";
import auth from "../../utils/auth";
import DisplayError from "../../components/Error";
const imageDir = "../../assets/images/";

export default function ConfirmationPage() {
  document.title = "RED | Register";

  const [state, setState] = useState({
    loading: true,
    formIsValid: true,
    errorMsg: "",
  });
  // if (!window.location.hash.includes("#confirmation_token=")) {
  //   window.location.href = "/confirmation";
  // }

  // const setFormState = ({ formIsValid, errorMsg }) => {
  //   setState({
  //     formIsValid,
  //     errorMsg,
  //   });
  // };

  const handleRegister = () => {
    setState({ loading: true });

    if (window.location.hash.includes("#confirmation_token=")) {
      const token = window.location.hash.substring(20);
      console.log(window.location.hash);
      console.log(token);
      auth
        .confirm(token, true)
        .then(() => {
          setState({ formIsValid: true, loading: false });
          window.location.href = "/volunteer";
        })
        .catch(() =>
          setState({
            formIsValid: false,
            loading: false,
            errorMsg: "Registration failed. You may have already registered.",
          })
        );
    }
  };

  useEffect(() => {
    handleRegister();
  }, []);

  return (
    <main>
      <div className="identity">
        <div className="identity-card">
          <img src={require(imageDir + "Logo.png")} alt="RED logo symbol" />
          {state.loading ? (
            <div>
              <p>loading...</p>
            </div>
          ) : state.formIsValid ? (
            <div>
              <p>Success!</p>
            </div>
          ) : (
            <DisplayError msg={state.errorMsg} />
          )}
        </div>
      </div>
    </main>
  );
}
