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
  // const users = await sql`
  //   SELECT * FROM presentation_booking
  // `;
  const presentations = [
    {
      presentation: {
        address: "123 main",
        date: "2023-05-01",
        name: "test",
        sheetname: "sheetname",
        times: [
          {
            startTime: "12:00",
            endTime: "13:00",
            enrolled: 1,
            capacity: 2,
            selected: "Confirmed",
          },
        ],
      },
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
  const { CEmail, Presentation_Date, Presentation_Time } = request.body;

  const users = await sql`
    DELETE FROM presentation_booking 
    WHERE (CEmail = ${CEmail} AND Presentation_Date = ${Presentation_Date} AND Presentation_Time = ${Presentation_Time})
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
};
