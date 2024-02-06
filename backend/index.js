const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./queries");
const port = 9000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/presentation_booking", db.GetAllPresentations);
app.get("/presentation_booking/confirmed", db.GetConfirmedPresentations);
app.get("/presentation_booking/unconfirmed", db.GetUnconfirmedPresentations);
app.get("/executives", db.GetExecutives);
app.post("/presentation_booking", db.createPresentationBooking);
app.delete("/presentation_booking", db.deletePresentationBooking);
app.post("/presents", db.createPresents);
app.delete("/presents", db.deletePresents);
app.post("/red_staff", db.createRedStaff);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
