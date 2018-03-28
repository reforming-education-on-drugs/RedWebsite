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
        <Tab eventKey={1} title="General Membership">
          <div id="general-membership" className="tab-pane fade active in">
            <div className="container">
              <h2>General Membership</h2>
              <p>At RED, our members are the core of our club are vital to all the endeavors we undertake. As a member of RED, you can expect to gain immediate expertise the areas of public speaking, team-based collaboration and leadership, all while contributing an interesting and professional position to your resumé or portfolio. Members have the opportunity to join any of the 4 teams that resonates with them. participating in the roles is completely optional.</p>
              <ul>
                <li>
                  <p className="text-left"><b>Team External Communications (EC)</b> mainly contact and establish communications with Junior High Schools and prospective partners for RED presentations and Demonstrations with the help of VP External. Members of this team are ambassadors of Red, the SU and the U of C, thus they can expect to gain a lot of skills in the areas of public speaking, organizational ability, time/impression management and networking with the community.</p>
                </li>
                <li>
                  <p className="text-left"><b>Team Education</b> is the bread and butter of RED. This team focus on planning, managing and executing RED presentations with the help of VP Education. Individuals on this team should be creative and prepared to generate ideas and modifying presentation content with the goal of enhancing the presentations and activities while keeping them relevant. Individuals in this team will gain experience in science communication, problem solving, public speaking and collaboration.</p>
                </li>
                <li>
                  <p className="text-left"><b>Team Information Technology (IT)</b> is responsible for everything technology related. From website development and maintenance to marketing materials and photography are part of the team&#39;s focus. Individuals on this team act to maintain our brand and our club as a professional organization under the SU and the U of C with the help of VP Technology. These individuals will gain skills in collaboration, branding, and the respective programs and languages used such as Photoshop, HTML/CSS, etc.</p>
                </li>
                <li>
                  <p className="text-left"><b>Team Fund</b> ensures that our members and Junior High students have the best RED experience possible by managing the monetary assets of the club. This team’s main priority is to seek out fundraising opportunities in the form of events held on campus, or completing grant/funding requests for industry/non-profit organizations to raise funds to cover costs of educational and branding materials with the help of VP Finance. Individuals on this team can expect to gain knowledge in negotiation, impression management, event organization and time management.</p>
                </li>
              </ul>
              <p>Regardless of what team a member is a part of, all members are expected to be active and involved by being vigilant for club-related updates on our Facebook group, or being prompt in filling out doodle-polls for various activities such as general meetings, club social, fundraisers, school presentations or other events. In exchange for their commitment, all members treated with respect and encouraged to share their ideas while also being supplied with numerous opportunities to further their professional development and build up transferable skills.</p>
              <p>Registration as a member of RED is currently open to all University of Calgary Students</p>
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

