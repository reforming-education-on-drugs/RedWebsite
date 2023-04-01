import React from "react";

export default function BookingPage() {
  document.title = "RED | Booking";

  return (
    <main>
      <div className="container">
        <h1>Booking</h1>
      </div>

      <div className="container" style={{ overflow: "hidden" }}>
        <iframe title="booking-schedule" id="booking-schedule" width="100%" frameBorder="0" marginHeight="0" marginWidth="0" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQvgjA5va7GB34-fALCxcnTceHGwOH8kITxtN6wEj2ekVML-Hf8ZI2Mpz7__ej9LrnD51KwYTg-uSiR/pubhtml?widget=true&amp;headers=false" />
        <iframe title="booking-schedule" id="booking-form" width="100%" frameBorder="0" marginHeight="0" marginWidth="0" src="https://docs.google.com/forms/d/e/1FAIpQLSdBX6POG9GrzUkmTvWVpiM1BlhfLFd3bTcfTx7tAQWZGRZegg/viewform?embedded=true" >Loading...</iframe>
      </div>
    </main>
  );
}
