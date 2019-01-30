const { promisify } = require('util');
const {successResponse, errorResponse,authenticate,getSheetByName,convertPresentation,convertTime} = require('./presentationUtil');
// const fetch = require('node-fetch');

exports.handler = function(event, context, callback) {

  // let identity = { url: 'https://emailextraction--reducalgary.netlify.com/.netlify/identity',
  //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDg3NTQ2OTIsInN1YiI6IjAifQ.FyU86YXB3OViW26ZLdt1BTDM6jZM_oIDTWSnhfGrXHc' };
  // console.log(parseJwt(identity.token));
  // fetchUser(identity, parseJwt(identity.token).sub)
  //   .then((user) => console.log(user));
  console.log("Context is");
  console.log(context);

  getPresentationForEmail(JSON.parse(event.body).user.email)
    .then(response => successResponse(callback,response))
    .catch(error => errorResponse(callback, error));
};


//Curl command for testing
//curl --header "Content-Type: application/json" --request POST --data @src/functions/payload.json localhost:9000/getPresentations
// getPresentationForEmail("kouroshb26@gmail.com")
//   .then(response => successResponse(function(){},response))
//   .catch(error => errorResponse(function(){}, error));


async function getPresentationForEmail(email){
  let response = { "user":{"email":email},
    "data":[]};

  let doc = await authenticate();
  let presentationSheet = await getSheetByName(doc,"Presentation"); //Master spread sheet denoting all presentations we have

  let presentations =  await promisify(presentationSheet.getRows)({  //Get presentation information
    offset: 1,
    limit: 100,
  });

  let promises = [];
  for (let presentationRow of presentations){
    //Don't process empty presentations
    if(presentationRow.sheetname === "" || presentationRow.sheetname === null|| presentationRow.sheetname === "()"){
      continue;
    }
    //Don't show information about past presentations
    if(new Date(presentationRow.date) < Date.now()){
      continue;
    }
    promises.push(getPresentation(doc,email,presentationRow));
  }

  response.data = await Promise.all(promises); //Wait till all presentations are gathered

  //remove ones that had errors out and sort based on date
  response.data = response.data
    .filter(presentation => presentation !== null)
    .sort((a,b) => new Date(a.date) - new Date(b.date));

  return response;
}


async function getPresentation(doc, email, presentationRow){

  try {
    let timeSheet = await getSheetByName(doc, presentationRow.sheetname); //Get sheet

    let times = await promisify(timeSheet.getRows)({ //Get rows
      offset: 1,
      limit: 100,
    });

    let presentation = convertPresentation(presentationRow); //Convert presentationRow to meet our API

    for (let timeRow of times) {  //Convert the times to meet out API
      presentation.times.push(convertTime(timeRow, email));
    }
    return presentation;

  }catch (e) {//Log errors
    console.log(e);
    return null;
  }
}




// function parseJwt (token) {
//   var base64Url = token.split('.')[1];
//   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   return JSON.parse(Buffer.from(base64, 'base64').toString());
// }
//
//
// function fetchUser(identity, id) {
//   class IdentityAPI {
//     constructor(apiURL, token) {
//       this.apiURL = apiURL;
//       this.token = token;
//     }
//
//     headers(headers = {}) {
//       return {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${this.token}`,
//         ...headers
//       };
//     }
//
//     parseJsonResponse(response) {
//       return response.json().then(json => {
//         if (!response.ok) {
//           return Promise.reject({ status: response.status, json });
//         }
//
//         return json;
//       });
//     }
//
//     request(path, options = {}) {
//       const headers = this.headers(options.headers || {});
//       return fetch(this.apiURL + path, { ...options, headers }).then(response => {
//         const contentType = response.headers.get("Content-Type");
//         if (contentType && contentType.match(/json/)) {
//           return this.parseJsonResponse(response);
//         }
//
//         if (!response.ok) {
//           return response.text().then(data => {
//             return Promise.reject({ stauts: response.status, data });
//           });
//         }
//         return response.text().then(data => {
//           data;
//         });
//       });
//     }
//   }
//
//   const api = new IdentityAPI(identity.url, identity.token);
//   return api.request(`/admin/users/${id}`);
// }
