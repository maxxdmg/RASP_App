import React from "react";

const ImageInput = props => {
  return (
    <div className="item-container">
      <label className="item-label">{props.labelText}</label>
      <input
        type="file"
        onChange={props.changed}
        name={props.inputName}
        className="item-input"
      />
    </div>
  );
};

export default ImageInput;
