import React from "react";
import PropTypes from 'prop-types';

export default function Input({ name, label, type, onChange }) {
  return (
    <div className="input-wrapper">
      <label>
        {label}
      </label>
      <input name={name} type={type} onChange={onChange} required />
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};