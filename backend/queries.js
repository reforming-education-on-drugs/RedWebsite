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
  const all = await sql`
    SELECT * 
    FROM presentation_booking, Client, School
    WHERE presentation_booking.CEmail = Client.Email AND Client.Sname = School.Sname
  `;
  const result = await sql`
    SELECT * 
    FROM presentation_booking, Client, School, Presents
    WHERE presentation_booking.CEmail = Client.Email AND Client.Sname = School.Sname
    AND presentation_booking.CEmail = Presents.CEmail AND presentation_booking.Presentation_Date = Presents.Presentation_Date
    AND presentation_booking.Presentation_Time = Presents.Presentation_Time AND presentation_booking.Location_In_School = Presents.Location_In_School
  `;
  try {
    const resultArray = all.map((item) => {
      const matchingItems = result.filter(
        (obj) =>
          obj.cemail === item.cemail &&
          obj.presentation_date === item.presentation_date &&
          item.presentation_time === obj.presentation_time &&
          item.location_in_school === obj.location_in_school
      );
      return {
        cemail: item.cemail,
        presentation_date: item.presentation_date,
        presentation_time: item.presentation_time,
        location_in_school: item.location_in_school,
        presentation: item.presentation,
        number_of_student: item.number_of_student,
        student_grade: item.student_grade,
        duration_in_minutes: item.duration_in_minutes,
        can_class_use_kahoot: item.can_class_use_kahoot,
        notes: item.notes,
        executive_confirmation: item.executive_confirmation,
        email: item.email,
        cname: item.name,
        phone_number: item.phone_number,
        client_role: item.client_role,
        sname: item.sname,
        address: item.address,
        sdname: item.sdname,
        capacity: item.capacity,
        signups: matchingItems.map((obj) => obj.volunteer_email),
      };
    });

    response.status(200).json(resultArray);
  } catch (error) {
    response.status(200).json("No presentations found");
  }
};

const GetConfirmedPresentations = async (request, response) => {
  const all = await sql`
    SELECT * 
    FROM presentation_booking, Client, School
    WHERE presentation_booking.CEmail = Client.Email AND Client.Sname = School.Sname AND executive_confirmation = TRUE
  `;
  const result = await sql`
      SELECT * 
      FROM presentation_booking, Client, School, Presents
      WHERE presentation_booking.CEmail = Client.Email AND Client.Sname = School.Sname
      AND presentation_booking.CEmail = Presents.CEmail AND presentation_booking.Presentation_Date = Presents.Presentation_Date
      AND presentation_booking.Presentation_Time = Presents.Presentation_Time AND presentation_booking.Location_In_School = Presents.Location_In_School
      AND executive_confirmation = TRUE
    `;
  try {
    const resultArray = all.map((item) => {
      const matchingItems = result.filter(
        (obj) =>
          obj.cemail === item.cemail &&
          obj.presentation_date === item.presentation_date &&
          item.presentation_time === obj.presentation_time &&
          item.location_in_school === obj.location_in_school
      );
      return {
        cemail: item.cemail,
        presentation_date: item.presentation_date,
        presentation_time: item.presentation_time,
        location_in_school: item.location_in_school,
        presentation: item.presentation,
        number_of_student: item.number_of_student,
        student_grade: item.student_grade,
        duration_in_minutes: item.duration_in_minutes,
        can_class_use_kahoot: item.can_class_use_kahoot,
        notes: item.notes,
        executive_confirmation: item.executive_confirmation,
        email: item.email,
        cname: item.name,
        phone_number: item.phone_number,
        client_role: item.client_role,
        sname: item.sname,
        address: item.address,
        sdname: item.sdname,
        capacity: item.capacity,
        signups: matchingItems.map((obj) => obj.volunteer_email),
      };
    });

    response.status(200).json(resultArray);
  } catch (error) {
    response.status(200).json("No presentations found");
  }
};

const GetUnconfirmedPresentations = async (request, response) => {
  const all = await sql`
    SELECT * 
    FROM presentation_booking, Client, School
    WHERE presentation_booking.CEmail = Client.Email AND Client.Sname = School.Sname AND executive_confirmation = False
  `;
  const result = await sql`
      SELECT * 
      FROM presentation_booking, Client, School, Presents
      WHERE presentation_booking.CEmail = Client.Email AND Client.Sname = School.Sname
      AND presentation_booking.CEmail = Presents.CEmail AND presentation_booking.Presentation_Date = Presents.Presentation_Date
      AND presentation_booking.Presentation_Time = Presents.Presentation_Time AND presentation_booking.Location_In_School = Presents.Location_In_School
      AND executive_confirmation = False
    `;
  try {
    const resultArray = all.map((item) => {
      const matchingItems = result.filter(
        (obj) =>
          obj.cemail === item.cemail &&
          obj.presentation_date === item.presentation_date &&
          item.presentation_time === obj.presentation_time &&
          item.location_in_school === obj.location_in_school
      );
      return {
        cemail: item.cemail,
        presentation_date: item.presentation_date,
        presentation_time: item.presentation_time,
        location_in_school: item.location_in_school,
        presentation: item.presentation,
        number_of_student: item.number_of_student,
        student_grade: item.student_grade,
        duration_in_minutes: item.duration_in_minutes,
        can_class_use_kahoot: item.can_class_use_kahoot,
        notes: item.notes,
        executive_confirmation: item.executive_confirmation,
        email: item.email,
        cname: item.name,
        phone_number: item.phone_number,
        client_role: item.client_role,
        sname: item.sname,
        address: item.address,
        sdname: item.sdname,
        capacity: item.capacity,
        signups: matchingItems.map((obj) => obj.volunteer_email),
      };
    });

    response.status(200).json(resultArray);
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
    Cname,
    Cphonenumber,
    Sname,
    SAddress,
    SDname,
    capacity,
  } = request.body;

  try {
    const schools = await sql`
      INSERT INTO School (Sname, Address, SDname) VALUES (${Sname}, ${SAddress}, ${SDname})
      `;
  } catch (err) {
    //this means the school already exists, so just continue
  }

  try {
    const client = await sql`
      INSERT INTO Client (Email, Clinet_Role, Sname, name, Phone_Number) VALUES (${CEmail}, ${Client_Role}, ${Sname}, ${Cname}, ${Cphonenumber})
      `;
  } catch (err) {
    //this means the school already exists, so just continue
  }

   const result = await sql`
    INSERT INTO presentation_booking (CEmail, Presentation_Date, Presentation_Time, Location_In_School, 
        Presentation, Number_Of_Student, Student_Grade, Duration_In_Minutes,
        Can_Class_Use_Kahoot, Notes, Executive_Confirmation, capacity) VALUES (${CEmail}, ${Presentation_Date}, 
            ${Presentation_Time}, ${Location_In_School}, ${Presentation}, ${Number_Of_Student}, 
            ${Student_Grade}, ${Duration_In_Minutes}, ${Can_Class_Use_Kahoot}, ${Notes}, ${Executive_Confirmation} , ${capacity})
    `;
  response.status(200).json(result);
};

const deletePresentationBooking = async (request, response) => {
  const { CEmail, Presentation_Date, Presentation_Time, Location_In_School } =
    request.body.deleteInfo;
  console.log(request.body);
  try {
    const deletePresents = await sql`
    DELETE FROM presents
    WHERE (CEmail = ${CEmail} AND Presentation_Date = ${Presentation_Date} AND Presentation_Time = ${Presentation_Time} AND Location_In_School = ${Location_In_School})
    `;
  } catch (err) {
    console.log(err);
  }
  try {
    const result = await sql`
    DELETE FROM presentation_booking 
    WHERE (CEmail = ${CEmail} AND Presentation_Date = ${Presentation_Date} AND Presentation_Time = ${Presentation_Time} AND Location_In_School = ${Location_In_School})
    `;
    response.status(200).json(result);
  } catch (err) {
    response.status(200).json("No presentations found");
  }
};

const createPresents = async (request, response) => {
  const { CEmail, Date, Time, Location_In_School, Volunteer_email } =
    request.body;

  console.log({ CEmail, Date, Time, Location_In_School, Volunteer_email });

  try {
    const result = await sql`
    INSERT INTO Presents (CEmail, Presentation_Date, Presentation_Time, Location_In_School, Volunteer_email) 
    VALUES (${CEmail}, ${Date}, ${Time}, ${Location_In_School}, ${Volunteer_email})
    `;
    response.status(200).json(result);
  } catch (err) {
    response.status(200).json(err);
  }
};

const deletePresents = async (request, response) => {
  const { CEmail, Date, Time, Location_In_School, Volunteer_email } =
    request.body;
  console.log({ CEmail, Date, Time, Location_In_School, Volunteer_email });

  try {
    const result = await sql`
    DELETE FROM Presents WHERE (CEmail = ${CEmail} AND Presentation_Date = ${Date} AND Presentation_Time = ${Time} 
      AND Location_In_School = ${Location_In_School} AND Volunteer_email = ${Volunteer_email})
    `;
    response.status(200).json(result);
  } catch (err) {
    response.status(200).json(err);
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
    Hours_volunteer,
    is_RED_Executive,
    position,
    Uname,
  } = request.body;

  const result = await sql`
    INSERT INTO red_staff (Email, Fname, Lname, Uni_ID, Faculty, Join_Date, is_RED_volunteer, Hours_volunteer, is_RED_Executive, position, Uname)
    VALUES (${Email}, ${Fname}, ${Lname}, ${Uni_ID}, ${Faculty}, ${Join_Date}, ${is_RED_volunteer}, ${Hours_volunteer}, ${is_RED_Executive}, ${position}, ${Uname})
    `;
  response.status(200).json(result);
};

const createTrains = async (request, response) => {
  const { Volunteer_email, Executive_email } = request.body;

  const result = await sql`
    INSERT INTO trains (Volunteer_email, Executive_email)
    VALUES (${Volunteer_email}, ${Executive_email})
    `;
  response.status(200).json(result);
};

const createMakes = async (request, response) => {
  const { Email, Pname } = request.body;

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
  createMakes,
};
