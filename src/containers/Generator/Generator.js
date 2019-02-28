import React, { Component } from "react";

import Save from "../../components/Save/Save.js";
import StringInput from "../../components/StringInput/StringInput.js";
import ColorInput from "../../components/ColorInput/ColorInput.js";
import ImageInput from "../../components/ImageInput/ImageInput.js";

class Generator extends Component {
  state = {
    saveable: false,
    itemCount: 0,
    inputs: [],
    values: []
  };

  componentDidMount() {
    const inputs = this.loadFile(this.props.data);
    let saveable;

    inputs.length ? (saveable = true) : (saveable = false);

    this.setState({
      saveable,
      inputs
    });
  }

  getStringInputs = file => {
    let newInputs = [];

    file.RASP_Object.inputs.string_inputs.forEach(inp => {
      let newInput = this.createInput(inp.description, "STR");
      newInputs = [...newInputs, newInput];
    });

    return newInputs;
  };

  getColorInputs = file => {
    let newInputs = [];

    file.RASP_Object.inputs.color_inputs.forEach(inp => {
      let newInput = this.createInput(inp.description, "CLR");
      newInputs = [...newInputs, newInput];
    });

    return newInputs;
  };

  getImageInputs = file => {
    let newInputs = [];

    file.RASP_Object.inputs.image_inputs.forEach(inp => {
      let newInput = this.createInput(inp.description, "IMG");
      newInputs = [...newInputs, newInput];
    });

    return newInputs;
  };

  loadFile = file => {
    let inputs = [];
    let newStringInputs = this.getStringInputs(file);
    let newColorInputs = this.getColorInputs(file);
    let newImageInputs = this.getImageInputs(file);

    inputs = [...newStringInputs, ...newColorInputs, ...newImageInputs];

    return inputs;
  };

  createInput = (labelText, inputType) => {
    let inputName = "";
    let newRandomNumeric = 0;
    let newRandomChar = "";

    for (let i = 0; i < 26; i++) {
      newRandomNumeric = Math.floor(Math.random() * 26) + 97;
      newRandomChar = String.fromCharCode(newRandomNumeric);
      inputName += newRandomChar;
    }

    let newInput = {
      labelText: labelText,
      inputName: inputName,
      inputType: inputType
    };

    return newInput;
  };

  handleInputChange = e => {
    let value;
    if (e.target.files) value = e.target.files[0];
    else value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    let inputData = [];
    let currInputName = "";
    let newInputData = {};
    let newInputContent = "";

    this.state.inputs.forEach(inp => {
      currInputName = inp.inputName;
      newInputContent = this.state[currInputName];
      newInputData = { ...inp, content: newInputContent };
      inputData = [...inputData, newInputData];
    });

    const inputs = this.state.inputs.map(inp => {
      switch (inp.inputType) {
        case "STR":
          let strname = inp.inputName;
          return (
            <StringInput
              labelText={inp.labelText}
              inputName={inp.inputName}
              key={inp.inputName}
              changed={this.handleInputChange}
              val={this.state[strname]}
            />
          );
        case "CLR":
          // Need to define name here so the hex text next to the color input
          // will change to the color picked.
          let clrname = inp.inputName;
          return (
            <ColorInput
              labelText={inp.labelText}
              inputName={inp.inputName}
              key={inp.inputName}
              changed={this.handleInputChange}
              textVal={this.state[clrname]}
            />
          );
        case "IMG":
          return (
            <ImageInput
              labelText={inp.labelText}
              inputName={inp.inputName}
              key={inp.inputName}
              changed={this.handleInputChange}
            />
          );
        default:
          return null;
      }
    });

    let imgVData = [];
    this.state.inputs.forEach(inp => {
      if (inp.inputType === "IMG")
        imgData = [...imgValues, this.state[inp.inputName]];
    });

    let error = <div />;
    if (!this.state.inputs.length) {
      error = (
        <div>
          <h4>RASP_Data file is empty!</h4>
          <p>Find it in ./src/data/RASP_Data</p>
        </div>
      );
    }

    return (
      <div>
        {error}
        {inputs}
        <Save
          saveable={this.state.saveable}
          inputData={inputData}
          imgData={imgData}
        />
      </div>
    );
  }
}

export default Generator;
