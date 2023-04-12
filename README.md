# RedWebsite 471 Final project

## Setup

To get started, first clone the repo and checkout booking brach: <br />

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

This should run both the backend and the frontend, and it will spit out a URL once it is done. This URL should be [localhost:3000](localhost:3000), and you can go to this URL to view the website

## Navigating the Website

### Create Presentation

---

To book a presentation, you can click the "For Schools" tab at the top of the website, and this will take you to a form that when filled out will enter a presentation to the database.

### View and Sign up for Presentation

---

To view and sign up for presentations, you can click the "Login" tab at the top of the website. Since only the Red Staff who have been trained are allowed to be entered in the database and look at available presentations, we need to use preset credentials. You can use these credentials to log in as a volunteer Red staff:

```
Email: rkthemainburner@gmail.com
Password: 1234
```

Once logged in, you should be able to see all the presentations in the database, and you can sign up by clicking the box under status, and then clicking "Sign up for presentation" button. To cancel a presentation, you can simply uncheck the box and click on the "Sign up for presentation" button

### Edit and Delete Presentations as an Executive

---

The account credentials given above also have executive permissions, and you can use these permissions by clicking the "Executive" tab at the top of the website and clicking "Manage Bookings". Once in the manage booking tab, you can edit and delete presentations, and then press confirm so that the changes are pushed to the database.

## Backend Code

All the code that communicates with the database can be seen in the `/backend/queries.js` file.
