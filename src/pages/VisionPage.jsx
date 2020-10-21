import React from "react";
import { Container } from "react-bootstrap";

export default function VisionPage() {
  document.title = "RED | Vision";

  return (
    <main>
      <Container className="redcontainer">
        <h2>Our Vision</h2>
        <br />
        <div>
          {/* <p>The annual costs of substance abuse are enormous - $40 Billion in Canada (Canadian Centre on Substance Abuse). Despite the implementation of substance abuse awareness campaigns, drug offences (per 100, 000 population) have been increasing since the early 1990’s (Statistics Canada, 2009). Unfortunately, substance abuse is still a major obstacle that must be overcome. <b>RED (Reforming Education on Drugs)</b> was established at the University of Calgary with hopes to combat substance abuse by educating the early-teens population. We believe in education with an emphasis on science, while taking social views into understanding as well. Through interactive presentations, we hope to establish, in students, a foundational understanding of the biological and neurological mechanisms involved in substance use. This approach allows us to engage students in a discussion and effectively communicate the consequences of substance abuse. By discussing substance abuse in an objective and scientific manner, we believe students will come to their own conclusions and hold themselves accountable.</p> */}
          <p>
            RED’s mission is to equip students to make informed decisions by
            providing them with accurate information about the biological
            effects of drugs. What sets us apart is our science-based, unbiased
            approach to substance use education. We have found this method to
            foster an environment of trust in which students feel comfortable
            participating in open discussion. Our educational workshops are
            tailored to junior high and high school students that are exposed to
            relevant topics in Alberta such as fentanyl and cannabis.
          </p>
        </div>
      </Container>
    </main>
  );
}
