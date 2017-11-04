import React from "react"; 

function ParentPage() {
  document.title = "RED | For Parent";
  var mcEmbedSignup = {
    clear:"left",
    font:"14px Helvetica,Arial,sans-serif", 
    width:"100%"
  };
  return (
    <main>
      <div className="container">
      	<h1 className="text-center">Parents</h1>
      </div>


      <div className="coloredcontainer">
        <div className="container">
      	  <h2 className="text-center">What They Learn</h2>
				  <p>Drugs are now a commonly seen throughout society, whether it’s in the media or within the hallways of a school. Students are constantly exposed to drugs and awareness is becoming increasingly important. RED aims to aid students in understanding the effects of common drugs on the body, and more specifically the brain. Research and development completed by a team of undergraduate students strive to keep information delivered in presentations relevant, up to date, and accurate. Students participate in hands on activities to further their learning through recreation of drug effects and a deductive investigation activity. Parents are encouraged to discuss drugs with their children and remain open to questions that may arise. RED stresses the importance of research and science based findings when understanding the reality of drug effects. With the large presence of drugs in society today, we must focus on awareness.</p>
        </div>
   		</div>
     
    	<div className="container">
        <h2 className="text-center">Presentation & Activities</h2>
        <p>The RED presentation begins with a brief introduction where metaphors are used to explain how brain cells function as well as the different parts of the brain. Building off this understanding, three different drugs are presented to the class. Drugs range from commonly accessible drugs such as alcohol, to prescription drugs such as Adderall, to illegal drugs such as marijuana and cocaine. Students volunteer to participate in demonstrations that model the effects of the various drugs. For example, the effect of alcohol on reaction time is demonstrated by simulating a reaction time test. Following the presentation, students work in groups and investigate three patients in the ER of a hospital. The goal of the tasks is to have students correctly identify the substance(s) impairing each student based on symptoms and vital stats. The presentation is concluded with a Q & A session to address questions and concerns that may arise throughout the presentation.</p>
        <div className=" col-md-4">
            <img className="parents" title="Focused Kids" src="../assets/img/main1.jpg"/>
        </div>
        <div className=" col-md-4">
            <img className="parents" title="Focused Kids" src="../assets/img/main4.jpg"/>
        </div>
        <div className=" col-md-4">
            <img className="parents" title="Focused Kids" src="../assets/img/main7.jpg"/>
        </div>
      </div>
    
      {/* <div class="coloredcontainer">
        <div class="container">
          <h2 class="text-center">Contact Us</h2>
          <p class="text-center">If you have any questions please click <a class="redbackground" href="../contact-us/">here</a></p>

          <link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css"/>
          <div style={mcEmbedSignup}>
            <form action="//rededucate.us14.list-manage.com/subscribe/post?u=a34f6f98c67b9ff0980cca0e9&amp;id=d8c093bfa0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
              <div style={mcEmbedSignup}>
                <label for="mce-EMAIL">Subscribe to our Newsletter</label>
                <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required/>
                

                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_a34f6f98c67b9ff0980cca0e9_d8c093bfa0" tabindex="-1" value=""/></div>
                <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"/></div>
              </div>
            </form>
          </div>
        </div>
      </div>*/}
    </main>
  );
}

export default ParentPage;
