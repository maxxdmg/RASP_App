import React, { Component } from "react";

import Save from "../../components/Save/Save.js";
import StringInput from "../../components/StringInput/StringInput.js";
import ColorInput from "../../components/ColorInput/ColorInput.js";
import ImageInput from "../../components/ImageInput/ImageInput.js";
import instance from '../../axios-template.js';

class Generator extends Component {
  state = {
    id: '',
    saveable: false,
    itemCount: 0,
    inputs: [],
    values: []
  };

  componentDidMount() {
    this.getDataFile();

    if(this.props.data){
       const inputs = this.loadFile(this.props.data);
      let saveable;

      inputs.length ? (saveable = true) : (saveable = false);

      this.setState({
        saveable,
        inputs
      });
    }
  }

  getDataFile = () => {
    instance.get('/devtest')
    .then(res => {
      console.log("= RES DATA =")
      let id = Object.keys(res.data)[0];
      let inputs = this.loadFile(res.data);
      let saveable;
      inputs.length ? (saveable = true) : (saveable = false);
      this.setState({
        id,
        saveable,
        inputs
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  getStringInputs = file => {
    let newInputs = [];
    let strInputsObj = file.devtest.string_inputs;
    Object.keys(strInputsObj).forEach(key => {
      let newInput = this.createInput(strInputsObj[key], key, "STR");
      newInputs = [...newInputs, newInput];
    });
    console.log(newInputs);
    return newInputs;
  };

  getColorInputs = file => {
    let newInputs = [];
    let clrInputsObj = file.devtest.color_inputs;
    Object.keys(clrInputsObj).forEach(key => {
      let newInput = this.createInput(clrInputsObj[key], key, "CLR");
      newInputs = [...newInputs, newInput];
    });
    console.log(newInputs);
    return newInputs;
  };

  getImageInputs = file => {
    let newInputs = [];
    let imgInputsObj = file.devtest.image_inputs;
    Object.keys(imgInputsObj).forEach(key => {
      let newInput = this.createInput(imgInputsObj[key], key, "IMG");
      newInputs = [...newInputs, newInput];
    });
    console.log(newInputs);
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

  createInput = (labelText, input_id, inputType) => {
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
      inputId: input_id,
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

    let imgData = [];
    this.state.inputs.forEach(inp => {
      if (inp.inputType === "IMG")
        	imgData = [...imgData, this.state[inp.inputName]];
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

    let id = <div />;
    if (this.state.id)
      id = <h3 className={"pl-3 pt-3 pb-1"}>template: {this.state.id}</h3>;

    return (
      <div>
        {error}
        {id}
        {inputs}
        <Save
          id={this.state.id}
          saveable={this.state.saveable}
          inputData={inputData}
          imgData={imgData}
        />
      </div>
    );
  }
}

export default Generator;
