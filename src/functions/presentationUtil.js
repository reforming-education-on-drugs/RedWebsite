let GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
require('dotenv').config();


const {spread_sheet_id , client_email, private_key } = process.env;

export function errorResponse(callback, err) {
  console.error('END: Error response.');
  console.error(err);

  callback(null, {
    statusCode: 500,
    body: JSON.stringify({ error: err })
  });
}

export function successResponse(callback, res) {
  console.log('END: Success response.');
  console.log("Returning data:",res);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(res)
  });
}

export async function authenticate() {
  const creds = {client_email,private_key};
  const doc = new GoogleSpreadsheet(spread_sheet_id);
  await promisify(doc.useServiceAccountAuth)(creds);
  return doc;
}

export async function getSheetByName(doc, name){
  let info = await promisify(doc.getInfo)();
  return info.worksheets.filter(function(worksheet){return name === worksheet.title})[0]
}

export function convertPresentation(presentationRow){
  return {
    name: presentationRow.name,
    address: presentationRow.address,
    date: presentationRow.date,
    sheetname: presentationRow.sheetname,
    times: [],
  };
}

export function timeIsEqual(a,b){
  return a.startTime === b.startTime &&
    a.endTime === b.endTime &&
    a.capacity === b.capacity &&
    a.selected === b.selected;
}

export function convertTime(timeRow,email){
  let time = {
    startTime: timeRow.starttime,
    endTime: timeRow.endtime,
    capacity: timeRow.capacity,
    selected: false, // Will be reset if the user is inside
  };

  for (let user of timeRow.volunteers.split(",")){
    if (email === user){
      time.selected = true;
      break;
    }
  }
  return time;
}
