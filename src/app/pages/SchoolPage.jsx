import React from "react";

function SchoolPage() {
  document.title = "RED | For Schools";

  return (
    <main>
      <div className="container">
      	<h1 className="text-center">Schools</h1>
      </div>


      <div className="coloredcontainer">
        <div className="container">
          <h2 className="text-center">Objective</h2>
          <p>We’re a club at the University of Calgary called Reforming Education of Drugs (RED for short) and our primary goal is to provide in-class educational sessions for the youth regarding drug abuse prevention. Through the means of interactive scientific demonstrations and presentations, we will establish a foundational understanding of the biological/neurological mechanisms involved in drug addiction and the social implications involved.</p>
        </div>
      </div>
    
    
      <div className="container">
        <h2 className="text-center">Specifications</h2>
        <ul>
            <li>Length: 1.5-2 Hours</li>
            <li>Teaching capacity: 30 Students</li>
            <li>Grades: 7-12</li>
            <li>Volunteer Count: 5</li>
        </ul>
      </div>
      <div className="coloredcontainer">
        <div className="container"> 
            <h2 className="text-center">Layout</h2>
            <img width= "100%" src="../assets/img/layout.png"/>
        </div>
      </div>

      <div className="container">
        <h2 className="text-center">Activity Description</h2>
        <div className="row">
          <div className="col-md-4 col-sm-4 item" >
            <h3 className="text-center">Patient Overdose Investigating</h3>
            <p className="text-center">In this activity, students must use neurological and physiological symptoms in order to successfully diagnose patients with the correct drug overdose. This activity is conducted in teams of 4-5, and the teams compete with one another to successfully diagnose their patients!</p>
          </div>
          <div className="col-md-4 col-sm-4 item" >
            <h3 className="text-center">Reaction Time Test</h3>
            <p className="text-center"> In this activity, how drugs act in the brain to effect reaction time are explained using the reaction time test. In this test, students participate in an activity where their ability react in a time efficient manner are measured and compared when under a simulation of a certain drug.</p>
          </div>
          <div className="col-md-4 col-sm-4 item" >
            <h3 className="text-center">Trivia</h3>
            <p className="text-center">In this Head to Head style game, students will participate in a trivia aimed to gage their interest and their knowledge of different substances of abuse. Throughout the game, the misconceptions and related phenomena of each question are explained by our volunteers.</p>
          </div>
        </div>
      </div>

      
      <div className="coloredcontainer">
        <div className="container">
          <h2 className="text-center">Contact Us</h2>
          <p className="text-center">If you would like us to come and present at your school <a href="booking/" className="redbackground">Book Here</a></p>
        </div>
      </div>
    </main>
  );
}

export default SchoolPage;
