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
        {executives.map((executiveRow, idx) => (
          <Row key={idx}>
            {executiveRow.map((executive, jdx) => (
              <Col
                key={jdx}
                md={6}
                onClick={() => {
                  props.setModalShow(true);
                  props.setViewingExec(executive.name);
                }}
                className="exec-card hvr-float"
              >
                {executive.imageName && (
                  <img
                    src={importedImages[executive.imageName]}
                    className="img-circle wow fadeInDown"
                    alt={executive.name}
                  />
                )}
                <h3>{executive.name}</h3>
                <h4>{executive.position}</h4>
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
              <div className="img_container">
                <img
                  src={importedImages[exec.imageName]}
                  className="img-circle wow fadeInDown"
                  alt={exec.name}
                />
              </div>

              <h3>{exec.name}</h3>
              <h4>{exec.position}</h4>
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
                  <h3>{advisor.name}</h3>
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
              <h3>{alimuni.name}</h3>
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
      name: "NOELLE THUNDATHIL",
      position: "CO-PRESIDENT",
      imageName: "Noelle.jpg",
      bio: "Hey! My name is Noelle, and I am a third-year Bioinformatics major. I joined RED one year ago after hearing about the direct impact it made for young adolescents. Drug-use and substance abuse are topics that are not talked about enough, especially in an unbiased manner. As an avid advocate for mental health, RED provided the perfect opportunity for me to learn more about drug-education while encouraging youth activism in the community. Over the past year, I got the chance to teach in a classroom environment and educate students about the importance of understanding issues like addiction and the opioid epidemic. As VP Internal, I hope to engage more students in drug-education and provide them with the knowledge to make their own informed decisions.",
    },
    {
      name: "Hailey Moretto",
      position: "CO-PRESIDENT",
      imageName: "Hailey.jpg",
      bio: "Hi, my name is Hailey and I am in my second year of neuroscience at the University of Calgary. Growing up, I was always told to avoid drugs because they can be dangerous and bad for you, but I was never actually informed of the science behind it. Drug education should include more than just scare tactics, which is why I joined RED. This club teaches the information and science behind drug use that I wish I had learned when I was younger, allowing adolescents to understand how drugs actually work and use this to make informed decisions. When I am not at school, you can find me on a mountain in the Rockies climbing or hiking.",
    },
    {
      name: "RAMIN KAHIDI",
      position: "VP INFORMATION & TECHNOLOGY",
      imageName: "Ramin.jpg",
      bio: "As a Bioinformatics Major, I am exposed to many different health-related issues in our world, many of which stem from a lack of sufficient education. The computer science aspects of my background enable me to identify where and how software can be utilized to address issues in the domain of health literacy. As the VP of IT, I get to support RED's awesome team in providing well-informed, science-based drug education by addressing technical hurdles and challenges.",
    },
    {
      name: "Alexandra Calpas",
      position: "VP Media & Marketing",
      imageName: "Alexandra.jpg",
      bio: "Hi there! My name is Alex and I am in my fourth year of Mind Sciences in Kinesiology at the University of Calgary. When I first heard about the RED team’s initiative to improve drug education for children and youth, I was eager to join! Non-biased, educational and safety-focused presentations on illicit substances are essential in ensuring individuals have the knowledge to make informed and healthy decisions for themselves. In my role of VP Media & Marketing I aspire to expand the outreach of the RED team’s mission and continue to foster the conversation surrounding safe substance use.",
    },
    {
      name: "TATSUYA HANSEN",
      position: "VP EXTERNAL",
      imageName: "Tatsuya.jpg",
      bio: `Hello! My name is Tatsuya Hansen, and I am in my second year of the Neuroscience program at the University of Calgary. I joined RED in my first year of university, hoping to be able to make a difference in our community. Nowadays, there is a lot of misinformation, stereotypes and unhelpful threats about drugs being "bad/dangerous" as a way to prevent adolescents from doing drugs.  Through RED, we hope to be able to reboot the education system surrounding drugs with more science-based, non-biased discussions about how drugs actually affect the body and mind. I hope that our presentations at schools will help adolescents in our community make informed decisions about drug and alcohol consumption. As Co-VP External, I hope to expand the reach of our club beyond Calgary, and hopefully work towards opening new RED chapters in other universities.`,
    },
    {
      name: "Queenie Ng",
      position: "VP EXTERNAL",
      imageName: "placeholder.png",
      bio: `I am completing my fourth year as a Kinesiology major, and am planning on pursuing a Masters in Physiotherapy after. Mental and physical health is a major focus in my field of studies, and I believe that it is important to become better informed on the effects of drugs without bias. As someone who has seen the effects of drug abuse, both in media and in real life, I believe that the current scare tactics used to inform young people are insufficient.  As Jr. VP External, I hope to maintain strong relationships with our current collaborators and continue to widen our network in order to impact more young people.`,
    },
    {
      name: "Thomson Midzi",
      position: "VP EDUCATION",
      imageName: "placeholder.png",
      bio: "Thomson is 4th year Chemical Engineering student, currently on internship in the Energy Industry. He has a passion and zeal for learning about tools that can help youth involved in illicit drug use. He has also been involved in volunteering for programs at the UofC, in harm reduction and addictions counseling. These skills lend him well to the role of VP Education for this year, where he hopes to expand knowledge to youths of more ages, and incorporate some of the recent advancements towards new substances that have massive potential towards mental health, and rewriting the common stereotypes through providing increased awareness.",
    },
    {
      name: "Kristen Eiriksson",
      position: "VP EDUCATION",
      imageName: "placeholder.png",
      bio: "Hi! My name is Kristen and I’m a third year Biomedical Sciences student. Throughout my degree, I’ve had the opportunity to research many interesting topics that relate to human welfare and I understand the importance of unbiased and science-based education on drugs in schools. Being a VP of education at RED provides me with the amazing opportunity to combine my love for science and working with kids, while positively impacting Calgary’s youth. I look forward to creating a fun and engaging learning environment in order to share my passion for science with students!",
    },
    {
      name: "Ronan Lopes",
      position: "VP EDUCATION",
      imageName: "placeholder.png",
      bio: "Hi! My name is Ronan and I'm a third-year biomedical sciences student. Being in an intense science-based program, I have had the opportunity to learn much about the complexities of the human body, human health and various different chemicals. Growing up, I always thought drug education was lacking engagement for youth, and I never found myself paying attention or listening enough. As VP of education, I hope to change this narrative and give youth a better drug education than I received. Contributing positively in this way is not only fulfilling but also helps me to engage with youth at a time when I felt I didn't have the engagement I needed. I look forward to the chance to work with other creative and forward-thinking individuals in the RED community!",
    },
  ];

  const advisors = [
    {
      name: "HASNAIEN AHMED",
      imageName: "Hasnaien.jpg",
      bio: "During myself and Megan's tenure as Co-Presidents, RED underwent incredible growth and hit milestones such as the launch of our Fentanyl Presentation, our biggest executive team and club size to date, as well as winning Club of the Year. My primary role as an adviser is to keep that same energy instilled in the current executive team; propelling them forward to bigger and better accomplishments. Aside from much-unsolicited backseat driving, my future with this club holds working on the non-profit wing of RED, laying the foundations for future chapters at universities across Canada. I would be remiss if I did not mention my having had the incredible privilege of watching so many amazing junior executives and executives mature and blossom into the formidable leaders they are today; I am incredibly excited to see what the future holds for RED. I sleep with great ease and comfort at night, with the knowledge that this club is run by the ambitious, conscientious and caring people by which it is.",
    },
  ];

  const alumnis = [{
      name: "PUNIT BHATT",
      position: "CO-PRESIDENT"},
    {
      name: "VICTORIA MELTS",
      position: "CO-PRESIDENT"},
    {
      name: "SABINE BANNOR",
      position: "EDUCATION DIRECTOR",
    },
    {
      name: "ROUBERT AARON",
      position: "VP EXTERNAL",
    },
    {
      name: "ALLY NECULITA",
      position: "VP FINANCE",
    },
    {
      name: "VELLA KIM",
      position: "VP EDUCATION",
    },
    {
      name: "DAVID CHAU",
      position: "CO-PRESIDENT",
    },
    {
      name: "ARAZ MINHAS",
      position: "VP INFORMATION & TECHNOLOGY",
    },
    {
      name: "DANA NEWTON-GUNDERSON",
      position: "CO-PRESIDENT",
    },
    {
      name: "JARIN THUNDATHIL",
      position: "CO-PRESIDENT",
    },
    {
      name: "SUMAN RANDHAWA",
      position: "VP INTERNAL",
    },
    // People above were added in winter 2022
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
