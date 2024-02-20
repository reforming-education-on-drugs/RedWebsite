CREATE DATABASE red;
-- creaing the tables and restraints
CREATE TABLE RED_staff
    (
    Email varchar(255) PRIMARY KEY,
    Fname varchar(255) Not null,
    Lname varchar(255) Not null,
    Uni_ID int Not null unique,
    Faculty varchar(255) Not null,
    Join_Date varchar(255) Not null,
    is_RED_volunteer boolean Not null,
    is_Trained boolean,
    is_RED_Executive boolean Not null,
    position varchar(255),
    Cname varchar(255),
    Uname varchar(255)
    );

CREATE TABLE School
    (
        SName varchar(255) PRIMARY KEY,
        Address varchar(255) Not null,
        SDname varchar(255),
        City_Name varchar(255)
    );

CREATE TABLE Presentation_Booking
    (
        CEmail varchar(255),
        Cname varchar(255),
        Presentation_Date varchar(255),
        Presentation_Time varchar(255),
        School_Name varchar(255),
        Location_In_School varchar(255),
        Presentation varchar(255),
        Number_Of_Student int Not null,
        Student_Grade varchar(255) Not null,
        Duration_In_Minutes int Not null,
        Can_Class_Use_Kahoot boolean DEFAULT false,
        Notes varchar(255),
        Executive_Confirmation boolean DEFAULT FALSE,
        PRIMARY KEY (School_Name, Presentation_Date, Presentation_Time, Location_In_School)
    );

CREATE TABLE Presents
    (
        School_Name varchar(255),
        Presentation_Date varchar(255),
        Presentation_Time varchar(255),
        Location_In_School varchar(255),
        Volunteer_Email varchar(255),
        PRIMARY KEY (School_Name, Presentation_Date, Presentation_Time, Location_In_School, Volunteer_Email)
    );

ALTER TABLE Presentation_Booking ADD FOREIGN KEY (School_Name) REFERENCES School(SName);

ALTER TABLE Presents ADD FOREIGN KEY (School_Name, Presentation_Date, Presentation_Time, Location_In_School) REFERENCES Presentation_Booking(School_Name, Presentation_Date, Presentation_Time, Location_In_School);
ALTER TABLE Presents ADD FOREIGN KEY (Volunteer_Email) REFERENCES RED_staff(Email);


-- test values to initialize the database
INSERT INTO School (SName, Address, SDname, City_Name)
VALUES ('School1', '123 Main St', 'School District 1', 'City1'),
       ('School2', '456 Elm St', 'School District 2', 'City2');

INSERT INTO RED_staff (Email, Fname, Lname, Uni_ID, Faculty, Join_Date, is_RED_volunteer, is_Trained, is_RED_Executive, position, Cname, Uname)
VALUES ('john@example.com', 'John', 'Doe', 123456, 'Computer Science', '2022-01-01', true, true, true, 'Executive', 'City1', 'University of Toronto'),
       ('jane@example.com', 'Jane', 'Smith', 654321, 'Business Administration', '2022-02-01', true, false, false, 'Volunteer', 'City2', 'University of Calgary');

INSERT INTO Presentation_Booking (CEmail, Cname, Presentation_Date, Presentation_Time, School_Name, Location_In_School, Presentation, Number_Of_Student, Student_Grade, Duration_In_Minutes, Can_Class_Use_Kahoot, Notes, Executive_Confirmation)
VALUES ('john@example.com', 'City1', '2022-03-01', '09:00', 'School1', 'Auditorium', 'Introduction to RED', 50, 'Grade 10', 60, true, 'Please bring laptops', true),
       ('jane@example.com', 'City2', '2022-04-01', '10:30', 'School2', 'Gymnasium', 'RED Safety Presentation', 100, 'Grade 8', 45, false, 'No special requirements', false);

INSERT INTO Presents (School_Name, Presentation_Date, Presentation_Time, Location_In_School, Volunteer_Email)
VALUES ('School1', '2022-03-01', '09:00', 'Auditorium', 'john@example.com'),
       ('School2', '2022-04-01', '10:30', 'Gymnasium', 'jane@example.com');
