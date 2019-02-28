import React from "react";

const ColorInput = props => {
  let text = "#fffffff";
  if (props.textVal) text = props.textVal;

  return (
    <div className="item-container">
      <label className="item-label">{props.labelText}</label>
      <div className="item-input-color-container">
        <input
          onChange={props.changed}
          name={props.inputName}
          type="color"
          className="item-input-color"
        />
        <h4 className="item-input-color-text">{text}</h4>
      </div>
    </div>
  );
};

export default ColorInput;
