import React, { Component } from "react";
import Generator from "./containers/Generator/Generator.js";
import Header from "./components/Header/Header.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Generator />
      </div>
    );
  }
}

export default App;
