import React from "react";
import { Row, Col } from "react-bootstrap";
import BlogData from "../data/blog-content.json";

export default function BlogPage() {
  document.title = "RED | Blog";

  return (
    <main>
      <section id="blog">
        <div className="redcontainer container blog-header">
          <h2>RED Events 2017</h2>
          <p>There is always more to learn! Join us at our events and get the information you need.</p>
          {
            BlogData.blogs.forEach((value, index) => {
              console.log(value.title);
            })
          }
        </div>

        <div className="blog container" id="blogcontainer">
          <div className="blog-item">
            <h2 className="text-center">Fall 2017 Meet &amp; Greet</h2>
            <div className="date-location">
              <span>
                <img className="blog-icons" id="date" src="../assets/img/blog-imgs/blog-icons/calendar-black.png" alt="calendar-icon" /> September 27th, 2017
              </span>
              <span>
                <img className="blog-icons" id="location" src="../assets/img/blog-imgs/blog-icons/location-black.png" alt="location-icon"
                /> University of Calgary
              </span>
            </div>
            <div className="blog-content">
              <img src="/assets/img/blog-imgs/blog14.png" width="80%" alt="" />
              <p>RED&apos;s Meet &amp; Greet was a success! Thank you to everyone who came out! Keep a lookout on your email and
                RED&apos;s social media pages to stay current with all of RED&apos;s plans for this school year‼️
                <span role="img"
                  aria-label="100">💯</span>#rededucate</p>
            </div>
          </div>

          <div className="blog-item">
            <h2 className="text-center">Devon Funding</h2>
            <div className="date-location">
              <span>
                <img className="blog-icons" id="date" src="../assets/img/blog-imgs/blog-icons/calendar-black.png" /> September 27th, 2017 </span>
              <span>
                <img className="blog-icons" id="location" src="../assets/img/blog-imgs/blog-icons/location-black.png" />Devon</span>
            </div>
            <div className="blog-content">
              <img src="/assets/img/blog-imgs/blog13.png" width="80%" alt="" />
              <p>
                RED WOULD LIKE TO GIVE A HUGE THANK YOU SHOUTOUT TO DEVON FOR ITS CONTRIBUTIONS OF $1500.00!
                <br /> Your generous financial support is greatly appreciated. With your contribution, RED will be able to allot more
                resources for a greater number of presentations in the school year (RED has 50 tentative presentations booked
                already), purchase more materials for the in-class presentations, and create a sense of team pride within RED
                through the distribution of customized RED crewnecks. The generous support of individuals and groups like you
                make it possible for our club to implement our vision regarding substance awareness and is an encouraging reminder
                of why we undoubtedly enjoy giving back to our community.
              </p>
            </div>
          </div>

          <div className="blog-item">
            <h2 className="text-center">Blaze Fundraiser</h2>
            <div className="date-location">
              <span>
                <img className="blog-icons" id="date" src="../assets/img/blog-imgs/blog-icons/calendar-black.png" /> June 1st, 2017 </span>
              <span>
                <img className="blog-icons" id="location" src="../assets/img/blog-imgs/blog-icons/location-black.png" />
                <a href="https://goo.gl/maps/U8SbqdMYdML2">Blaze Pizza</a>
              </span>
            </div>
            <div className="blog-content">
              <img src="/assets/img/blog-imgs/blog12.png" width="80%" alt="" />
              <p>June 1st was definitely one for the books! Thank you to everyone who came out and made RED's fundraiser a success!
                A huge shoutout to our raffle sponsors and a big thank you to @blazepizza for hosting us! The final numbers will
                be rolling in shortly! Until then, be sure to check out the photos from the evening!</p>
            </div>
          </div>

          <div className="blog-item">
            <h2 className="text-center">Year in Review</h2>
            <div className="date-location">
              <span>
                <img className="blog-icons" id="date" src="../assets/img/blog-imgs/blog-icons/calendar-black.png" /> May 31st, 2017 </span>
            </div>
            <div className="blog-content">
              <img src="/assets/img/blog-imgs/blog11.jpg" width="80%" alt="" />
              <p>
                RED has had an amazing run in the academic year of 2016-2017. Click
                <a href="/assets/files/RED_YIR.pdf" target="_blank">here</a> to learn more.
              </p>
            </div>
          </div>



          <div className="blog-item">
            <h2 className="text-center">McKenzie Highlands School!</h2>
            <div className="date-location">
              <span>
                <img className="blog-icons" id="date" src="../assets/img/blog-imgs/blog-icons/calendar-black.png" /> May 17th, 2017 </span>
              <span>
                <img className="blog-icons" id="location" src="../assets/img/blog-imgs/blog-icons/location-black.png" />McKenzie Highlands</span>
            </div>
            <div className="blog-content">
              <img src="/assets/img/blog-imgs/blog10.png" width="80%" alt="" />
              <p>
                RED has hit another home-run with two presentation days back-to-back at the McKenzie Highlands School! With exposure to a
                variety of neuroscience related topics, RED has definitely knocked these presentations out of the ballpark! We
                would once again like to thank our hard working volunteers who have taken time out from their well-deserved summer
                break and have contributed towards such a great educational experience! Hope you all have a relaxing summer and
                be sure to look forward to more presentations and events RED has planned in the near future!
              </p>
            </div>
          </div>




          <div className="blog-item">
            <h2 className="text-center">That is a wrap!</h2>
            <div className="date-location">
              <span>
                <img className="blog-icons" id="date" src="../assets/img/blog-imgs/blog-icons/calendar-black.png" /> April 18th, 2017 </span>
            </div>
            <div className="blog-content">
              <img src="/assets/img/blog-imgs/blog9.png" width="80%" alt="" />
              <p>
                That is a wrap!! First and foremost, RED would like to thank all of our presenters for their hard work and Georges P Vanier
                School for letting us be a part of such a great, educational experience! Thanks to G.P. Vanier's generosity,
                four of our volunteers each received a mug. We love the gifts and are definitely looking forward to collaborating
                in the future.
              </p>
            </div>
          </div>


          <div className="blog-item">
            <h2 className="text-center">SU Clubs Awards</h2>
            <div className="date-location">
              <span>
                <img className="blog-icons" id="date" src="../assets/img/blog-imgs/blog-icons/calendar-black.png" /> April 5th, 2017 </span>
              <span>
                <img className="blog-icons" id="location" src="../assets/img/blog-imgs/blog-icons/location-black.png" /> University of Calgary </span>
            </div>
            <div className="blog-content">
              <img src="/assets/img/blog-imgs/blog8.jpg" width="80%" alt="" />
              <p>On Wednesday April 5th, RED had the pleasure of attending UofC's annual SU Club Awards Banquet and proudly brought
                home an Honourable Mention for Community Service award! We hope we can carry the momentum from last year onwards
                to the next year.</p>
            </div>
          </div>





          <div className="blog-item">
            <h2 className="text-center">LINKages x RED Collaboration</h2>
            <div className="date-location">
              <span>
                <img className="blog-icons" id="date" src="../assets/img/blog-imgs/blog-icons/calendar-black.png" /> March 19, 2017 </span>
              <span>
                <img className="blog-icons" id="location" src="../assets/img/blog-imgs/blog-icons/location-black.png" /> Murdoch Manor</span>
            </div>
            <div className="blog-content">
              <img src="/assets/img/blog-imgs/blog7.png" width="80%" alt="" />
              <p>
                RED can add another presentation to it is done list! RED recently collaborated with LINKages this past weekend and had the
                opportunity to lead interactive activities aimed at informing seniors about several common drugs and their effects
                on one’s brain and behavior. Topics such as substance misuse and addiction were explored through interactions
                among participants and throughout the event. To start off the event, LINKages participants were first asked series
                of trivia questions regarding biological pathways and the role of neurons. In the latter half, participants learned
                about familiar drugs and found themselves engaged in an insightful discussion surrounding the legalization of
                marijuana to conclude the day! All in all, RED received a lot of positive feedback from the participants and
                hopes to collaborate with LINKages in the near future! A huge shout out to our hardworking RED club volunteers-
                we cannot thank you enough!
              </p>
            </div>
          </div>


          <div className="blog-item">
            <h2 className="text-center">More Presentations!</h2>
            <div className="date-location">
              <span>
                <img className="blog-icons" id="date" src="../assets/img/blog-imgs/blog-icons/calendar-black.png" /> February 23, 2017 </span>
              <span>
                <img className="blog-icons" id="location" src="../assets/img/blog-imgs/blog-icons/location-black.png" /> Georges P. Vanier </span>
            </div>
            <div className="blog-content">
              <img src="/assets/img/blog-imgs/blog6.png" width="80%" alt="" />
              <p>
                On February 23rd, RED had the privilege to deliver nine presentations to junior high school students in grades 7-9, attending
                Georges P. Vanier. It would not have been possible without our lovely RED club volunteers and we would like to
                thank each one of you for your continuous dedication and commitment! In terms of the in-class presentations,
                we were glad to hear about the heightened interest and engagement involving the activities planned and information
                conveyed by RED. Students were exposed to a variety of material from covering the role of the neurons in the
                brain to how different substances, such as alcohol, affect an individual’s behavior. Students also got the opportunity
                to take part in reaction time tests, engage in a debate surrounding a popular topic, and enjoyed diagnosing “patients”
                in our “Patient Overdose Investigation” activity. Overall, the presentations were an incredible experience and
                we look forward to the presentations planned in the near future!!
              </p>
            </div>
          </div>




          <div className="blog-item">
            <h2 className="text-center"> First Presentation! </h2>
            <div className="date-location">
              <span>
                <img className="blog-icons" id="date" src="../assets/img/blog-imgs/blog-icons/calendar-black.png" /> November 28, 2016 </span>
              <span>
                <img className="blog-icons" id="location" src="../assets/img/blog-imgs/blog-icons/location-black.png" /> RT&nbsp;Alderman&nbsp;Middle&nbsp;School </span>
            </div>
            <div className="blog-content">
              <img src="/assets/img/blog-imgs/blog5.png" width="80%" alt="" />
              <p>Our first set of presentations was a success. Several members of the club were able to prepare and present a total
                of five presentations to grade 8 and 9 classes at RT Alderman Middle school. The feedback we received was all
                positive and we are looking forward to going back next year with updated presentations. RED is constantly working
                on research and development to keep our presentations up to date and relevant.</p>
            </div>
          </div>


          <div className="blog-item">
            <h2 className="text-center">Adult Only Night</h2>
            <div className="date-location">
              <span>
                <img className="blog-icons" id="date" src="../assets/img/blog-imgs/blog-icons/calendar-black.png" /> November 10, 2016 </span>
              <span>
                <img className="blog-icons" id="location" src="../assets/img/blog-imgs/blog-icons/location-black.png" />
                <a href="https://www.google.ca/maps/dir/''/telus+spark+convention+centre/@51.0536762,-114.0948131,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x5371654abb14de43:0xbb1e17cda168cdba!2m2!1d-114.0247735!2d51.0536971"
                  target="_blank">Telus Spark</a>
              </span>
            </div>
            <div className="blog-content">
              <img src="/assets/img/blog-imgs/blog4.png" width="80%" alt="" />
              <p>
                Thanks to the Neuroscience Student Association (NSA) for wanting to collaborate with us for the
                <i>"Adult Only Night"</i> at Telus Spark on November 10th! Although RED is mainly focused on educating the youth,
                we were able to expand our horizon and try to implement our activities with a bit of an older audience. With
                the support of the NSA, we hosted a fantastic event which participants seemed to really enjoy. Many learned new
                things, some tried to diagnose patients while others were too busy being competitive in our reaction-time test.
                All in all, it was a lot of fun informing the general public about the science of drugs! Stay tuned for more
                updates!
              </p>
            </div>
          </div>



          <div className="blog-item">
            <h2 className="text-center">Bake Sale</h2>
            <div className="date-location">
              <span>
                <img className="blog-icons" id="date" src="../assets/img/blog-imgs/blog-icons/calendar-black.png" /> October 26, 2016 </span>
              <span>
                <img className="blog-icons" id="location" src="../assets/img/blog-imgs/blog-icons/location-black.png" /> Earth Science</span>
            </div>
            <div className="blog-content">
              <img src="/assets/img/blog-imgs/blog3.png" width="80%" alt="" />
              <p>
                We had an amazing bake sale in which we raised roughly $200 that would be used to purchase materials for our presentations
                at our schools. Some of the money was also used to subsidize the cost of our new crewnecks for our members that
                are presenting. We want to personally thank anyone that contributed to the bake sale - especially Megan, with
                her awesome macarons!
              </p>
            </div>
          </div>


          <div className="blog-item">
            <h2 className="text-center">Fall 2016 Meet and Greet</h2>
            <div className="date-location">
              <span>
                <img className="blog-icons" id="date" src="../assets/img/blog-imgs/blog-icons/calendar-black.png" /> September 28, 2016 </span>
              <span>
                <img className="blog-icons" id="location" src="../assets/img/blog-imgs/blog-icons/location-black.png" /> Science A</span>
            </div>
            <div className="blog-content">
              <img src="/assets/img/blog-imgs/blog2.png" width="80%" alt="" />
              <p>
                On behalf of the executive team at RED, we want to thank everyone who attended the Meet and Greet on the 28th. We had a blast
                networking and meeting our new members, while enjoying some pizza! This year we have the opportunity to present
                at RT Alderman Junior high. We hope that with our hard work over the summer, we can deliver an amazing presentation
                in the coming weeks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
