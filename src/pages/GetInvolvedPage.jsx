import React from "react";
import { Tabs, Tab } from "react-bootstrap";

function showExecPositions(hiring) {
  if (hiring) {
    return (
      <div>
        <h3>Jr. VP - Marketing and Public Relations (1 position)</h3>
        <p>Regular work with members to provide event updates and posting on various social media websites, and our official websites and support VP IT in leading the development of promotional materials. Contact <a href="mailto:kourosh.banaeianzade@ucalgary.ca">kourosh.banaeianzade@ucalgary.ca</a> with your cv/resume if interested. Please also send a summary detailing why you want to join the club and why you are a great fit for the position in your email.</p>

        <h3>Jr. VP-Education Coordinator (2 Positions)</h3>
        <p>Regularly work with members and Director of Education to train and prepare presenting members of RED presentations through leading presentation practice sessions, and organization/management of presenting schedule (who will present with whom, on which date, at which time, etc.) Contact <a href="mailto:mtsleung@ucalgary.ca">mtsleung@ucalgary.ca</a> with your cv/resume if interested. Please also send a summary detailing why you want to join the club and why you are a great fit for the position in your email.</p>

        <h3>Jr. VP-Sponsorships (1 position) </h3>
        <p>Work with Vp Finance and members on the Team Fund to assist and lead in the acquisition of funds and organization of fundraising events. Such responsibilities include coordinating schedules, meeting prospective industry partners and organizations, as well as seeking novel opportunities to secure funds. Contact <a href="nilesh.sharma@ucalgary.ca">nilesh.sharma@ucalgary.ca</a> with your cv/resume if interested. Please also send a summary detailing why you want to join the club and why you are a great fit for the position in your email.</p>

        <h3 id="warning">Applications are due on Feb 3rd, 2017.</h3>
        <p >Please also sign up as a  <a href="/get-involved">General Member</a> to get updates.</p>
      </div>
    );
  }

  // No executive positions available
  return (
    <p>Unfortunately, there are no executive positions available. We encourage you to sign up as a <a href="/get-involved">General Member</a> in order to receive regular updates.</p>
  );
}

export default function GetInvolvedPage() {
  document.title = "RED | Get Involved";

  return (
    <main>
      <div className="container">
        <h1>Get Involved</h1>
      </div>

      <Tabs justified id="Memberships">
        <Tab eventKey={1} title="Club Membership">
          <div id="general-membership" className="tab-pane fade active in">
            <div className="container">
              <h2>Club Membership</h2>
              <p>At RED, our educators are at the core of our club and are vital for our successful endeavours. As an educator of RED, you will have volunteer opportunities to run interactive presentation activities at our volunteering events. Before every event, we try to ensure that we provide enough learning resources and practice to ensure that every educator feels more comfortable presenting the material.</p>
              <p>Throughout your experience, you can also expect to gain immediate expertise the areas of public speaking, team-based collaboration and leadership, all while contributing an interesting and professional position to your resumé or portfolio. There are also opportunities available to join our executive team and continue impacting the community!</p>
              <p>Registration as an educator is open to all University of Calgary Students.</p>
              <div className="membership-email">
                <p>For any questions or inquiries, please contact us at&nbsp;</p>
                <a href="mailto:reducalgary@gmail.com?Subject=Membership questions">reducalgary@gmail.com</a>
              </div>
              <iframe title="Loading..." id="get-involved-form" scrolling="auto" width="100%" frameBorder="0" marginHeight="0" marginWidth="0" src="https://docs.google.com/forms/d/e/1FAIpQLSfm2yoifTtBUAmI63Ww_jCRRzT4d5r3hyfwp8LIwDsoqg0OsQ/viewform?embedded=true" />
            </div>
          </div>
        </Tab>
        <Tab eventKey={2} title="Executive Membership">
          <div className="container">
            <h2>Executive Membership</h2>
            {
              // Pass in "true" if we want to show executive positions, otherwise "false"
              showExecPositions(false)
            }
          </div>
        </Tab>
      </Tabs>
    </main>
  );
}

