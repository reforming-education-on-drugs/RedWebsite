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
      name: "DAVID CHAU",
      position: "CO-PRESIDENT",
      imageName: "David.jpg",
      bio: "Hey, my name is David and I am currently in my fourth year of Neuroscience at the University of Calgary. Ever since elementary school, one of the most important things in my life has been the idea of scientific literacy, and the view that it is not about your level of knowledge, but an overwhelming curiosity towards the world around you. As a result, I believe that it is essential that science is taught in a way that is engaging, interactive, and purposeful. I joined RED with the desire to educate students about the risks of drug use viewed through a scientific lens, and design presentations that would encourage them to apply what they have learned to their own lives. Whenever I have free time, you can usually find me listening to music or trying to learn new obscure hobbies.",
    },
    {
      name: "PUNIT BHATT",
      position: "CO-PRESIDENT",
      imageName: "Punit.jpg",
      bio: `Hey! My name is Punit Bhatt. I am second year student at U of C pursuing a undergraduate degree in Neuroscience. Drug education and awareness is something that I think is especially important for our generation due to the impact of social media. Drugs and alcohol are always "advertised" on our socials through big celebrities and that may lead to many misconceptions about consumption. Additionally, the popularity of vapes and the legalization of marijuana demands that we as a society look to promote drug education. That is why I think that RED can have a huge impact on our community: by expanding beyond just saying "drugs are bad" and actually explaining some of the science behind drugs, we are able to promote safe consumption and healthy choices. Additionally, as students we may be able to provide a connection that is more impactful. As this year's Co-President I hope to continue our steps towards expansion and continue to spread out message to as many schools as possible.`,
    },
    {
      name: "NOELLE THUNDATHIL",
      position: "VP INTERNAL",
      imageName: "Noelle.jpg",
      bio: "Hey! My name is Noelle, and I am a second-year Bioinformatics major. I joined RED one year ago after hearing about the direct impact it made for young adolescents. Drug-use and substance abuse are topics that are not talked about enough, especially in an unbiased manner. As an avid advocate for mental health, RED provided the perfect opportunity for me to learn more about drug-education while encouraging youth activism in the community. Over the past year, I got the chance to teach in a classroom environment and educate students about the importance of understanding issues like addiction and the opioid epidemic. As VP Internal, I hope to engage more students in drug-education and provide them with the knowledge to make their own informed decisions.",
    },
    {
      name: "RAMIN KAHIDI",
      position: "VP INFORMATION & TECHNOLOGY",
      imageName: "Ramin.jpg",
      bio: "As a Bioinformatics Major, I am exposed to many different health-related issues in our world, many of which stem from a lack of sufficient education. The computer science aspects of my background enable me to identify where and how software can be utilized to address issues in the domain of health literacy. As the VP of IT, I get to support RED's awesome team in providing well-informed, science-based drug education by addressing technical hurdles and challenges.",
    },
    {
      name: "VELLA KIM",
      position: "VP EDUCATION",
      imageName: "Vella.jpg",
      bio: "With the ongoing prevalence of substance abuse in our community, it is critical to educate adolescents of drug use. As a current 3rd year neuroscience student at the University of Calgary, I was drawn to RED not only by its vision for such education, but also the use of scientific knowledge as a vehicle towards this goal. My aim as an Education Coordinator is to continue creating and distributing content that sparks the interest of youth towards the scientific and social implications of drugs in order to allow self-made mature and informed decisions. I am grateful to be part of such an impactful club, and am excited to further broaden our reach towards the younger generation. In my free time, I enjoy playing and listening to music.",
    },
    {
      name: "VICTORIA MELTS",
      position: "EDUCATION DIRECTOR",
      imageName: "Victoria.jpg",
      bio: "I am pursuing an undergraduate degree in BioMedical Science at the University of Calgary, and am planning on doing a Masters in Neuroscience next. Understanding how psychoactive drugs work is one of my biggest life passions; I do research with substances such as cannabis and psilocybin at the Hotchkiss Brain Institute, and read about pharmacology in my spare time. I experienced an uninformative, scare-tactic approach to drug education in grade school and have been on a mission to correct that ever since. I hope to inspire students to use science to answer their life questions, guide their decisions, and spark a curiosity about how the world works.",
    },
    // {
    //   name: "SABINE BANNOR",
    //   position: "EDUCATION DIRECTOR",
    //   imageName: "Sabine.jpg",
    //   bio: "Hey everyone! My name is Riva and I am currently a fourth year student in Cellular, Molecular and Microbial Biology at the University of Calgary. Growing up, I was taught about drugs and substance use disorders in a way that scared me. This made me avoid these subject areas because I was afraid. Being at university, studying science, and presenting at RED, has made me realize how essential it is for everyone to have a scientific-based knowledge of drugs and substance use. Understanding and learning through a scientific lens can change one’s perspective in regards to the decisions they make and how they see others. By using science and making the learning process engaging and interactive, I have seen our presentations make kids more open to being educated and less scared of being informed. With RED I want to keep up their desire to learn about these subject areas that are important and prevalent in their society, so that they can make decisions while understanding their consequences. In my free time I powerlift, play spikeball, and take care of my dog Yoshi!",
    // },
    {
      name: "ROUBERT AARON",
      position: "VP EXTERNAL",
      imageName: "Roubert.jpg",
      bio: `Hey everyone! I’m a fourth year student studying Psychology in the Bachelor of Sciences. I joined RED because I enjoy learning about the neurological underpinnings of drugs and addressing community health issues through education. As the Co-Vice President External, I’m responsible for reaching out to schools, scheduling presentations, and establishing new intercollegiate RED chapters. Ultimately, my aim is to ensure that drug education and awareness reach more areas and people. When I’m not studying or booking presentations, I love spending time with friends and family and dancing. `,
    },
    // {
    //   name: "ALLY NECULITA",
    //   position: "VP FINANCE",
    //   imageName: "Ally.jpg",
    //   bio: "I’m Ally and I am a fifth-year accounting student at the University of Calgary. My goal with RED is to inspire youths, along with the rest of my community, to be able to make informed decisions regarding to substance use. Drug abuse is not a new issue in our community, and has been around for a while, and I am excited to collaborate with younger generations and deliver interesting facts on how these substances have an effect on the human body. I value the right of education for everyone, and besides my passion to learn, I also love musicals and dancing. As Vice President of Finance, I am excited to take on new fundraising projects and ensure that RED continues to grow.",
    // },
  ];

  const advisors = [
    {
      name: "HASNAIEN AHMED",
      imageName: "Hasnaien.jpg",
      bio: "During myself and Megan's tenure as Co-Presidents, RED underwent incredible growth and hit milestones such as the launch of our Fentanyl Presentation, our biggest executive team and club size to date, as well as winning Club of the Year. My primary role as an adviser is to keep that same energy instilled in the current executive team; propelling them forward to bigger and better accomplishments. Aside from much-unsolicited backseat driving, my future with this club holds working on the non-profit wing of RED, laying the foundations for future chapters at universities across Canada. I would be remiss if I did not mention my having had the incredible privilege of watching so many amazing junior executives and executives mature and blossom into the formidable leaders they are today; I am incredibly excited to see what the future holds for RED. I sleep with great ease and comfort at night, with the knowledge that this club is run by the ambitious, conscientious and caring people by which it is.",
    },
  ];

  const alumnis = [
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
