import React from "react";
import { useState, useEffect } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import Input from "../components/Input";
import DisplayError from "../components/Error";
import auth from "../utils/auth";

const emailRegex =
  /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(ucalgary)\.(com|ca)$/g;

function showExecPositions(hiring) {
  if (hiring) {
    return (
      <div id="executive-membership">
        <h3>Join our award-winning team!</h3>
        <p className="smaller-width-paragraph">
          If you are passionate and dedicated to making a large impact in our
          community while creating remarkable experiences, then please join our
          team!
        </p>
        {/* <ul>
          <li>1 JR Finance</li>
          <li>3 JR Education</li>
          <li>1 JR Internal</li>
          <li>1 JR External</li>
          <li>2 JR Information &amp; Technology</li>
        </ul> */}
        <br></br>
        <p>
          If you have any questions about our roles, please contact us at&nbsp;
          <a href="mailto:reducalgary@gmail.com?Subject=Executive Membership">
            reducalgary@gmail.com
          </a>
        </p>
        <div className="membership-email">
          <p>
            If you are interested in joining our team, please fill our{" "}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSe15Wv21D5vfx7PhfLqWAflEm_v2a1rHOBuEySk9ZjH6CYe-A/viewform">
              application form!
            </a>
          </p>
        </div>
        <p id="warning" className="smaller-width-paragraph">
          If you wish to join our executive team, please include your resume and
          a summary of why you would be a great candidate to join our team.
        </p>
      </div>
    );
  }

  // No executive positions available
  return (
    <React.Fragment>
      <p>
        Unfortunately, there are no executive positions available at this time.
      </p>
      <p>
        We encourage you to sign up as an <a href="/get-involved">Educator</a>{" "}
        and <span style={{ color: "red" }}>like</span> our page on{" "}
        <a
          href="https://www.facebook.com/REDxClub"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>{" "}
        to receive updates and volunteering opportunities!
      </p>
    </React.Fragment>
  );
}

export default function GetInvolvedPage() {
  document.title = "RED | Get Involved";

  const [userInfo, setUserInfo] = useState({
    uofcEmail: null,
    password: null,
    confirmPassword: null,
  });
  const [form, setForm] = useState({
    isValid: true,
    errorMsg: "",
    passed: false,
  });
  const [googleFormPage, setGoogleFormPage] = useState(0);
  useEffect(() => {
    if (googleFormPage >= 2) {
      signupUser(userInfo.uofcEmail, userInfo.password);
    }
  }, [googleFormPage]);

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;

    setUserInfo((state) => ({
      ...state,
      [name]: target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!emailRegex.test(userInfo.uofcEmail)) {
      setForm({
        isValid: false,
        errorMsg: "Please enter a valid @uCalgary.ca email address.",
        passed: false,
      });
    } else if (
      userInfo.password != userInfo.confirmPassword ||
      userInfo.password === null
    ) {
      setForm({
        isValid: false,
        errorMsg: "Password confirmation does not match password",
        passed: false,
      });
    } else {
      setForm({
        isValid: true,
        errorMsg: "",
        passed: true,
      });
    }
  };

  const googleFormLoaded = () => {
    console.log("Google form load");
    setGoogleFormPage((state) => state + 1);
  };

  const signupUser = (email, pass) => {
    auth
      .signup(email, pass)
      .then((response) => console.log("Confirmation email sent", response))
      .catch((error) => console.log("It's an error", error));
  };

  return (
    <main>
      <Container>
        <div>
          <h1>Get Involved</h1>
        </div>
        <Tabs justified id="Memberships">
          <Tab eventKey={1} title="Club Membership">
            <div id="club-membership" className="tab-pane">
              <div className="container">
                <h2>Club Membership</h2>
                <p className="smaller-width-paragraph">
                  At RED, our educators are at the core of our club and are
                  vital for our successful endeavours. As an educator of RED,
                  you will have volunteer opportunities to run interactive
                  presentation activities at our volunteering events. Before
                  every event, we try to ensure that we provide enough learning
                  resources and practice sessions to ensure that every educator
                  feels more comfortable presenting the material.
                </p>
                <p className="smaller-width-paragraph">
                  Throughout your experience, you can also expect to gain
                  immediate expertise the areas of public speaking, team-based
                  collaboration and leadership, all while contributing an
                  interesting and professional position to your resumé or
                  portfolio. There are also opportunities available to join our
                  executive team and continue impacting the community!
                </p>
                <p>
                  Registration as an educator is open to all University of
                  Calgary Students.
                </p>
                <p>
                  For any questions or inquiries, please contact us at&nbsp;
                  <a href="mailto:reducalgary@gmail.com?Subject=Membership questions">
                    reducalgary@gmail.com
                  </a>
                </p>

                <div className="membership-email">
                  <p>
                    If you are interested in volunteering, please fill our{" "}
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeXASVim6TrHkD3zSHiTBS4Zs2g-TtuY3IfTUGHPkugIVoBkA/viewform">
                      application form!
                    </a>
                  </p>
                </div>
                {!form.passed ? (
                  <div className="identity">
                    <div className="identity-card">
                      <p>Please confirm your University of Calgary email.</p>
                      <form name="login" onSubmit={handleSubmit}>
                        <Input
                          name="uofcEmail"
                          label="Email"
                          type="email"
                          onChange={handleInputChange}
                        />
                        <Input
                          name="password"
                          label="Password"
                          type="password"
                          onChange={handleInputChange}
                        />
                        <Input
                          name="confirmPassword"
                          label="Confirm password"
                          type="password"
                          onChange={handleInputChange}
                        />
                        <button type="submit">Continue</button>
                        {form.isValid ? (
                          ""
                        ) : (
                          <DisplayError msg={form.errorMsg} />
                        )}
                      </form>
                    </div>
                  </div>
                ) : (
                  <>
                    <iframe
                      onLoad={googleFormLoaded}
                      title="Loading..."
                      id="get-involved-form"
                      scrolling="auto"
                      width="100%"
                      frameBorder="0"
                      marginHeight="0"
                      marginWidth="0"
                      src="https://docs.google.com/forms/d/e/1FAIpQLSfm2yoifTtBUAmI63Ww_jCRRzT4d5r3hyfwp8LIwDsoqg0OsQ/viewform?embedded=true"
                    />
                  </>
                )}
              </div>
            </div>
          </Tab>
          <Tab eventKey={2} title="Executive Membership">
            <div className="container">
              <h2>Executive Membership</h2>
              {
                // Pass in "true" if we want to show executive positions, otherwise "false"
                showExecPositions(true)
              }
            </div>
          </Tab>
        </Tabs>
      </Container>
    </main>
  );
}
