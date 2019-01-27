require('google-spreadsheet');
const { promisify } = require('util');

const{ successResponse,errorResponse,authenticate,getSheetByName,convertTime,timeIsEqual} = require("./presentationUtil");


exports.handler = function(event, context, callback) {
  console.log('START: Received request.');
  savePresentation(JSON.parse(event.body))
    .then(response => successResponse(callback,response))
    .catch(error => errorResponse(callback, error));
};

//Curl command for testing
//curl --header "Content-Type: application/json" --request POST --data @payload.json localhost:9000/getPresentations
// let payload = require("./payload.json")
// savePresentation(payload)
//   .then(response => successResponse(function (){},response))
//   .catch(error => errorResponse(function (){}, error));


function overlap(data){

  //Get the times they signed up for
  let timeRanges = data.map(presentation =>  //Get one presentation
    presentation.times // Takes its times
      .filter(time => time.selected) //Selected only ones that user has selected
      .map(time => {  //Transform them to time ranges
          return {
            presentation:presentation.name,
            startTime: new Date(presentation.date + "T" + time.startTime),
            endTime: new Date(presentation.date + "T" + time.endTime)
          };
        }
      )
   );
  timeRanges = [].concat(...timeRanges);//Flatten the arrays

  let result = timeRanges.sort((previous,current) => previous.startTime - current.startTime)  // sort the times
    .reduce((result, current, idx, arr) => {  //Find time conflicts
      if (idx === 0) { return result; }
      let previous = arr[idx-1]; // get the previous time

      // check for any overlap
      let overlap = (previous.endTime  > current.startTime);

      // store the result
      if (overlap) {
        result.overlap = true;
        // store the specific ranges that overlap
        result.ranges.push({
          previous: previous,
          current: current
        });
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
  overlap(payload.data);


  for (let presentation of payload.data){
    let timeSheet = await getSheetByName(doc,presentation.sheetname);
    let timeRows = await promisify(timeSheet.getRows)({
        offset: 1,
        limit: 100,
      });


    //verify that the times match between the data and the spread sheet, they also must be in order
    for (let i=0; i < timeRows.length; i++){
      if(presentation.times[i].startTime !== timeRows[i].starttime || presentation.times[i].endTime !== timeRows[i].endtime){
        presentation.times[i].error = "The times "+presentation.times[i].startTime+"-"+presentation.times[i].endTime+
          "don't match out records of "+timeRows[i].starttime+"-"+timeRows[i].endtime;
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

          await promisify(timeRow.save)();
        }
        //If they don't have it selected, but they are on the google drive sheet
        else if( ! presentation.times[i].selected && volunteers.indexOf(email) > -1){
          volunteers = volunteers.filter(volunteer => volunteer !== email);
          timeRow.volunteers = volunteers.join(",");

          await promisify(timeRow.save)();
        }
      }

    }

  }
  return "Values have been verified and saved to the database";
}
