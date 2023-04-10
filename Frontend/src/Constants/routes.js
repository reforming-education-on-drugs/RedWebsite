const APIURL = "http://localhost:9000";

export const routes = {
  getAllPresentations: `${APIURL}/presentation_booking`,
  getConfirmedPresentations: `${APIURL}/presentation_booking/confirmed`,
  getUnconfirmedPresentations: `${APIURL}/presentation_booking/unconfirmed`,
  getExecutives: `${APIURL}/executives`,
  createPresentationBooking: `${APIURL}/presentation_booking`,
  deletePresentationBooking: `${APIURL}/presentation_booking`,
};
