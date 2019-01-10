const { promisify } = require('util');
const {successResponse, errorResponse,authenticate,getSheetByName,convertPresentation,convertTime} = require('./presentationUtil');

exports.handler = function(event, context, callback) {
  console.log('START: Received request.');

  getPresentationForEmail(JSON.parse(event.body).user.email)
    .then(response => successResponse(callback,response))
    .catch(error => errorResponse(callback, error));
};


// getPresentationForEmail("kouroshb26@gmail.com")
//   .then(response => successResponse(function(){},response))
//   .catch(error => errorResponse(function(){}, error));




async function getPresentationForEmail(email){
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
        presentation.times.push(convertTime(timeRow,email));
      }

      response.data.push(presentation);
    }
    return response;


}

