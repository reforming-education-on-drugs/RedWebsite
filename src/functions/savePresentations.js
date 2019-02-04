/* eslint-disable no-console */
require('google-spreadsheet');
const { promisify } = require('util');
const Moment = require('moment');
const{
  successResponse,
  errorResponse,
  authenticate,
  getSheetByName,
  convertTime,
  update
} = require('./presentationUtil');

exports.handler = function(event, context, callback) {
  console.log('START: Received request.');

  if (context.clientContext && context.clientContext.user && context.clientContext.user.email) {
    savePresentation(JSON.parse(event.body), context.clientContext.user.email)
      .then(response => successResponse(callback, response))
      .catch(error => errorResponse(callback, error));
  }
  else{
    errorResponse(callback, 'Unauthorized request. Please login in.');
  }
};

//Curl command for testing
//curl --header 'Content-Type: application/json' --request POST --data @@src/functions/payload.json localhost:9000/savePresentations
// let payload = require('./payload.json');
// savePresentation(payload,'kourosh@ucalgary.ca')
//   .then(response => successResponse(function (){},response))
//   .catch(error => errorResponse(function (){}, error));


function overlap(data) {

  //Get the times they signed up for
  let timeRanges = data.map(presentation =>  //Get one presentation
    presentation
      .times // Takes its times
      .filter(time => time.selected) //Selected only ones that user has selected
      .map(time => {  //Transform them to time ranges
        return {
          presentation: presentation.name,
          time: time,
          startTime: new Date(presentation.date + 'T' + time.startTime),
          endTime: new Date(presentation.date + 'T' + time.endTime)
        };
      })
    );
  
  timeRanges = [].concat(...timeRanges); //Flatten the arrays

  timeRanges
    .sort((previous, current) => previous.startTime - current.startTime)  // sort the times
    .forEach((current, idx, arr) => {  //Find time conflicts
      if (idx === 0) return;
      const previous = arr[idx-1]; // get the previous time

      // store the result
      if (previous.endTime > current.startTime) {

        previous.time.error = `The time conflicts with presentation ${current.presentation} at ${Moment(current.startTime).format('YYYY-MM-DD h:mm a')}`;
        current.time.error = `The time conflicts with presentation ${previous.presentation} at ${Moment(previous.startTime).format('YYYY-MM-DD h:mm a')}`;
      }// seed the reduce
    });

}

async function savePresentation(presentations, email) {
  const doc = await authenticate();

  //Remove all errors
  presentations.forEach(presentation => presentation.times.forEach(time => time.error = undefined));

  //verify there are no conflicting times
  overlap(presentations);

  for (let presentation of presentations) {
    let timeSheet = await getSheetByName(doc, presentation.sheetname);
    let timeRows = await promisify(timeSheet.getRows)({
      offset: 1,
      limit: 100,
    });

    for (let i = 0; i < timeRows.length; i++) {
      let dbTime = convertTime(timeRows[i], email);
      let userTime = presentation.times[i];   //Time given by the user
      let volunteers = timeRows[i].volunteers === '' ? [] : timeRows[i].volunteers.split(',');

      //verify that the times match between the data and the spread sheet, they also must be in order
      if (userTime.startTime !== dbTime.startTime || userTime.endTime !== dbTime.endTime) {
        userTime.error = `The times ${userTime.startTime}-${userTime.endTime} don't match out records of ${dbTime.startTime}-${dbTime.endTime}`;

        //Update the times
        update(userTime, dbTime);
        continue;
      }

      //If there is errors from time conflicts just skip
      if (userTime.error !== undefined) {
        //Update the times
        update(userTime, dbTime);
        continue;
      }

      if (userTime.selected !== dbTime.selected) { //If there is a difference between our user data and database data

        //If they have it selected, but are not on the google drive sheet and there is room for them to be added
        if (userTime.selected && dbTime.capacity > volunteers.length) {
          volunteers.push(email);
          timeRows[i].volunteers = volunteers.join(',');
          timeRows[i].save();
          userTime.error= '';
        }
        //If they don't have it selected, but they are on the google drive sheet
        else if (!userTime.selected) {
          volunteers = volunteers.filter(volunteer => volunteer !== email);
          timeRows[i].volunteers = volunteers.join(',');
          timeRows[i].save();
          userTime.error= '';
        }
        //When the presentation is full
        else {
          //Update the times
          update(userTime, dbTime);
          userTime.error= 'Could not sign up for presentations as the presentation is full';
        }
      }
      else { //Everything is up to date
        userTime.error= '';
      }
    }
  }

  return presentations;
}
