import React, { Component } from "react";
import Generator from "./containers/Generator/Generator.js";
import Data from "./data/RASP_Test.json";
import "./App.css";

class App extends Component {
  render() {
    return <Generator className="Generator" data={Data} />;
  }
}

export default App;
