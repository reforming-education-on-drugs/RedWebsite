import React from "react"; 
import PropTypes from "prop-types";
function Executive (exec){
  Executive.propTypes = {
    name: PropTypes.string.isRequired,
    position: PropTypes.string,
    imagePath: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
  };

  return(
    <div className="col-md-6 item" >
      <img src={exec.imagePath} className="img-circle wow fadeInDown"/>
      <h3 className="text-center"><b>{exec.name}</b></h3>
      <h3 className="text-center">{exec.position}</h3>
      <p>{exec.bio}</p>
    </div>    

  );

}

function Advisor (adv){
  Advisor.propTypes = {
    name:PropTypes.string.isRequired,
    position:PropTypes.string.isRequired,
  }

  return(
    <div className="col-md-4 item" >
      <h3 className="text-center"><b>{adv.name}</b></h3>
      <p className="text-center">{adv.position}</p>
    </div>

  );
}


function TeamPage() {
  document.title = "RED | Team";
   return (
    <main>
      <div className="container">
        <h1 className="text-center">Our Team</h1>
      </div>

      <div className="container">
        <div className="executive">
          <div className="row">
            <Executive name="MEGAN LEUNG" position="CO-PRESIDENT" imagePath="/assets/img/Megan.jpg" bio="My name is Megan and I recently completed my BSc major in Biological Sciences. This year I will be completing my BEd, specializing in Elementary Sciences at the University of Calgary, Werklund School of Education. My passion is teaching sciences using a variety of hands-on, creative methods to enhance understanding of given topics. My role at RED as Co-President, formerly Director of Education, involves creating an environment to engage club and community members. I aim to support the club in working towards making a difference by educating and informing an increasing number of valuable community members. My goal is to ensure that RED makes an ongoing impact in YYC. To learn more about myself or the club please contact me at mtsleung@ucalgary.ca"/>
            <Executive name="HASNAIEN AHMED" position="CO-PRESIDENT" imagePath="/assets/img/Hasnaien.jpg" bio="I am in my 3rd year of my BSc in Plant Biology with a minor in French. My mission as Co-President of RED is to ensure that Calgary’s younger generation is informed and well-educated, so our whole community can move forward together with respect to substance abuse and STEM programming. I am a firm believer that there is always room for improvement, so I try to keep all members of the club performing at their best and always trying to innovate and improve our presentations and activities. My vision for RED is for it to expand to multiple languages and all learning levels. My interests outside of RED include urban agriculture and working with the elderly. If you ever have any questions, and want to learn more about myself or the club, please don’t hesitate to contact us at reducalgary@gmail.com"/>
          </div>
            
          <div className="row">
            <Executive name="KOUROSH BANAEIANZADEH" position="VP INFO TECHNOLOGY" imagePath="/assets/img/Kourosh.jpg" bio="I am a third year Bioinformatics student learning computer programming while pursuing my passions in biology. One of the aspects of biology that fascinates me is the brain. It has the capacity to learn, understand and apply. Although today we are still unable to know how the whole brain functions, we have discovered many intresting properties of the brain. At the moment recreational drugs is one of the simplest concepts to learn yet very interesting. It is fascinating to know how the body reacts to these reagents and how we become addicted. In this club I will be ensuring the smooth operation of IT. I hope with this information we can educate teens, so they can make informed decisions."/>
            <Executive name="URIEL PEREZ" position="VP EXTERNAL" imagePath="/assets/img/Uriel.JPG" bio="Hola, my name is Jose Uriel Perez Alvarez Gutierrez Anota, but you can call me Uriel. I’m a third year Biomedical Sciences student at the University of Calgary who is not only in love with science, but also dedicated to promoting healthy lifestyles. As VP External, I have the task of directly expanding the outreach of RED, using my business and personable skills. In addition to stimulating new ideas for the club, I facilitate the communication between schools, coordinating presentation dates, and target club objectives. Despite having to do the “grown up” duties in the club, my role as VP External exposes me to first hand teaching experiences with individuals passionate about biology and eager to lend their knowledge about the intricate workings of the human body. I’m eager to continue this experience and expand RED’s outreach."/>
          </div>            

          <div className="row">
            <Executive name="SOPHIE OU YANG" position=">VP FINANCE" imagePath="/assets/img/Sophie.JPG" bio="Hello, my name is Sophie and I am currently completing a combined degree in Business (OBHR) and Psychology. I am the VP of Finance and my main goal is to ensure that our club is well funded and managed to ultimately deliver the most engaging experiences possible for both our audience and our volunteers. RED takes an innovative, scientific approach to re-educating youths about the impact of substance use, which I find to be unlike other traditional drug information programs typically presented in schools. As the management of finances and sponsorships goes a long way towards the long term success of RED, I aim to continuously improve our opportunities in this area. In my free time, I enjoy seeing friends and family, as well as discovering new restaurants to try out and shows to watch!"/>
            <Executive name="KAITLYN VAN BAKEL" position="VP EDUCATION" imagePath="/assets/img/Kaitlyn.jpg" bio="My name is Kaitlyn and I am currently a second year student in the concurrent Natural Sciences and Secondary Education program here at the University of Calgary. This will be my second year with RED and I am very excited about my recent transition from Education Coordinator to Director of Education. As VP Education, I ensure our presentations are not only presented in an engaging manner but also packed with the most important and relevant information for adolescences in Calgary. RED’s exciting and non-traditional, science-based approach aids and will continue to aid younger generations in making informed decisions about substance use. In my free time you can find me playing basketball, hiking in the mountains, or volunteering with local organizations."/>
          </div>
          <div className="row">
            <Executive name="JANNA NEWTON" position="VP INTERNAL" imagePath="/assets/img/Janna.JPG" bio="At the University of Calgary, I am entering my second year in Kinesiology. I was drawn to RED because of the different approach to drug education. There has been a lot of discussion in the media and in the community regarding drug use, and I am interested in ensuring individuals by creating an understanding of how these agents affect the body. One of the responsibilities of VP internal is to take care of the administrative responsibilities related to organizing and to continue promoting the club to ensure continual success. In my spare time, I enjoy being active in the outdoors and trying restaurants throughout the city with friends and family."/>
            <Executive name="JACKIE LUC" position="TECHNOLOGY COORDINATOR" imagePath="/assets/img/Jackie.JPG" bio="I am in my fourth year of Computer Science, concentrating my studies in Software Engineering at the University of Calgary. In this area of study, objective understanding of the potential consequences of my actions are vital in making well-informed decisions. However, it is not a requirement to be a critical thinker to make well-informed decisions. Speaking from experience, understanding the foundational basics can largely assist in mitigating several consequences and misunderstandings. I hope this will enable youths to take that first, possibly intimidating, step in trying to understand complex topics - such as the effects of drugs. Through my involvement in RED, I also hope to reflect the team’s passionate efforts in this endeavor, in person and on the website. I also enjoy a good pun and when I have free time, I love to spend it with good company!"/>
          </div>

          <div className="row">            
            <Executive name="MONICA UPPAL" position="MARKETING COORDINATOR" imagePath="/assets/img/Monica.JPG" bio="I am currently in my second year at the University of Calgary, working towards a Bachelor of Commerce degree and planning to minor in Psychology. I have always been passionate about student engagement, social justice and have been continuously intrigued by the thought of spreading and gaining knowledge! With RED, I plan on growing in the field of neuroscience and hope to educate the early teenage demographic on substance misuse and its severe consequences by building a strong biological framework around drugs. As the Marketing Coordinator, I am beyond excited to make RED’s vision widespread across campus and the rest of the community through various social media platforms. In my spare time, you can find me playing sports, watching MasterChef marathons, and traveling!"/>
            <Executive name="SUMAN RANDHAWAL" position="EDUCATION COORDINATOR" imagePath="/assets/img/Suman.jpg" bio="Hi, my name is Suman and I am a first-year Kinesiology major. My interest with substance abuse issues began at a young age when I witnessed my peers experimenting with drugs. Over the years, their habits progressed and drugs became a part of their lifestyle. Witnessing first-hand the impact that substance abuse has on youth has driven me to take a stand and educate a younger audience. My goal and purpose on this team is to make sure that the next generation of students get the opportunity to learn about substance abuse in a way that was not made available to me or my peers. Through engaging presentations and interactive learning, I hope to inform the younger generation about the science, and knowledge of drugs and substances. I would also like to introduce the world of science to youth at a younger age as it is one of the fastest-growing and innovative industries. In my spare time, I love to listen to rap music, explore the food options on the Food Network, and craft small artisanal birdhouses."/>
          </div>             
        
          <div className="row">
            <Executive name="SLOBODAN ZELIC" position="SPONSORSHIP COORDINATOR" imagePath="/assets/img/Slobodan.JPG" bio="Hello, my name is Slobodan Zelic and I am currently completing my BCOMM degree in Finance. I joined RED because I appreciated their unique approach of educating students on the adverse effects of drug usage. We do so through the means of interactive scientific demonstrations and presentations. RED establishes a foundational understanding of the biological mechanisms involved in drug addiction and the social implications associated.  It is my goal to secure additional funding in order to support and ensure the successful growth of RED.  In my free time, I enjoy going to the gym, playing sports, traveling, and volunteering for the Breaking Free Foundation."/>          
 
          </div>     
        </div>
      </div>       


      <h1 className="text-center">Advisors</h1>

      <div className="container">
        <div className="executive">
          <div className="row">   
            <Executive name="YASSINE BENSAADA" imagePath="/assets/img/Yassine.jpg" bio="When initially creating RED, our mission was simple: Provide an innovative and unique approach to drug education focused on the fundamentals of physiology and neuroscience as they relate to psychoactive drugs and substances of abuse. From the get-go, the focus was to deliver high-quality, interactive, and engaging presentations that not only resonate with students, but leave them excited and motivated for science-learning moving forward. As RED continues to grow, my goal is to ensure that these values with which RED was founded are maintained, promoted, and sought."/>
            <Executive name="ABDULLAH AZEEM"  imagePath="/assets/img/Abdullah.JPG" bio="As I finish up my last year of Neurosciences at the University of Calgary, one of my main goals is to support RED in becoming the gold standard of drug education in Canada. Leveraging my background in neuroscience and addiction research, my role is to provide strategic guidance and assist the Management team as required.  RED has shown tremendous growth thus far; an advisory role gives me a front-row seat to all that will be accomplished in the future."/>
          </div>
        </div>
      </div>
    
       
      <h1 className="text-center">Alumni</h1>
        
      <div className="container">
        <div className="Advisor">
          <div className="row">   
            <Advisor name="SID GOUTAM" position="VP EXTERNAL"/>
            <Advisor name="CORI MAH" position="VP INTERNAL"/>
            <Advisor name="NILESH SHARMA" position="VP FINANCE"/>
          </div>
          <div className="row">   
            <Advisor name="ASFAR KHAN" position="VP EXTERNAL"/>
          </div>
        </div>
      </div>            
    </main>
  );
}



export default TeamPage;
