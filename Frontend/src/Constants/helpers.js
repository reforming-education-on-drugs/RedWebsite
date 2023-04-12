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
