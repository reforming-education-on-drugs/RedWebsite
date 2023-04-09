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
  const result = await sql`
    SELECT * 
    FROM presentation_booking, Client, School, Presents
    WHERE presentation_booking.CEmail = Client.Email AND Client.Sname = School.Sname
    AND presentation_booking.CEmail = Presents.CEmail AND presentation_booking.Presentation_Date = Presents.Presentation_Date
    AND presentation_booking.Presentation_Time = Presents.Presentation_Time AND presentation_booking.Location_In_School = Presents.Location_In_School
  `;
  try{
    new_result = {
      "cemail": result[0].cemail,
      "presentation_date": result[0].presentation_date,
      "presentation_time": result[0].presentation_time,
      "location_in_school": result[0].location_in_school,
      "presentation": result[0].presentation,
      "number_of_student": result[0].number_of_student,
      "student_grade": result[0].student_grade,
      "duration_in_minutes": result[0].duration_in_minutes,
      "can_class_use_kahoot": result[0].can_class_use_kahoot,
      "notes": result[0].notes,
      "executive_confirmation": result[0].executive_confirmation,
      "email": result[0].email,
      "client_role": result[0].client_role,
      "sname": result[0].sname,
      "address": result[0].address,
      "sdname": result[0].sdname,
      "capacity": result[0].capacity,
      "signups": result.map(d => d.volunteer_email)
    };
    response.status(200).json(new_result);
  } catch (error) {
    response.status(200).json("No presentations found");
  }
};

const GetConfirmedPresentations = async (request, response) => {
  const result = await sql`
      SELECT * 
      FROM presentation_booking, Client, School, Presents
      WHERE presentation_booking.CEmail = Client.Email AND Client.Sname = School.Sname
      AND presentation_booking.CEmail = Presents.CEmail AND presentation_booking.Presentation_Date = Presents.Presentation_Date
      AND presentation_booking.Presentation_Time = Presents.Presentation_Time AND presentation_booking.Location_In_School = Presents.Location_In_School
      AND executive_confirmation = TRUE
    `;

    try{
      new_result = {
        "cemail": result[0].cemail,
        "presentation_date": result[0].presentation_date,
        "presentation_time": result[0].presentation_time,
        "location_in_school": result[0].location_in_school,
        "presentation": result[0].presentation,
        "number_of_student": result[0].number_of_student,
        "student_grade": result[0].student_grade,
        "duration_in_minutes": result[0].duration_in_minutes,
        "can_class_use_kahoot": result[0].can_class_use_kahoot,
        "notes": result[0].notes,
        "executive_confirmation": result[0].executive_confirmation,
        "email": result[0].email,
        "client_role": result[0].client_role,
        "sname": result[0].sname,
        "address": result[0].address,
        "sdname": result[0].sdname,
        "capacity": result[0].capacity,
        "signups": result.map(d => d.volunteer_email)
      };
      response.status(200).json(new_result);
    } catch (error) {
      response.status(200).json("No presentations found");
    }
};

const GetUnconfirmedPresentations = async (request, response) => {
  const result = await sql`
      SELECT * 
      FROM presentation_booking, Client, School, Presents
      WHERE presentation_booking.CEmail = Client.Email AND Client.Sname = School.Sname
      AND presentation_booking.CEmail = Presents.CEmail AND presentation_booking.Presentation_Date = Presents.Presentation_Date
      AND presentation_booking.Presentation_Time = Presents.Presentation_Time AND presentation_booking.Location_In_School = Presents.Location_In_School
      AND executive_confirmation = False
    `;

    try{
      new_result = {
        "cemail": result[0].cemail,
        "presentation_date": result[0].presentation_date,
        "presentation_time": result[0].presentation_time,
        "location_in_school": result[0].location_in_school,
        "presentation": result[0].presentation,
        "number_of_student": result[0].number_of_student,
        "student_grade": result[0].student_grade,
        "duration_in_minutes": result[0].duration_in_minutes,
        "can_class_use_kahoot": result[0].can_class_use_kahoot,
        "notes": result[0].notes,
        "executive_confirmation": result[0].executive_confirmation,
        "email": result[0].email,
        "client_role": result[0].client_role,
        "sname": result[0].sname,
        "address": result[0].address,
        "sdname": result[0].sdname,
        "capacity": result[0].capacity,
        "signups": result.map(d => d.volunteer_email)
      };
      response.status(200).json(new_result);
    } catch (error) {
      response.status(200).json("No presentations found");
    }
};

const GetExecutives = async (request, response) => {
  const result = await sql`
      SELECT email FROM red_staff WHERE is_RED_Executive=TRUE
    `;
  response.status(200).json(result);
};

const GetPresentation = async (request, response) => {
  const result = await sql`
      SELECT * FROM presentation
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
    Client_Role,
    Sname,
    SAddress,
    SDname
  } = request.body;

  try{
    const schools = await sql`
      INSERT INTO School (Sname, Address, SDname) VALUES (${Sname}, ${SAddress}, ${SDname})
      `;
  } catch (err) {
    //this means the school already exists, so just continue
  }

  try{
  const client = await sql`
    INSERT INTO Client (Email, Client_Role, Sname) VALUES (${CEmail}, ${Client_Role}, ${Sname})
    `;
  } catch (err) {
    //this means the client already exists, so just continue
  }

  const result = await sql`
    INSERT INTO presentation_booking (CEmail, Presentation_Date, Presentation_Time, Location_In_School, 
        Presentation, Number_Of_Student, Student_Grade, Duration_In_Minutes,
        Can_Class_Use_Kahoot, Notes, Executive_Confirmation) VALUES (${CEmail}, ${Presentation_Date}, 
            ${Presentation_Time}, ${Location_In_School}, ${Presentation}, ${Number_Of_Student}, 
            ${Student_Grade}, ${Duration_In_Minutes}, ${Can_Class_Use_Kahoot}, ${Notes}, ${Executive_Confirmation})
    `;
  response.status(200).json(result);
};

const deletePresentationBooking = async (request, response) => {
  const { CEmail, Presentation_Date, Presentation_Time, Location_In_School } = request.body;

  const deletePresents = await sql`
    DELETE FROM presents
    WHERE (CEmail = ${CEmail} AND Presentation_Date = ${Presentation_Date} AND Presentation_Time = ${Presentation_Time} AND Location_In_School = ${Location_In_School})
    `;
  
  const result = await sql`
    DELETE FROM presentation_booking 
    WHERE (CEmail = ${CEmail} AND Presentation_Date = ${Presentation_Date} AND Presentation_Time = ${Presentation_Time} AND Location_In_School = ${Location_In_School})
    `;
  response.status(200).json(result);
};

const createPresents = async (request, response) => {
  const {CEmail, Date, Time, Location_In_School, Volunteer_email} = request.body;

  const result = await sql`
    INSERT INTO Presents (CEmail, Presentation_Date, Presentation_Time, Location_In_School, Volunteer_email) 
    VALUES (${CEmail}, ${Date}, ${Time}, ${Location_In_School}, ${Volunteer_email})
    `;
    response.status(200).json(result);
};

const deletePresents = async (request, response) => {
  const {CEmail, Date, Time, Location_In_School, Volunteer_email} = request.body;

  const result = await sql`
    DELETE FROM Presents WHERE (CEmail = ${CEmail} AND Presentation_Date = ${Date} AND Presentation_Time = ${Time} 
      AND Location_In_School = ${Location_In_School} AND Volunteer_email = ${Volunteer_email})
    `;
    response.status(200).json(result);
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
    Hours_volunteer, 
    is_RED_Executive, 
    position, 
    Uname
  } = request.body;

  const result = await sql`
    INSERT INTO red_staff (Email, Fname, Lname, Uni_ID, Faculty, Join_Date, is_RED_volunteer, Hours_volunteer, is_RED_Executive, position, Uname)
    VALUES (${Email}, ${Fname}, ${Lname}, ${Uni_ID}, ${Faculty}, ${Join_Date}, ${is_RED_volunteer}, ${Hours_volunteer}, ${is_RED_Executive}, ${position}, ${Uname})
    `;
  response.status(200).json(result);
};

const createTrains = async (request, response) => {
  const {
    Volunteer_email,
    Executive_email
  } = request.body;

  const result = await sql`
    INSERT INTO trains (Volunteer_email, Executive_email)
    VALUES (${Volunteer_email}, ${Executive_email})
    `;
  response.status(200).json(result);
};

const createMakes = async (request, response) => {
  const {
    Email,
    Pname
  } = request.body;

  const result = await sql`
    INSERT INTO makes (Email, Pname)
    VALUES (${Email}, ${Pname})
    `;
  response.status(200).json(result);
};


module.exports = {
  GetAllPresentations,
  GetConfirmedPresentations,
  GetUnconfirmedPresentations,
  GetExecutives,
  GetPresentation,
  createPresentationBooking,
  deletePresentationBooking,
  createPresents,
  deletePresents,
  createRedStaff,
  createTrains,
  createMakes
};
