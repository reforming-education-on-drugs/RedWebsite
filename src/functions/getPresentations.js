/* eslint-disable no-console */
// const { promisify } = require("util");
const {
  successResponse,
  errorResponse,
  authenticate,
  getSheetByName,
  convertPresentation,
  convertTime,
  isLocal,
  localContext,
} = require("./presentationUtil");

exports.handler = function (event, context, callback) {
  console.log("START: Received request.");

  if (isLocal()) {
    context = localContext;
  }

  if (
    context.clientContext &&
    context.clientContext.user &&
    context.clientContext.user.email
  ) {
    getPresentationForEmail(context.clientContext.user.email)
      .then((response) => successResponse(callback, response))
      .catch((error) => errorResponse(callback, error));
  } else {
    errorResponse(callback, "Unauthorized request. Please login in.");
  }
};

//Curl command for testing
//curl --header 'Content-Type: application/json' --request POST --data @src/functions/payload.json localhost:9000/getPresentations
// getPresentationForEmail('kouroshb26@gmail.com')
//   .then(response => successResponse(function(){},response))
//   .catch(error => errorResponse(function(){}, error));

async function getPresentationForEmail(email) {
  let response;

  const doc = await authenticate();
  const presentationSheet = await getSheetByName(doc, "Presentation"); //Master spread sheet denoting all presentations we have

  // const presentations = await promisify(presentationSheet.getRows)({
  //   //Get presentation information
  //   offset: 1,
  //   limit: 100,
  // });

  const presentations = await presentationSheet.getRows({
    offset: 1,
    limit: 100,
  });

  // console.info(
  //   "fetched presentations----------------------------",
  //   presentations
  // );

  let promises = [];
  for (let presentationRow of presentations) {
    //Don't process empty presentations
    if (
      presentationRow["Sheet Name:"] === "" ||
      presentationRow["Sheet Name:"] === null ||
      presentationRow["Sheet Name:"] === "()"
    ) {
      continue;
    }
    //Don't show information about past presentations
    // if (new Date(presentationRow.date) < Date.now()) {
    if (new Date(presentationRow["Date:"]) < Date.now()) {
      continue;
    }

    promises.push(getPresentation(doc, email, presentationRow));
  }

  response = await Promise.all(promises); //Wait till all presentations are gathered

  //remove ones that had errors out and sort based on date
  response = response
    .filter((presentation) => presentation !== null)
    .sort((a, b) => new Date(a["Date:"]) - new Date(b["Date:"]));

  return response;
}

async function getPresentation(doc, email, presentationRow) {
  try {
    const timeSheet = await getSheetByName(doc, presentationRow["Sheet Name:"]); //Get sheet

    // const times = await promisify(timeSheet.getRows)({
    //   //Get rows
    //   offset: 1,
    //   limit: 100,
    // });

    const times = await timeSheet.getRows({ offset: 0, limit: 100 });

    const presentation = convertPresentation(presentationRow); //Convert presentationRow to meet our API

    for (let timeRow of times) {
      //Convert the times to meet out API
      presentation.times.push(convertTime(timeRow, email));
    }
    return presentation;
  } catch (e) {
    //Log errors
    console.error(e);
    return null;
  }
}
