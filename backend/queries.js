//psql postgresql://<pass>@long-sage-4090.g95.gcp-us-west2.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full

const postgres = require("postgres");
//! probably not safe to have the password here
const URL = "postgresql://farbod:8eNjLB_FhV-qhb5D4_dF6w@long-sage-4090.g95.gcp-us-west2.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full";

const sql = postgres(URL, { ssl: "require" });

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

getPgVersion();

const GetAllPresentations = async (request, response) => {
  const result = await sql`
    SELECT * 
    FROM presentation_booking, School
    WHERE presentation_booking.School_Name = School.SName
  `;
  response.status(200).json(result);
};

const GetConfirmedPresentations = async (request, response) => {
  const result = await sql`
    SELECT * 
    FROM presentation_booking, School
    WHERE presentation_booking.School_Name = School.SName AND Executive_Confirmation = True
  `;
  response.status(200).json(result);
};

const GetUnconfirmedPresentations = async (request, response) => {
  const result = await sql`
    SELECT * 
    FROM presentation_booking, School
    WHERE presentation_booking.School_Name = School.SName AND Executive_Confirmation = False
  `;
  response.status(200).json(result);
};

const GetExecutives = async (request, response) => {
  const result = await sql`
      SELECT email FROM red_staff WHERE is_RED_Executive=TRUE
    `;
  response.status(200).json(result);
};

const createPresentationBooking = async (request, response) => {
  const {
    CEmail,
    Presentation_Date,
    Presentation_Time,
    Location_In_School,
    Presentation,
    Number_Of_Student,
    Student_Grade,
    Duration_In_Minutes,
    Can_Class_Use_Kahoot,
    Notes,
    Executive_Confirmation,
    Cname,
    Sname,
    SAddress,
    SDname,
    City_name,
    capacity,
  } = request.body;

  try {
    const schools = await sql`
      INSERT INTO School (Sname, Address, SDname, City_name) VALUES (${Sname}, ${SAddress}, ${SDname}, ${City_name})
      `;
  } catch (err) {
    console.log(err);
    //this means the school already exists, so just continue
  }

  console.log({
    CEmail,
    Presentation_Date,
    Presentation_Time,
    Location_In_School,
    Presentation,
    Number_Of_Student,
    Student_Grade,
    Duration_In_Minutes,
    Can_Class_Use_Kahoot,
    Notes,
    Executive_Confirmation,
    Cname,
    Sname,
    SAddress,
    SDname,
    City_name,
    capacity,
  });

  try {
    const result = await sql`
    INSERT INTO presentation_booking (CEmail, Presentation_Date, Presentation_Time, Location_In_School, Presentation, 
      Number_Of_Student, Student_Grade, Duration_In_Minutes, Can_Class_Use_Kahoot, Notes, Executive_Confirmation, Cname, School_Name)
    VALUES (${CEmail}, ${Presentation_Date}, ${Presentation_Time}, ${Location_In_School}, ${Presentation}, 
      ${Number_Of_Student}, ${Student_Grade}, ${Duration_In_Minutes}, ${Can_Class_Use_Kahoot}, ${Notes}, ${Executive_Confirmation}, ${Cname}, ${Sname})
    `;
    console.log(result);
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response
      .status(500)
      .json(
        "An error occured. Make sure you are not trying to book a presentation that already exists."
      );
  }
};

const deletePresentationBooking = async (request, response) => {
  const { Sname, Presentation_Date, Presentation_Time, Location_In_School } =
    request.body;
  console.log(request.body);
  try {
    const deletePresents = await sql`
    DELETE FROM presents
    WHERE (School_Name = ${Sname} AND Presentation_Date = ${Presentation_Date} AND Presentation_Time = ${Presentation_Time} AND Location_In_School = ${Location_In_School})
    `;
  } catch (err) {
    console.log(err);
  }
  try {
    const result = await sql`
    DELETE FROM presentation_booking 
    WHERE (School_Name = ${Sname} AND Presentation_Date = ${Presentation_Date} AND Presentation_Time = ${Presentation_Time} AND Location_In_School = ${Location_In_School})
    `;
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(406).json("No presentations found");
  }
};

const createPresents = async (request, response) => {
  const { School_Name, Date, Time, Location_In_School, Volunteer_email } =
    request.body;

  console.log({ School_Name, Date, Time, Location_In_School, Volunteer_email });

  try {
    const result = await sql`
    INSERT INTO Presents (School_Name, Presentation_Date, Presentation_Time, Location_In_School, Volunteer_email) 
    VALUES (${School_Name}, ${Date}, ${Time}, ${Location_In_School}, ${Volunteer_email})
    `;
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(406).json(err);
  }
};

const deletePresents = async (request, response) => {
  const { School_Name, Date, Time, Location_In_School, Volunteer_email } =
    request.body;
  console.log({ School_Name, Date, Time, Location_In_School, Volunteer_email });

  try {
    const result = await sql`
    DELETE FROM Presents WHERE (School_Name = ${School_Name} AND Presentation_Date = ${Date} AND Presentation_Time = ${Time} 
      AND Location_In_School = ${Location_In_School} AND Volunteer_email = ${Volunteer_email})
    `;
    response.status(200).json(result);
  } catch (err) {
    console.log(err);
    response.status(406).json(err);
  }
};

const createRedStaff = async (request, response) => {
  const {
    Email,
    Fname,
    Lname,
    Uni_ID,
    Faculty,
    Join_Date,
    is_RED_volunteer,
    is_RED_Executive,
    is_Trained,
    position,
    Cname,
    Uname,
  } = request.body;

  const result = await sql`
    INSERT INTO red_staff (Email, Fname, Lname, Uni_ID, Faculty, Join_Date, is_RED_volunteer, is_Trained, is_RED_Executive, position, Cname, Uname)
    VALUES (${Email}, ${Fname}, ${Lname}, ${Uni_ID}, ${Faculty}, ${Join_Date}, ${is_RED_volunteer}, ${is_Trained}, ${is_RED_Executive}, ${position}, ${Cname}, ${Uname})
    `;
  response.status(200).json(result);
};

module.exports = {
  GetAllPresentations,
  GetConfirmedPresentations,
  GetUnconfirmedPresentations,
  GetExecutives,
  createPresentationBooking,
  deletePresentationBooking,
  createPresents,
  deletePresents,
  createRedStaff,
};
