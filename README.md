# RedWebsite 471 Final project

## Setup

To get started, first install [node.js](https://nodejs.org/en/download), and then clone the repo and checkout booking brach: <br />

```
git clone https://github.com/reforming-education-on-drugs/RedWebsite
cd RedWebsite
git checkout BookingBackend
```

You then need to install npm dependencies and run the project, like so: <br />

```
npm i
npm start
```

alternatively, if you have the zip file, you can extract the zip file and then run the following commands

```
cd RedWebsite
npm i
npm start
```

This should run both the backend and the frontend, and it will spit out a URL once it is done. This URL should be [localhost:3000](localhost:3000), and you can go to this URL to view the website

## Navigating the Website

### Create Presentation

---

To book a presentation, you can click the "Book a presentation" tab at the top of the website, and this will take you to a form that when filled out will enter a presentation to the database.

### View and Sign up for Presentation for Volunteers

---

To view and sign up for presentations, you can click the "Login" tab at the top of the website. Since only the Red Staff who have been trained are allowed to be entered in the database and look at available presentations, we need to use preset credentials. You can use these credentials to log in as a volunteer Red staff:

```
Email: rkthemainburner@gmail.com
Password: 1234
```

Once logged in, you should be able to see all the presentations in the database, and you can sign up by clicking the box under status, and then clicking the "Sign up for presentation" button. To cancel a presentation, you can simply uncheck the box and click on the "Sign up for presentation" button

### Edit, Delete, and Confirm Presentations as an Executive

---

The account credentials given above also have executive permissions, and you can use these permissions by clicking the "Executive" tab at the top of the website and clicking "Manage Bookings". Once in the manage booking tab, you can edit, delete, and confirm presentations. Once presentations are confirmed, they become available for volunteers to sign up for, and they can no longer be edited or deleted.

## Backend Code

All the code that communicates with the database can be seen in the `/backend/queries.js` file.
