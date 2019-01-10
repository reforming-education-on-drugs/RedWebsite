const { promisify } = require('util');

const{ successResponse,errorResponse,authenticate,getSheetByName,convertTime,timeIsEqual} = require("./presentationUtil");


exports.handler = function(event, context, callback) {
  console.log('START: Received request.');

  savePresentation(JSON.parse(event.body))
    .then(response => successResponse(callback,response))
    .catch(error => errorResponse(callback, error));
};

async function savePresentation(payload){

  let email = payload.user.email;
  let doc = await authenticate();


  //verify there are no conflicting times

  for (let presentation of payload.data){
    let timeSheet = await getSheetByName(doc,presentation.sheetname);
    let timeRows = await promisify(timeSheet.getRows)({
        offset: 1,
        limit: 100,
      });


    for (let i = 0;i < timeRows.length;i++){
      let timeRow = timeRows[i];
      //see if there is mismatch
      if(! _.isEqual(convertTime(timeRow,email),presentation.times[i])){

        //Get a list of volunteers
        let volunteers = timeRow.volunteers.split(",");

        //If they have it selected, but are not on the google drive sheet and there is room for them to be added
        if(presentation.times[i].selected && volunteers.indexOf(email) <= -1 && timeRow.capacity > volunteers.length){
          volunteers.push(email);
          timeRow.volunteers = volunteers.join(",");

          console.log("saved");
          await promisify(timeRow.save)();
        }
        //If they don't have it selected, but they are on the google drive sheet
        else if( ! presentation.times[i].selected && volunteers.indexOf(email) > -1){
          volunteers = volunteers.filter(volunteer => volunteer !== email);
          timeRow.volunteers = volunteers.join(",");

          console.log("saved");
          await promisify(timeRow.save)();
        }
      }

    }

  }
  return true;
}

