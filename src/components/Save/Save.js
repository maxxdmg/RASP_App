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

    this.props.inputData.forEach(data => {
      if (data.inputType !== "IMG") {
        if (!data.content) {
          if (data.inputType === "CLR")
            outputContent += data.labelText + ":#ffffff\n";
          else outputContent += data.labelText + ":\n";
        } else outputContent += data.labelText + ":" + data.content + "\n";
      }
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
        className="saveButton"
        onClick={() => this.handleSave(zip)}
      >
        Save
      </button>
    );
  }
}

export default Save;
