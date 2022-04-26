import React from "react";

const CustomInput = ({ type, placeholder, value, onChange }) => {
  return (
    <div className="form-control w-full ">
      <label className="label">
        <span className="label-text">{placeholder}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input input-bordered w-full"
      />
    </div>
  );
};

export default CustomInput;
