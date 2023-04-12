import { routes } from "./routes";

export const getPresentationEndTime = (presentation_time, duration_Minutes) => {
  const startTime = new Date();
  startTime.setHours(parseInt(presentation_time.split(":")[0]));
  startTime.setMinutes(parseInt(presentation_time.split(":")[1]));

  const endTime = new Date(startTime.getTime() + duration_Minutes * 60000); // 60000 ms in 1 minute

  // Format the end time as a string
  const endHours = endTime.getHours().toString().padStart(2, "0");
  const endMinutes = endTime.getMinutes().toString().padStart(2, "0");
  const Presentation_EndTime = `${endHours}:${endMinutes}`;
  return Presentation_EndTime;
};

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export const createPresentationBooking = async (presentation_data) => {
  fetch(routes.createPresentationBooking, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({
      "form-name": "presentation-booking-form",
      ...presentation_data,
    }),
  })
    .then(() => this.setState({ form_submitted: true }))
    .catch((error) => {
      console.error(error);
      this.setState({ form_submitted: false });
    });
};
