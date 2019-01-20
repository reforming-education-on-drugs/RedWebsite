import React from "react";

export default function Input({ name, label, type, onChange }) {
  return (
    <div className="input-wrapper">
      <label>
        {label}
      </label>
      <input name={name} type={type} onChange={onChange} />
    </div>
  );
}
