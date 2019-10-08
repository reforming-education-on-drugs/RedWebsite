import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

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
        <ul>
          <li>1 JR Finance</li>
          {/* <li>3 JR Education</li> */}
          {/* <li>1 JR Internal</li> */}
          <li>1 JR External</li>
          <li>2 JR Information &amp; Technology</li>
        </ul>
        <div className="membership-email">
          <p>
            If you have any questions about our roles, please contact us
            at&nbsp;
          </p>
          <a href="mailto:reducalgary@gmail.com?Subject=Executive Membership">
            reducalgary@gmail.com
          </a>
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
        We encourage you to sign up as an <a href="/get-involved">Educator</a>{' '}
        and <span style={{ color: 'red' }}>like</span> our page on{' '}
        <a
          href="https://www.facebook.com/REDxClub"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>{' '}
        to receive updates and volunteering opportunities!
      </p>
    </React.Fragment>
  );
}

export default function GetInvolvedPage() {
  document.title = 'RED | Get Involved';

  return (
    <main>
      <div className="container">
        <h1>Get Involved</h1>
      </div>

      <Tabs justified id="Memberships">
        <Tab eventKey={1} title="Club Membership">
          <div id="club-membership" className="tab-pane fade active in">
            <div className="container">
              <h2>Club Membership</h2>
              <p className="smaller-width-paragraph">
                At RED, our educators are at the core of our club and are vital
                for our successful endeavours. As an educator of RED, you will
                have volunteer opportunities to run interactive presentation
                activities at our volunteering events. Before every event, we
                try to ensure that we provide enough learning resources and
                practice sessions to ensure that every educator feels more
                comfortable presenting the material.
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
                Registration as an educator is open to all University of Calgary
                Students.
              </p>
              <div className="membership-email">
                <p>
                  For any questions or inquiries, please contact us at&nbsp;
                </p>
                <a href="mailto:reducalgary@gmail.com?Subject=Membership questions">
                  reducalgary@gmail.com
                </a>
              </div>
              <iframe
                title="Loading..."
                id="get-involved-form"
                scrolling="auto"
                width="100%"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                src="https://docs.google.com/forms/d/e/1FAIpQLSfm2yoifTtBUAmI63Ww_jCRRzT4d5r3hyfwp8LIwDsoqg0OsQ/viewform?embedded=true"
              />
            </div>
          </div>
        </Tab>
        <Tab eventKey={2} title="Executive Membership">
          <div className="container">
            <h2>Executive Membership</h2>
            {// Pass in "true" if we want to show executive positions, otherwise "false"
            showExecPositions(true)}
          </div>
        </Tab>
      </Tabs>
    </main>
  );
}
