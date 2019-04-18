import React from "react";

const ColorInput = props => {
  let text = "#fffffff";
  if (props.textVal) text = props.textVal;

  return (
    <div 
      style={{border: '1px solid black', overflow: 'hidden'}}
      className="w-25 row ml-3 mb-2 p-3">
      <label style={{fontSize: '20px'}} className='col-12'>{props.labelText}</label>
        <input
          style={{width: '2vw', height: '2vw', border: 'none'}}
          onChange={props.changed}
          name={props.inputName}
          type="color"
          className="ml-3 p-0 col-3" />
        <h4 style={{width: '1vw', fontWeight: 'bold'}} className="m-0 pl-2 col-4">{text}</h4>
    </div>
  );
};

export default ColorInput;
