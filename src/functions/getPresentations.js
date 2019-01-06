let GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const {spread_sheet_id , client_email, private_key } = process.env;


function errorResponse(callback, err) {
  console.error('END: Error response.');
  console.error(err);

  callback(null, {
    statusCode: 500,
    body: JSON.stringify({ error: err })
  });
};

function successResponse(callback, res) {
  console.log('END: Success response.');

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(res)
  });
};



async function authenticate() {

  const creds = {client_email,private_key};
  const doc = new GoogleSpreadsheet(spread_sheet_id);
  await promisify(doc.useServiceAccountAuth)(creds);
  return doc;
}

async function getSheetByName(doc, name){
  let info = await promisify(doc.getInfo)();
  return info.worksheets.filter(function(worksheet){return name === worksheet.title})[0]
}

exports.handler = function(event, context, callback) {
  console.log('START: Received request.');
  getPresentationForEmail("kouroshb26@gmail.com",callback)
}

async function getPresentationForEmail(email,callback){

  let response = { "user":{"email":email},
    "data":[]};

  let doc = await authenticate();
  let presentationSheet = await getSheetByName(doc,"Presentation");


  let presentations =  await promisify(presentationSheet.getRows)({
    offset: 1,
    limit: 100,
  });


  //Todo get today's date to make sure the presentations are after today's date
  for (let presentationRow of presentations){
    if(presentationRow.name === "" || presentationRow.name === null ){
      continue;
    }


    let timeSheet = await getSheetByName(doc,presentationRow.sheetname);
    let times = await promisify(timeSheet.getRows)({
      offset:1,
      limit:100,
    });


    let presentation = convertPresentation(presentationRow)

    for (let timeRow of times){
      presentation.times.push(convertTime(timeRow));
    }

    response.data.push(presentation);
  }
  console.log(response)

  console.log("Example of times");
  console.log(response.data[0].times);
  console.log(response.data[1].times);
  console.log(response.data[2].times);

  successResponse(callback,response);

}

function convertPresentation(presentationRow){
  let presentation = new Object();
  presentation.name = presentationRow.name;
  presentation.address = presentationRow.address;
  presentation.date = presentationRow.date;
  presentation.times = [];
  return presentation;
}

function convertTime(timeRow,email){
  let time = new Object();
  time.startTime = timeRow.starttime;
  time.endtime = timeRow.endtime;
  time.capacity = timeRow.capacity;
  time.selected = false; // Will be reset if the user is inside
  for (let user of timeRow.volunteers.split(",")){
    if (email === user){
      time.selected = true;
      break;
    }
  }
  return time;
}



// function setPresentationDetailsForEmail(email){
//   //validate times
//
//   //Go through each presentation
//
//     //Go through each time,
//     //If enabled
//       //Check to see if they are there, if not add
//
//     //If disabled, remove them
//
//
// }
