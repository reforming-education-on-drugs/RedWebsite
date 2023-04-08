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
    Hours_volunteer int,
    is_RED_Executive boolean Not null,
    position varchar(255),
    Uname varchar(255)
    );

CREATE TABLE University
    (
        Uname varchar(255) PRIMARY KEY,
        CName varchar(255)
    );

ALTER TABLE RED_staff ADD FOREIGN KEY (Uname) REFERENCES University(Uname);

CREATE TABLE School
    (
        SName varchar(255) PRIMARY KEY,
        Address varchar(255) Not null,
        SDname varchar(255)
    );

CREATE TABLE Trains
    (
        Volunteer_Email varchar(255),
        Executive_Email varchar(255)
    );

ALTER TABLE Trains ADD FOREIGN KEY (Volunteer_Email) REFERENCES RED_staff(Email);
ALTER TABLE Trains ADD FOREIGN KEY (Executive_Email) REFERENCES RED_staff(Email);

CREATE TABLE City
    (
        CName varchar(255) PRIMARY KEY
    );

ALTER TABLE University ADD FOREIGN KEY (CName) REFERENCES City(CName);

CREATE TABLE School_District
    (
        SDName varchar(255) PRIMARY KEY,
        Presentation_Permission_Status boolean Not null,
        CName varchar(255)
    );

ALTER TABLE School_District ADD FOREIGN KEY (CName) REFERENCES city(CName);
ALTER TABLE School ADD FOREIGN KEY (SDName) REFERENCES School_District(SDName);

CREATE TABLE Client
    (
        Email varchar(255) PRIMARY KEY,
        Clinet_Role varchar(255),
        Sname varchar(255)
    );

ALTER TABLE Client ADD FOREIGN KEY (Sname) REFERENCES School(Sname);

CREATE TABLE Presentation_Booking
    (
        CEmail varchar(255) unique,
        Presentation_Date varchar(255) unique,
        Presentation_Time varchar(255) unique,
        Location_In_School varchar(255) unique,
        School varchar(255),
        Presentation varchar(255),
        Number_Of_Student int Not null,
        Student_Grade int Not null,
        Duration_In_Minutes int Not null,
        Can_Class_Use_Kahoot boolean DEFAULT false,
        Notes varchar(255),
        Executive_Confirmation boolean DEFAULT FALSE
    );

ALTER TABLE Presentation_Booking ADD PRIMARY KEY (Presentation_Date, Presentation_Time, Location_In_School);

ALTER TABLE Presentation_Booking ADD FOREIGN KEY (CEmail) REFERENCES Client(Email);
ALTER TABLE Presentation_Booking ADD FOREIGN KEY (School) REFERENCES School(SName);

CREATE TABLE Presents
    (
        CEmail varchar(255),
        Presentation_Date varchar(255),
        Presentation_Time varchar(255),
        Location_In_School varchar(255),
        Volunteer_Email varchar(255)
    );

ALTER TABLE Presents ADD FOREIGN KEY (CEmail) REFERENCES Presentation_Booking(CEmail);
ALTER TABLE Presents ADD FOREIGN KEY (Presentation_Date) REFERENCES Presentation_Booking(Presentation_Date);
ALTER TABLE Presents ADD FOREIGN KEY (Presentation_Time) REFERENCES Presentation_Booking(Presentation_Time);
ALTER TABLE Presents ADD FOREIGN KEY (Location_In_School) REFERENCES Presentation_Booking(Location_In_School);
ALTER TABLE presents ADD FOREIGN KEY (Volunteer_Email) REFERENCES RED_staff(Email);

CREATE TABLE Presentation
    (
        PName Varchar(255) PRIMARY KEY    
    );

ALTER TABLE Presentation_Booking ADD FOREIGN KEY (Presentation) REFERENCES Presentation(Pname);

CREATE TABLE Makes
    (
        Email Varchar(255),
        PName varchar(255)
    );

ALTER TABLE Makes ADD FOREIGN KEY (Email) REFERENCES RED_staff(Email);
ALTER TABLE Makes ADD FOREIGN KEY (PName) REFERENCES Presentation(PName);

-- test values to initialze the databse
INSERT INTO city VALUES('Calgary');

INSERT INTO University (Uname, CName) VALUES ('University of Calgary', 'Calgary');

INSERT INTO School_District (SDName, Presentation_Permission_Status, CName) 
VALUES ('Calgary Catholic School District', TRUE, 'Calgary'), ('Calgary Board of Education', TRUE, 'Calgary');

INSERT INTO Presentation VALUES ('Drug Overview'), ('Fentanyl'), ('Cannabis'), ('Vaccine'), ('Mental Health');