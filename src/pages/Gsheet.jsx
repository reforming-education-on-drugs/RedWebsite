import React from "react";

export default function Gsheet() {
  document.title = "RED | Vision";

  return (
    <main>
      <div className="container">
        <h1>Google Sheet Data</h1>

        {callGetPresentation({user:{email:"kouroshb26@gmail.com"}})}
      </div>


    </main>
  );
}



function callGetPresentation(data) {
  return fetch('/.netlify/functions/getPresentations', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    console.log(response.body);
  }).catch(error => console.log(error));
}






