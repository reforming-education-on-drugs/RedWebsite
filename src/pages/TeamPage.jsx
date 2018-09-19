import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import chunk from "lodash/chunk";


// This will import all the images because ES6 standard doesn't allow
// dynamic importing of images
//
// @param {required context} r 
// @returns {images}
function importAll(r) {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const importedImages = importAll(require.context('../assets/images', false, /\.(png|jpe?g|JPE?G|svg)$/));

function Executive(props) {
  Executive.propTypes = {
    executives: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  const executives = chunk(props.executives, 2);

  return (
    <div className="container">
      <div className="executive">
        {
          executives.map(executiveRow => (
            <Row>
              {
                executiveRow.map(executive => (
                  <Col md={6}>
                    <img src={importedImages[executive.imageName]} className="img-circle wow fadeInDown" alt={executive.name} />
                    <h3><b>{executive.name}</b></h3>
                    <h3>{executive.position}</h3>
                    {/* <p>{executive.bio}</p> */}
                  </Col>
                ))
              }
            </Row>
          ))
        }
      </div>
    </div>
  );
}

function Advisors(props) {
  Advisors.propTypes = {
    advisors: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  // Pair the advisors into two chunks, using lodash
  const advisors = chunk(props.advisors, 2);

  return (
    <div>
      <h1>Advisors</h1>
      <div className="container">
        <div className="executive">
          {
            advisors.map(advisorRow => (
              <Row>
                {
                  advisorRow.map(advisor => (
                    <Col md={6}>
                      <img src={importedImages[advisor.imageName]} className="img-circle wow fadeInDown" alt={advisor.name} />
                      <h3><b>{advisor.name}</b></h3>
                      <p>{advisor.bio}</p>
                    </Col>
                  ))
                }
              </Row>
            ))
          }
        </div>
      </div>
    </div>
  );
}

function Alumni(props) {
  Alumni.propTypes = {
    alumnis: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  return (
    <div>
      <h1>Alumni</h1>
      <div className="container">
        <Row>
          {
            props.alumnis.map(alimuni => (
              <Col md={4}>
                <h3><b>{alimuni.name}</b></h3>
                <p>{alimuni.position}</p>
              </Col>
            ))
          }
        </Row>
      </div>
    </div>
  );
}

export default function TeamPage() {
  document.title = "RED | Team";

  const executives = [
    {
      name: "KAITLYN VAN BAKEL",
      position: "CO-PRESIDENT",
      imageName: "Kaitlyn.jpg",
      bio: "My name is Kaitlyn and I am currently a second year student in the concurrent Natural Sciences and Secondary Education program here at the University of Calgary. This will be my second year with RED and I am very excited about my recent transition from Education Coordinator to Director of Education. As VP Education, I ensure our presentations are not only presented in an engaging manner but also packed with the most important and relevant information for adolescences in Calgary. RED’s exciting and non-traditional, science-based approach aids and will continue to aid younger generations in making informed decisions about substance use. In my free time you can find me playing basketball, hiking in the mountains, or volunteering with local organizations.",
    },
    {
      name: "URIEL PEREZ",
      position: "CO-PRESIDENT",
      imageName: "Uriel.JPG",
      bio: "Hola, my name is Jose Uriel Perez Alvarez Gutierrez Anota, but you can call me Uriel. I’m a third year Biomedical Sciences student at the University of Calgary who is not only in love with science, but also dedicated to promoting healthy lifestyles. As VP External, I have the task of directly expanding the outreach of RED, using my business and personable skills. In addition to stimulating new ideas for the club, I facilitate the communication between schools, coordinating presentation dates, and target club objectives. Despite having to do the “grown up” duties in the club, my role as VP External exposes me to first hand teaching experiences with individuals passionate about biology and eager to lend their knowledge about the intricate workings of the human body. I’m eager to continue this experience and expand RED’s outreach.",
    },
    {
      name: "SARAH ZANUTTO",
      position: "VP EDUCATION",
      imageName: "SarahZ.JPG",
      bio: "Hello, my name is Sarah and I am in my 2nd year of a BSc degree in Neuroscience. Why do I love RED? I am passionate about our mission to foster a curiosity in science and facilitate an informed dialogue on the effects and consequences of drug use on the brain. I believe that a comprehensive perspective on the complexities of drug abuse is particularly relevant considering the opioid crisis devastating North America. As an Education Coordinator, my goal is to deliver meaningful presentations that resonate with our audience to encourage healthy and informed decision-making. I do this by helping to construct holistic and scientifically accurate presentations, as well as providing training for our presenters. Outside RED, my interests include mental health, playing piano and wall climbing!",
    },
    {
      name: "SOPHIE GOBEIL",
      position: "VP EDUCATION",
      imageName: "SophieG.jpg",
      bio: "I am a second year Neuroscience student at the University of Calgary. For as long as I can remember, I have been curious about how and why our bodies function the way they do. I am thrilled to have the opportunity to put my love for science to use while having a positive impact on young students. It is important that youth be able to make informed decisions about substance use, and I believe that RED’s fact-based approach can be a valuable tool in their education. I look forward to delivering accurate and useful educational material to students, and hope to promote their own curiosity about science while doing so. When I am not studying, you can find me in the mountains hiking, backpacking, and coaching cross-country skiing.",
    },
    {
      name: "JARIN THUNDATHIL",
      position: "VP EXTERNAL",
      imageName: "Jarin.JPG",
      bio: "When I joined RED nearly three years ago, I immediately understood the potential we had to improve the discourse around drug use for youth in our city.  As a biomedical sciences student, RED presented the perfect opportunity to unite my academic interests with my passion for advocacy. During my time with RED, I had my first real exposure to teaching in a classroom environment. It was inspiring to see students genuinely engaging with the real-world implications of contentious issues like addiction and the opioid crisis. Last year, we were able to reach over 1000 students at 13 different schools. This year, as VP External, my goals are to see RED expand its presence in Calgary to even more schools, and to lay the groundwork for our expansion to other parts of Alberta.",
    },
    {
      name: "SUMAN RANDHAWAL",
      position: "VP INTERNAL",
      imageName: "Suman.jpg",
      bio: "Hi, my name is Suman and I am a first-year Kinesiology major. My interest with substance abuse issues began at a young age when I witnessed my peers experimenting with drugs. Over the years, their habits progressed and drugs became a part of their lifestyle. Witnessing first-hand the impact that substance abuse has on youth has driven me to take a stand and educate a younger audience. My goal and purpose on this team is to make sure that the next generation of students get the opportunity to learn about substance abuse in a way that was not made available to me or my peers. Through engaging presentations and interactive learning, I hope to inform the younger generation about the science, and knowledge of drugs and substances. I would also like to introduce the world of science to youth at a younger age as it is one of the fastest-growing and innovative industries. In my spare time, I love to listen to rap music, explore the food options on the Food Network, and craft small artisanal birdhouses.",
    },
    {
      name: "KOUROSH BANAEIANZADEH",
      position: "VP INFORMATION & TECHNOLOGY",
      imageName: "Kourosh.jpg",
      bio: "I am a third year Bioinformatics student learning computer programming while pursuing my passions in biology. One of the aspects of biology that fascinates me is the brain. It has the capacity to learn, understand and apply. Although today we are still unable to know how the whole brain functions, we have discovered many intresting properties of the brain. At the moment recreational drugs is one of the simplest concepts to learn yet very interesting. It is fascinating to know how the body reacts to these reagents and how we become addicted. In this club I will be ensuring the smooth operation of IT. I hope with this information we can educate teens, so they can make informed decisions.",
    },
    {
      name: "JACKIE LUC",
      position: "VP INFORMATION & TECHNOLOGY",
      imageName: "Jackie.JPG",
      bio: "I am in my fourth year of Computer Science, concentrating my studies in Software Engineering at the University of Calgary. In this area of study, objective understanding of the potential consequences of my actions are vital in making well-informed decisions. However, it is not a requirement to be a critical thinker to make well-informed decisions. Speaking from experience, understanding the foundational basics can largely assist in mitigating several consequences and misunderstandings. I hope this will enable youths to take that first, possibly intimidating, step in trying to understand complex topics - such as the effects of drugs. Through my involvement in RED, I also hope to reflect the team’s passionate efforts in this endeavor, in person and on the website. I also enjoy a good pun and when I have free time, I love to spend it with good company!",
    },
    {
      name: "IT COULD BE YOU!",
      position: "VP FINANCE",
      imageName: "placeholder-img.png",
      bio: "",
    },
    {
      name: "ARAZ MINHAS",
      position: "IT COORDINATOR",
      imageName: "Araz.jpg",
      bio: "In pursuing my second year of the BSc Neuroscience program at the University of Calgary, I have been fortunate to discover the value of continually cultivating neuroscientific knowledge for making intelligent decisions in everyday life, and in pursuing long-term goals. Along with the academic introductions to the field has come the lesson that such empowering and practically-relevant knowledge should ultimately be disseminated to all – especially the youth – to enable them to make well-informed decisions. Hence, I was prompted to join RED; I hope to support the team’s mission of providing all with easier access to pragmatic neuroscience-based knowledge, such as that pertaining to the effects, functioning and regulation of drugs, through various exciting educational mediums. Further, I hope to facilitate the club’s endeavours, with the rest of the IT team, by helping to overcome all technical challenges, and by ultimately assisting the expansion of its opportunities, and positive influence.",
    },
  ];

  const advisors = [
    {
      name: "YASSINE BENSAADA",
      imageName: "Yassine.jpg",
      bio: "When initially creating RED, our mission was simple: Provide an innovative and unique approach to drug education focused on the fundamentals of physiology and neuroscience as they relate to psychoactive drugs and substances of abuse. From the get-go, the focus was to deliver high-quality, interactive, and engaging presentations that not only resonate with students, but leave them excited and motivated for science-learning moving forward. As RED continues to grow, my goal is to ensure that these values with which RED was founded are maintained, promoted, and sought.",
    },
    {
      name: "ABDULLAH AZEEM",
      imageName: "Abdullah.jpg",
      bio: "As I finish up my last year of Neurosciences at the University of Calgary, one of my main goals is to support RED in becoming the gold standard of drug education in Canada. Leveraging my background in neuroscience and addiction research, my role is to provide strategic guidance and assist the Management team as required.  RED has shown tremendous growth thus far; an advisory role gives me a front-row seat to all that will be accomplished in the future.",
    },
  ];

  const alumnis = [
    {
      name: "MEGAN LEUNG",
      position: "CO-PRESIDENT",
    },
    {
      name: "HASNAIEN AHMED",
      position: "CO-PRESIDENT",
    },
    {
      name: "JANNA NEWTON",
      position: "VP INTERNAL",
    },
    {
      name: "SOPHIE OU YANG",
      position: "VP FINANCE",
    },
    {
      name: "MONICA UPPAL",
      position: "MARKETING COORDINATOR",
    },
    {
      name: "SLOBODAN ZELIC",
      position: "SPONSORSHIP COORDINATOR",
    },
    {
      name: "SACHINEE WIJETILLEKE",
      position: "IT COORDINATOR",
    },
  ];

  return (
    <main>
      <div className="container">
        <h1>Our Team</h1>
      </div>
      <Executive executives={executives} />
      <Advisors advisors={advisors} />
      <Alumni alumnis={alumnis} />
    </main>
  );
}
