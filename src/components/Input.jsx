import React from "react";

export default function Input({ label, type }) {
  return (
    <div className="input-wrapper">
      <label>
        {label}
      </label>
      <input type={type} />
    </div>
  );
}
