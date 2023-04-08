//psql postgres://farbod.moghadam1380:wFMDCRIf35uZ@ep-yellow-cherry-422966.us-east-2.aws.neon.tech/neondb

const PGHOST = "ep-yellow-cherry-422966.us-east-2.aws.neon.tech";
const PGDATABASE = "neondb";
const PGUSER = "farbod.moghadam1380";
const PGPASSWORD = "wFMDCRIf35uZ";
const ENDPOINT_ID = "ep-yellow-cherry-422966";

const postgres = require("postgres");
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: "require" });

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

getPgVersion();

const GetAllPresentations = async (request, response) => {
  // const presentations = await sql`
  //   SELECT * FROM presentation_booking
  // `;
  const presentations = [
    {
      CEmail: "teacher@cbe.ca",
      address: "123 main",
      Presentation: "PType",
      Presentation_Date: "2023-05-01",
      Presentation_Time: "12:00",
      Duration_In_Minutes: 60,
      School: "Wisewood",
      Executive_Confirmation: false,
      signups: [
        {
          enrolled: ["email1", "email2"],
          capacity: 2,
        },
      ],
    },
    {
      CEmail: "techer@cbe.ca",
      address: "123 main",
      Presentation: "PType",
      Presentation_Date: "2023-05-01",
      Presentation_Time: "12:00",
      Duration_In_Minutes: 60,
      School: "Wisewood",
      Executive_Confirmation: false,
      signups: [
        {
          enrolled: ["email1", "email2"],
          capacity: 2,
        },
      ],
    },
  ];
  response.status(200).json(presentations);
};

const GetConfirmedPresentations = async (request, response) => {
  const users = await sql`
      SELECT * FROM presentation_booking WHERE Executive_Confirmation=TRUE
    `;
  response.status(200).json(users);
};

const GetUnconfirmedPresentations = async (request, response) => {
  const users = await sql`
      SELECT * FROM presentation_booking WHERE Executive_Confirmation=FALSE
    `;
  response.status(200).json(users);
};

const GetExecutives = async (request, response) => {
  const users = await sql`
      SELECT email FROM red_staff WHERE is_RED_Executive=TRUE
    `;
  response.status(200).json(users);
};

const createPresentationBooking = async (request, response) => {
  const {
    CEmail,
    Presentation_Date,
    Presentation_Time,
    Location_In_School,
    School,
    Presentation,
    Number_Of_Student,
    Student_Grade,
    Duration_In_Minutes,
    Can_Class_Use_Kahoot,
    Notes,
    Executive_Confirmation,
  } = request.body;

  const users = await sql`
    INSERT INTO presentation_booking (CEmail, Presentation_Date, Presentation_Time, Location_In_School, 
        School, Presentation, Number_Of_Student, Student_Grade, Duration_In_Minutes,
        Can_Class_Use_Kahoot, Notes, Executive_Confirmation) VALUES (${CEmail}, ${Presentation_Date}, 
            ${Presentation_Time}, ${Location_In_School}, ${School}, ${Presentation}, ${Number_Of_Student}, 
            ${Student_Grade}, ${Duration_In_Minutes}, ${Can_Class_Use_Kahoot}, ${Notes}, ${Executive_Confirmation})
    `;
  response.status(200).json(users);
};

const deletePresentationBooking = async (request, response) => {
  const { CEmail, Presentation_Date, Presentation_Time } =
    request.body.presentation;
  console.log(CEmail, Presentation_Date, Presentation_Time);
  // const users = await sql`
  //   DELETE FROM presentation_booking
  //   WHERE (CEmail = ${CEmail} AND Presentation_Date = ${Presentation_Date} AND Presentation_Time = ${Presentation_Time})
  //   `;
  response.status(200).json("success");
};

const createClient = async (request, response) => {
  const { Email, Role, Sname, SAddress, SDname } = request.body;

  try {
    const schools = await sql`
      INSERT INTO School (Sname, Address, SDname) VALUES (${Sname}, ${SAddress}, ${SDname})
      `;
  } catch (err) {
    //this means the school already exists, so just continue
  }

  const users = await sql`
    INSERT INTO Client (Email, Client_Role, Sname) VALUES (${Email}, ${Role}, ${Sname})
    `;
  response.status(200).json(users);
};

module.exports = {
  GetAllPresentations,
  GetConfirmedPresentations,
  GetUnconfirmedPresentations,
  GetExecutives,
  createPresentationBooking,
  deletePresentationBooking,
  createClient,
};
