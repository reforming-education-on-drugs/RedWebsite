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

app.get("/presentations", db.GetAllPresentations);
app.get("/presentations/confirmed", db.GetConfirmedPresentations);
app.get("/presentations/unconfirmed", db.GetUnconfirmedPresentations);
app.get("/executives", db.GetExecutives);
app.post("/presentations", db.createPresentationBooking);
app.delete("/presentations", db.deletePresentationBooking);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
