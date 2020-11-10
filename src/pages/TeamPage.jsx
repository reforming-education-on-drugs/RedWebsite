import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Modal } from "react-bootstrap";
import chunk from "lodash/chunk";

// This will import all the images because ES6 standard doesn't allow
// dynamic importing of images
//
// @param {required context} r
// @returns {images}
function importAll(r) {
  let images = {};
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const importedImages = importAll(
  require.context("../assets/images", false, /\.(png|jpe?g|JPE?G|svg)$/)
);

function Executive(props) {
  Executive.propTypes = {
    executives: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  const executives = chunk(props.executives, 2);

  return (
    <Container>
      <div className="executive">
        {executives.map((executiveRow) => (
          <Row>
            {executiveRow.map((executive) => (
              <Col
                md={6}
                onClick={() => {
                  props.setModalShow(true);
                  props.setViewingExec(executive.name);
                }}
                className="exec-card hvr-float"
              >
                <img
                  src={importedImages[executive.imageName]}
                  className="img-circle wow fadeInDown"
                  alt={executive.name}
                />
                <h3>
                  <b>{executive.name}</b>
                </h3>
                <h3>{executive.position}</h3>
                {/* <p>{executive.bio}</p> */}
              </Col>
            ))}
          </Row>
        ))}
      </div>
    </Container>
  );
}

function BioModal(props) {
  if (props.viewingExec != null) {
    const { show, onHide } = props;
    const exec = props.viewingExec;
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="executive_modal">
          <Row className="justify-content-end mr-4 mt-4">
            <i
              onClick={onHide}
              style={{ cursor: "pointer" }}
              className="fas fa-times"
            ></i>
          </Row>
          <Row className="justify-content-center p-4">
            <Col md={12}>
              <img
                src={importedImages[exec.imageName]}
                className="img-circle wow fadeInDown"
                alt={exec.name}
              />
              <h3>
                <b>{exec.name}</b>
              </h3>
              <h3>{exec.position}</h3>
              <p className="mb-4 text-justify mx-2">{exec.bio}</p>
            </Col>
          </Row>
        </div>
      </Modal>
    );
  } else {
    return <></>;
  }
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
          {advisors.map((advisorRow) => (
            <Row>
              {advisorRow.map((advisor) => (
                <Col
                  md={6}
                  onClick={() => {
                    props.setModalShow(true);
                    props.setViewingExec(advisor.name);
                  }}
                  style={{ display: "inline-block", float: "none" }}
                  className="exec-card hvr-float"
                >
                  <img
                    src={importedImages[advisor.imageName]}
                    className="img-circle wow fadeInDown"
                    alt={advisor.name}
                  />
                  <h3>
                    <b>{advisor.name}</b>
                  </h3>
                  {/* <p>{advisor.bio}</p> */}
                </Col>
              ))}
            </Row>
          ))}
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
          {props.alumnis.map((alimuni) => (
            <Col md={4}>
              <h3>
                <b>{alimuni.name}</b>
              </h3>
              <p>{alimuni.position}</p>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default function TeamPage() {
  document.title = "RED | Team";

  const executives = [
    {
      name: "DANA NEWTON-GUNDERSON",
      position: "CO-PRESIDENT",
      imageName: "Dana.jpg",
      bio:
        "Hello, my name is Dana and I am a fourth year Neuroscience student at the University of Calgary. In my past year of volunteering with RED, I’ve been excited by RED’s ability to both engage young people in science and get them thinking critically about drug use. Given the current opioid crisis and the recent legalization of cannabis, it’s increasingly important for young people to understand the effects of drugs on the brain, in order to be able to make informed decisions. This year I’m looking forward to helping construct scientific presentations that are both relevant to today’s youth and that will help facilitate a discussion on drug use. In my spare time, I enjoy reading, playing music and downhill skiing.",
    },
    {
      name: "JARIN THUNDATHIL",
      position: "CO-PRESIDENT",
      imageName: "Jarin.jpg",
      bio:
        "When I joined RED nearly five years ago, I immediately understood the potential we had to improve the discourse around drug use for youth in our city.  As a biomedical sciences student, RED presented the perfect opportunity to unite my academic interests with my passion for advocacy. During my time with RED, I had my first real exposure to teaching in a classroom environment. It was inspiring to see students genuinely engaging with the real-world implications of contentious issues like addiction and the opioid crisis. Last year, we were able to reach over 1000 students at 13 different schools. This year, as VP External, my goals are to see RED expand its presence in Calgary to even more schools, and to lay the groundwork for our expansion to other parts of Alberta.",
    },
    {
      name: "SUMAN RANDHAWA",
      position: "VP INTERNAL",
      imageName: "Suman.jpg",
      bio:
        "Hi, my name is Suman and I am a fifth-year Kinesiology major. My interest with substance abuse issues began at a young age when I witnessed my peers experimenting with drugs. Over the years, their habits progressed and drugs became a part of their lifestyle. Witnessing first-hand the impact that substance abuse has on youth has driven me to take a stand and educate a younger audience. My goal and purpose on this team is to make sure that the next generation of students get the opportunity to learn about substance abuse in a way that was not made available to me or my peers. Through engaging presentations and interactive learning, I hope to inform the younger generation about the science, and knowledge of drugs and substances. I would also like to introduce the world of science to youth at a younger age as it is one of the fastest-growing and innovative industries.",
    },
    {
      name: "ARAZ MINHAS",
      position: "VP INFORMATION & TECHNOLOGY",
      imageName: "Araz.jpg",
      bio:
        "As a fifth-year student in the BSc Neuroscience program (minoring in Data Science) at the University of Calgary, I have been fortunate to discover the value of continually cultivating neuroscientific knowledge for making intelligent decisions in everyday life, and in pursuing long-term goals. Along with the academic introductions to the field has come the lesson that such empowering and practically-relevant knowledge should ultimately be disseminated to all – especially the youth – to enable them to make well-informed decisions. Hence, I was prompted to join RED; I hope to support the team’s mission of providing all with easier access to pragmatic neuroscience-based knowledge, such as that pertaining to the effects, functioning and regulation of drugs, through various exciting educational mediums. Further, I hope to facilitate the club’s endeavours, with the rest of the IT team, by helping to overcome all technical challenges, and by ultimately assisting the expansion of its opportunities, and positive influence.",
    },
    {
      name: "DAVID CHAU",
      position: "VP EDUCATION",
      imageName: "David.jpg",
      bio:
        "Hey, my name is David and I am currently in my third year of Neuroscience at the University of Calgary. Ever since elementary school, one of the most important things in my life has been the idea of scientific literacy, and the view that it is not about your level of knowledge, but an overwhelming curiosity towards the world around you. As a result, I believe that it is essential that science is taught in a way that is engaging, interactive, and purposeful. I joined RED with the desire to educate students about the risks of drug use viewed through a scientific lens, and design presentations that would encourage them to apply what they have learned to their own lives. Whenever I have free time, you can usually find me listening to music or trying to learn new obscure hobbies.",
    },
    {
      name: "ALLY NECULITA",
      position: "VP FINANCE",
      imageName: "Ally.jpg",
      bio:
        "I’m Ally and I am a fifth-year accounting student at the University of Calgary. My goal with RED is to inspire youths, along with the rest of my community, to be able to make informed decisions regarding to substance use. Drug abuse is not a new issue in our community, and has been around for a while, and I am excited to collaborate with younger generations and deliver interesting facts on how these substances have an effect on the human body. I value the right of education for everyone, and besides my passion to learn, I also love musicals and dancing. As Vice President of Finance, I am excited to take on new fundraising projects and ensure that RED continues to grow.",
    },
    {
      name: "PUNIT BHATT",
      position: "VP EXTERNAL",
      imageName: "Punit.jpg",
      bio: `Hey! My name is Punit Bhatt. I am second year student at U of C pursuing a undergraduate degree in Neuroscience. Drug education and awareness is something that I think is especially important for our generation due to the impact of social media. Drugs and alcohol are always "advertised" on our socials through big celebrities and that may lead to many misconceptions about consumption. Additionally, the popularity of vapes and the legalization of marijuana demands that we as a society look to promote drug education. That is why I think that RED can have a huge impact on our community: by expanding beyond just saying "drugs are bad" and actually explaining some of the science behind drugs, we are able to promote safe consumption and healthy choices. Additionally, as students we may be able to provide a connection that is more impactful. As this year's VP External I hope to continue our steps towards expansion and continue to spread out message to as many schools as possible.`,
    },
  ];

  const advisors = [
    {
      name: "HASNAIEN AHMED",
      imageName: "Hasnaien.jpg",
      bio:
        "During myself and Megan's tenure as Co-Presidents, RED underwent incredible growth and hit milestones such as the launch of our Fentanyl Presentation, our biggest executive team and club size to date, as well as winning Club of the Year. My primary role as an adviser is to keep that same energy instilled in the current executive team; propelling them forward to bigger and better accomplishments. Aside from much-unsolicited backseat driving, my future with this club holds working on the non-profit wing of RED, laying the foundations for future chapters at universities across Canada. I would be remiss if I did not mention my having had the incredible privilege of watching so many amazing junior executives and executives mature and blossom into the formidable leaders they are today; I am incredibly excited to see what the future holds for RED. I sleep with great ease and comfort at night, with the knowledge that this club is run by the ambitious, conscientious and caring people by which it is.",
    },
  ];

  const alumnis = [
    {
      name: "JEROME GOBEIL",
      position: "IT COORDINATOR",
    },
    {
      name: "SOPHIE GOBEIL",
      position: "CO-PRESIDENT",
    },
    {
      name: "BILAL HAFEEZ",
      position: "CO-PRESIDENT",
    },
    {
      name: "KAITLYN VAN BAKEL",
      position: "CO-PRESIDENT",
    },
    {
      name: "URIEL PEREZ",
      position: "CO-PRESIDENT",
    },
    {
      name: "SARAH ZANUTTO",
      position: "VP EDUCATION",
    },
    {
      name: "KOUROSH BANAEIANZADEH",
      position: "VP INFORMATION & TECHNOLOGY",
    },
    {
      name: "JACKIE LUC",
      position: "VP INFORMATION & TECHNOLOGY",
    },
    {
      name: "VINCENT CHIANG",
      position: "EDUCATION COORDINATOR",
    },
    {
      name: "JENNY LE",
      position: "IT COORDINATOR",
    },
    {
      name: "SANGKHA PAUL",
      position: "EDUCATION COORDINATOR",
    },
    {
      name: "MEGAN LEUNG",
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
      name: "YASSINE BENSAADA",
      position: "CO-FOUNDER",
    },
    {
      name: "ABDULLAH AZEEM",
      position: "CO-FOUNDER",
    },
    {
      name: "ASFAR KHAN",
      position: "VP-EXTERNAL",
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

  const [modalShow, setModalShow] = React.useState(false);
  const [viewingExec, setViewingExec] = React.useState(null);

  const executives_and_advisors = executives.concat(advisors);

  return (
    <main>
      <div className="container">
        <h1>Our Team</h1>
      </div>
      <Executive
        modalShow={modalShow}
        setModalShow={setModalShow}
        executives={executives}
        viewingExec={viewingExec}
        setViewingExec={setViewingExec}
      />
      <Advisors
        advisors={advisors}
        modalShow={modalShow}
        setModalShow={setModalShow}
        viewingExec={viewingExec}
        setViewingExec={setViewingExec}
      />
      <Alumni alumnis={alumnis} />
      <BioModal
        viewingExec={
          viewingExec != null
            ? executives_and_advisors.find((exec) => exec.name == viewingExec)
            : null
        }
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setViewingExec(null);
        }}
      />
    </main>
  );
}
