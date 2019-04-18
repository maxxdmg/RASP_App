import React from "react";

const ImageInput = props => {
  return (
    <div
      style={{border: '1px solid #0094FFFF', overflow: 'hidden'}}
      className="w-25 row ml-3 mb-2 p-3">
      <label style={{fontSize: '20px'}} className='col-12'>{props.labelText}</label>
      <input
        type="file"
        onChange={props.changed}
        name={props.inputName}
        className="col-12"
      />
    </div>
  );
};

export default ImageInput;
