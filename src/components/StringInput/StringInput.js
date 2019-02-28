import React from "react";

const StringInput = props => {
  let val = "";
  if (props.val) val = props.val;

  return (
    <div className="item-container">
      <label className="item-label">{props.labelText}</label>
      <input
        onChange={props.changed}
        name={props.inputName}
        value={val}
        className="item-input"
      />
    </div>
  );
};

export default StringInput;
