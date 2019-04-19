import React from "react";

const StringInput = props => {
  let val = "";
  if (props.val) val = props.val;

  return (
    <div
      style={{ border: "1px solid #0094FFFF", overflow: "hidden" }}
      className="w-25 row ml-3 mb-2 p-3"
    >
      <label style={{ fontSize: "20px" }} className="col-12">
        {props.labelText}
      </label>
      <div className="input-group">
        <input
          onChange={props.changed}
          name={props.inputName}
          value={val}
          className="form-control"
        />
      </div>
    </div>
  );
};

export default StringInput;
