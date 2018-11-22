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
                    <p>{executive.bio}</p>
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
      bio: "My name is Kaitlyn and I am currently a third year student in the concurrent Natural Sciences and Secondary Education program here at the University of Calgary. Over the past three years I have transitioned from Education Coordinator to Director of Education and now Co-President. As drug overdoses continue to trouble our province, I think it is becoming extremely important to talk about drug misuse and the science behind how drugs interact with our bodies. I am really passionate about our unique \"student teaching students\" approach and I have seen first hand the impact it can make. My hope is that education will outweigh the social pressures our adolescence face and allow them to make informed decisions. My goal for this year is to reach new communities in YYC and engage more student volunteers.",
    },
    {
      name: "URIEL PEREZ",
      position: "CO-PRESIDENT",
      imageName: "Uriel.JPG",
      bio: "Hola my name is Jose Uriel Perez Alvarez Gutierrez Anota, but you can call me Uriel. I am in my fourth and final year of my Health Sciences degree, with a major in Biomedical Sciences. I’ve been with RED for 3 years, slowly making my way up the ladder and gaining insight from various executive positions. As Co-President, I share the responsibilities of overseeing the execution of the goals set out by our executive team. For me, RED has been an opportunity to exercise my interpersonal and scientific skills, through promotion of the club and directly presenting to Calgarians. Although the role of Co-President is a full-time position, I like to pursue my other interests. Being Mexican, futbol is a part of me and it’s need for athleticism and leadership has allowed me to pursue various endeavours. These endeavours include; Medical Assistant for the Canadian Armed Forces Reserves, and founding soccer and Spikeball organizations.",
    },
    {
      name: "SARAH ZANUTTO",
      position: "VP EDUCATION",
      imageName: "SarahZ.JPG",
      bio: "Hello, my name is Sarah and I am in my 3rd year of a BSc degree in Neuroscience. Why do I love RED? I am passionate about our mission to foster a curiosity in science and facilitate an informed dialogue on the effects and consequences of drug use on the brain. I believe that a comprehensive perspective on the complexities of drug abuse is particularly relevant considering the opioid crisis devastating North America. As an Education Coordinator, my goal is to deliver meaningful presentations that resonate with our audience to encourage healthy and informed decision-making. I do this by helping to construct holistic and scientifically accurate presentations, as well as providing training for our presenters. Outside RED, my interests include mental health, playing piano and wall climbing!",
    },
    {
      name: "SOPHIE GOBEIL",
      position: "VP EDUCATION",
      imageName: "SophieG.jpg",
      bio: "I am a third year Neuroscience student at the University of Calgary. For as long as I can remember, I have been curious about how and why our bodies function the way they do. I am thrilled to have the opportunity to put my love for science to use while having a positive impact on young students. It is important that youth be able to make informed decisions about substance use, and I believe that RED’s fact-based approach can be a valuable tool in their education. I look forward to delivering accurate and useful educational material to students, and hope to promote their own curiosity about science while doing so. When I am not studying, you can find me in the mountains hiking, backpacking, and coaching cross-country skiing.",
    },
    {
      name: "JARIN THUNDATHIL",
      position: "VP EXTERNAL",
      imageName: "Jarin.JPG",
      bio: "When I joined RED nearly three years ago, I immediately understood the potential we had to improve the discourse around drug use for youth in our city.  As a biomedical sciences student, RED presented the perfect opportunity to unite my academic interests with my passion for advocacy. During my time with RED, I had my first real exposure to teaching in a classroom environment. It was inspiring to see students genuinely engaging with the real-world implications of contentious issues like addiction and the opioid crisis. Last year, we were able to reach over 1000 students at 13 different schools. This year, as VP External, my goals are to see RED expand its presence in Calgary to even more schools, and to lay the groundwork for our expansion to other parts of Alberta.",
    },
    {
      name: "SUMAN RANDHAWA",
      position: "VP INTERNAL",
      imageName: "Suman.jpg",
      bio: "Hi, my name is Suman and I am a third-year Kinesiology major. My interest with substance abuse issues began at a young age when I witnessed my peers experimenting with drugs. Over the years, their habits progressed and drugs became a part of their lifestyle. Witnessing first-hand the impact that substance abuse has on youth has driven me to take a stand and educate a younger audience. My goal and purpose on this team is to make sure that the next generation of students get the opportunity to learn about substance abuse in a way that was not made available to me or my peers. Through engaging presentations and interactive learning, I hope to inform the younger generation about the science, and knowledge of drugs and substances. I would also like to introduce the world of science to youth at a younger age as it is one of the fastest-growing and innovative industries.",
    },
    {
      name: "KOUROSH BANAEIANZADEH",
      position: "VP INFORMATION & TECHNOLOGY",
      imageName: "Kourosh.jpg",
      bio: "I am a 5th year Bioinformatics student on internship pursuing both my passion is computer science and biology. One of the aspects of biology that fascinates me is the brain. It has the capacity to learn, understand and apply. Although today we are still unable to know how the whole brain functions, we have discovered many intresting properties of the brain. At the moment recreational drugs is one of the simplest concepts to learn yet very interesting. It is fascinating to know how the body reacts to these reagents and how we become addicted. In this club I will be ensuring the smooth operation of IT. I hope with this information we can educate teens, so they can make informed decisions.",
    },
    {
      name: "JACKIE LUC",
      position: "VP INFORMATION & TECHNOLOGY",
      imageName: "Jackie.JPG",
      bio: "I am in my fifth year of Computer Science, concentrating my studies in Software Engineering at the University of Calgary. In this area of study, objective understanding of the potential consequences of my actions are vital in making well-informed decisions. However, it is not a requirement to be a critical thinker to make well-informed decisions. Speaking from experience, understanding the foundational basics can largely assist in mitigating several consequences and misunderstandings. I hope this will enable youths to take that first, possibly intimidating, step in trying to understand complex topics - such as the effects of drugs. Through my involvement in RED, I also hope to reflect the team’s passionate efforts in this endeavor, in person and on the website. I also enjoy a good pun and when I have free time, I love to spend it with good company!",
    },
    {
      name: "ALLY NECULITA",
      position: "VP FINANCE",
      imageName: "Ally.JPG",
      bio: "I’m Ally and I am a fourth-year accounting student at the University of Calgary. My goal with RED is to inspire youths, along with the rest of my community, to be able to make informed decisions regarding to substance use. Drug abuse is not a new issue in our community, and has been around for a while, and I am excited to collaborate with younger generations and deliver interesting facts on how these substances have an effect on the human body. I value the right of education for everyone, and besides my passion to learn, I also love musicals and dancing. As Vice President of Finance, I am excited to take on new fundraising projects and ensure that RED continues to grow.",
    },
    {
      name: "ARAZ MINHAS",
      position: "IT COORDINATOR",
      imageName: "Araz.jpg",
      bio: "In pursuing my second year of the BSc Neuroscience program at the University of Calgary, I have been fortunate to discover the value of continually cultivating neuroscientific knowledge for making intelligent decisions in everyday life, and in pursuing long-term goals. Along with the academic introductions to the field has come the lesson that such empowering and practically-relevant knowledge should ultimately be disseminated to all – especially the youth – to enable them to make well-informed decisions. Hence, I was prompted to join RED; I hope to support the team’s mission of providing all with easier access to pragmatic neuroscience-based knowledge, such as that pertaining to the effects, functioning and regulation of drugs, through various exciting educational mediums. Further, I hope to facilitate the club’s endeavours, with the rest of the IT team, by helping to overcome all technical challenges, and by ultimately assisting the expansion of its opportunities, and positive influence.",
    },
    {
      name: "VINCENT CHIANG",
      position: "EDUCATION COORDINATOR",
      imageName: "Vincent.JPG",
      bio: "My name is Vincent and I am a 4th year Biomedical Sciences student in the Bachelor of Health Sciences. As an undergraduate researcher in the lab of Dr. Matthew Hill, UCalgary’s leading cannabinoid researcher, and as an instructor of UCalgary’s high school anatomy sessions, RED gives me the opportunity to bring together my expertise in two fields to show today’s youth how to critically consider not only drugs but science as an entire field. Working under our amazing Education Leads as an Education Coordinator, I hope to give as well as to receive great tips, skills and information towards becoming a better educator. Outside of school, you can probably find me sleeping. During school, you will also probably find me sleeping.",
    },
    {
      name: "DANA NEWTON-GUNDERSON",
      position: "EDUCATION COORDINATOR",
      imageName: "Dana.JPG",
      bio:"Hello, my name is Dana and I am a second year Neuroscience student at the University of Calgary. In my past year of volunteering with RED, I’ve been excited by RED’s ability to both engage young people in science and get them thinking critically about drug use. Given the current opioid crisis and the recent legalization of cannabis, it’s increasingly important for young people to understand the effects of drugs on the brain, in order to be able to make informed decisions. This year I’m looking forward to helping construct scientific presentations that are both relevant to today’s youth and that will help facilitate a discussion on drug use. In my spare time, I enjoy reading, playing music and downhill skiing."

    },
    {
      name: "DAVID CHAU",
      position: "EDUCATION COORDINATOR",
      imageName: "David.JPG",
      bio:"Hey, my name is David and I am currently in my first year of Neuroscience at the University of Calgary. Ever since elementary school, one of the most important things in my life has been the idea of scientific literacy, and the view that it is not about your level of knowledge, but an overwhelming curiosity towards the world around you. As a result, I believe that it is essential that science is taught in a way that is engaging, interactive, and purposeful. I joined RED with the desire to educate students about the risks of drug use viewed through a scientific lens, and design presentations that would encourage them to apply what they have learned to their own lives. Whenever I have free time, you can usually find me listening to music or trying to learn new obscure hobbies."
    },
    {
      name: "BILAL HAFEEZS",
      position: "EXTERNAL COORDINATOR",
      imageName: "Bilal.JPG",
      bio:"Hey! My name is Bilal Hafeez. I am in my third year of undergraduate studies here at the University of Calgary, pursing a major in Biological Sciences, alongside a minor in Nanoscience. Throughout my post-secondary career, I have heard the word “drugs” in its varying connotations as well as settings by people who certainly have no knowledge of what it actually entails. In this day and age, the difference between substance use as well as abuse, is unclear to many, especially for teenagers and with the recent legalization bill being passed, the importance of understanding various substances and their impacts is immense. That is where I believe RED makes its most impact – our club moves forward to allow the beautiful people of our city and those surrounding it, the opportunity to understand and comprehend everything shady out there. My role is to keep close contact with schools and organisations within the city of Calgary, and work on the expansion of our organisation within Alberta."
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
    {
      name: "SID GHOUTAHM ",
      position: "VP EXTERNAL",
    },
    {
      name: "CORI MAH",
      position: "VP INTERNAL",
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
