import React, { Component } from "react";

import JSZip from "jszip";
import FileSaver from "file-saver";

class Save extends Component {
  state = {};

  handleSave = zip => {
    zip.generateAsync({ type: "blob" }).then(content => {
      FileSaver.saveAs(content, "RASP_Output.zip");
    });
  };

  render() {
    let zip = new JSZip();
    let outputContent = "";

    outputContent += this.props.id + '\n';

    this.props.inputData.forEach(data => {
        if (!data.content) {
          if (data.inputType === "CLR")
            outputContent += data.inputId + ":#ffffff\n";
          else outputContent += data.inputId + ":\n";
        } else if (data.inputType === "IMG")  outputContent += data.inputId + ":" + data.content.name;
        else outputContent += data.inputId + ":" + data.content + "\n";
    });

    zip.file("output.RASP", outputContent);

    if (this.props.imgData) {
      let img = zip.folder("images");
      this.props.imgData.forEach(val => {
        if (val) img.file(val.name, val, { base64: true });
      });
    }

    return (
      <button
        disabled={!this.props.saveable}
        style={{width: '5vw', height: '3vw', borderRadius: '7.5%', marginLeft: '10vw'}}
        className="btn btn-outline-primary"
        onClick={() => this.handleSave(zip)}
      >
        Save
      </button>
    );
  }
}

export default Save;
