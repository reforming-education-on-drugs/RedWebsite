require('google-spreadsheet');
const { promisify } = require('util');

const{ successResponse,errorResponse,authenticate,getSheetByName,convertTime,timeIsEqual} = require("./presentationUtil");


exports.handler = function(event, context, callback) {
  console.log('START: Received request.');

  savePresentation(JSON.parse(event.body))
    .then(response => successResponse(callback,response))
    .catch(error => errorResponse(callback, error));
};

// let payload = require("./payload.json")
// savePresentation(payload)
//   .then(response => successResponse(function (){},response))
//   .catch(error => errorResponse(function (){}, error));


function overlap(data){


  //Get the times they signed up for
  let timeRanges = data.map(presentation =>
    presentation.times
      .filter(time => time.selected)
      .map(time => {
          return {
            presentation:presentation.name,
            startTime: new Date(presentation.date + "T" + time.startTime),
            endTime: new Date(presentation.date + "T" + time.endTime)
          };
        }
      )
   );
  timeRanges = [].concat(...timeRanges) //Flatten the arrays

  //Sort them

  let sorted = timeRanges.sort((previous,current) =>
    {
      //If the previous start time is smaller.
      if (previous.startTime < current.startTime) {
        return -1;
      }

      //If start times match
      if (previous.startTime === current.startTime) {
        return 0;
      }

      //If not the two above cases
      return 1;
    }
  );

  let result = sorted.reduce((result, current, idx, arr) => {
    // get the previous range
    if (idx === 0) { return result; }
    var previous = arr[idx-1];

    // check for any overlap
    var overlap = (previous.endTime  > current.startTime);

    // store the result
    if (overlap) {
      // yes, there is overlap
      result.overlap = true;
      // store the specific ranges that overlap
      result.ranges.push({
        previous: previous,
        current: current
      })
    }

    return result;

    // seed the reduce
  }, {overlap: false, ranges: []});


  //If there is over lap throw error
  if(result.overlap){
    throw result;
  }


}

async function savePresentation(payload){

  let email = payload.user.email;
  let doc = await authenticate();


  //verify there are no conflicting times
  //Will through error if otherwise
  overlap(payload.data);


  for (let presentation of payload.data){
    let timeSheet = await getSheetByName(doc,presentation.sheetname);
    let timeRows = await promisify(timeSheet.getRows)({
        offset: 1,
        limit: 100,
      });


    //verify that the times match between the data and the spread sheet, they also must be in order
    for (let i=0; i < timeRows.length; i++){
      if(presentation.times[i].startTime !== timeRows[i].starttime){
        throw "The times from presentation "+ presentation.name +" don't match the payload";
      }
    }


    for (let i = 0;i < timeRows.length;i++){
      let timeRow = timeRows[i];
      //see if there is mismatch
      if(! timeIsEqual(convertTime(timeRow,email),presentation.times[i])){

        let volunteers = timeRow.volunteers === ""? [] : timeRow.volunteers.split(",");

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
  return "Values have been verified and saved to the database";
}
