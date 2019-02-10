import React from 'react';

const DisplayError = ({ msg }) => (
  <div className="register-error">
    <p>
      { msg }    
    </p>
    <p>
      Experiencing an issue? Contact us at <a href="mailto:reducalgary@gmail.com?subject=Web registration problem">reducalgary@gmail.com</a>
    </p>
  </div>
);

export default DisplayError;