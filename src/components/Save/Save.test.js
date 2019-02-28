import React from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Save from "./Save";

Enzyme.configure({ adapter: new Adapter() });

test("Save renders without crashing", () => {
  const test_data = [
    {
      content: "some text",
      inputName: "somerandomstring",
      inputType: "STR",
      labelText: "TEST STRING"
    }
  ];
  const wrapper = mount(<Save inputData={test_data} />);

  expect(wrapper.find(".saveButton")).toBeDefined();
});

test("Save button is disabled when the prop saveable is false and not disabled when saveable is true", () => {
  const test_data = [
    {
      content: "some text",
      inputName: "somerandomstring",
      inputType: "STR",
      labelText: "TEST STRING"
    }
  ];
  const wrapper = mount(<Save inputData={test_data} saveable={false} />);
  const wrapper2 = mount(<Save inputData={test_data} saveable={true} />);

  expect(wrapper.find("button").props().disabled).toEqual(true);
  expect(wrapper2.find("button").props().disabled).toEqual(false);
});

/*
test('createInput method creates a new input with the correct data', () => {
	const wrapper = mount(<Generator data={Data} />);
	let inputs = wrapper.instance().loadFile(Data);
	
	expect(inputs.length).toEqual(5);
});
*/
