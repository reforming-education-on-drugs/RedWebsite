/* eslint-disable no-console */
const GoogleSpreadsheet = require("google-spreadsheet");
const { promisify } = require("util");
require("dotenv").config();
const {
  spread_sheet_id,
  client_email,
  private_key,
  local,
  testEmail,
} = process.env;

exports.errorResponse = function (callback, err) {
  console.error("END: Error response.");
  console.error(err);

  callback(null, {
    statusCode: 500,
    body: JSON.stringify({ error: err }),
  });
};

exports.successResponse = function (callback, res) {
  console.log("END: Success response.");
  console.log("Returning data:");
  console.log(JSON.stringify(res));

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(res),
  });
};

exports.authenticate = async function () {
  const privateKeyWithNewline = private_key.replace(/\\n/g, "\n"); //Fix environment variable

  const creds = {
    client_email,
    private_key: privateKeyWithNewline,
  };

  const doc = new GoogleSpreadsheet(spread_sheet_id);
  await promisify(doc.useServiceAccountAuth)(creds);

  return doc;
};

exports.getSheetByName = async function (doc, name) {
  const info = await promisify(doc.getInfo)();
  return info.worksheets.filter((worksheet) => name === worksheet.title)[0];
};

exports.convertPresentation = function (presentationRow) {
  return {
    name: presentationRow.name,
    address: presentationRow.address,
    date: presentationRow.date,
    sheetname: presentationRow.sheetname,
    type: presentationRow.type,
    times: [],
  };
};

exports.update = function (a, b) {
  a.startTime = b.startTime;
  a.endTime = b.endTime;
  a.enrolled = b.enrolled;
  a.capacity = b.capacity;
  a.selected = b.selected;
};

exports.convertTime = function (timeRow, email) {
  let volunteers =
    timeRow.volunteers === "" ? [] : timeRow.volunteers.split(",");
  let time = {
    startTime: timeRow.starttime,
    endTime: timeRow.endtime,
    enrolled: volunteers.length,
    capacity: parseInt(timeRow.capacity, 10),
    selected: false, // Will be reset if the user is inside
  };

  for (let user of volunteers) {
    if (email === user) {
      time.selected = true;
      break;
    }
  }

  return time;
};

exports.localContext = {
  clientContext: {
    user: {
      email: testEmail,
    },
  },
};

exports.isLocal = function () {
  return local === "true";
};
