import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Generator from "./Generator";
import Data from "./RASP_TEST_DATA.json";

Enzyme.configure({ adapter: new Adapter() });

test("Generator renders without crashing", () => {
  const wrapper = mount(<Generator data={Data} />);
  expect(wrapper.find("div")).toBeDefined();
});

test("Generator renders correct number of string inputs", () => {
  const wrapper = mount(<Generator data={Data} />);
  expect(wrapper.find("StringInput")).toHaveLength(3);
});

test("createInput method creates a new input with the correct data", () => {
  const wrapper = mount(<Generator data={Data} />);
  const labelText = "TEST LABEL TEXT";
  const inputType = "TEST INPUT TYPE";
  const newInput = wrapper.instance().createInput(labelText, inputType);

  expect(newInput.labelText).toEqual(labelText);
  expect(newInput.inputType).toEqual(inputType);
  expect(newInput.inputName).toBeDefined();
});

test("createInput method creates a new input with the correct data", () => {
  const wrapper = mount(<Generator data={Data} />);
  const inputs = wrapper.instance().loadFile(Data);

  expect(inputs.length).toEqual(5);
});

test("getStringInputs method returns correct string inputs within data file", () => {
  const wrapper = mount(<Generator data={Data} />);
  const stringInputs = wrapper.instance().getStringInputs(Data);

  expect(stringInputs.length).toEqual(3);
  expect(stringInputs[0].labelText).toEqual("Name");
  expect(stringInputs[0].inputType).toEqual("STR");
});

test("getColorInputs method returns correct color inputs within data file", () => {
  const wrapper = mount(<Generator data={Data} />);
  const colorInputs = wrapper.instance().getColorInputs(Data);

  expect(colorInputs.length).toEqual(1);
  expect(colorInputs[0].labelText).toEqual("Color");
  expect(colorInputs[0].inputType).toEqual("CLR");
});

test("getImageInputs method returns correct image inputs within data file", () => {
  const wrapper = mount(<Generator data={Data} />);
  const imageInputs = wrapper.instance().getImageInputs(Data);

  expect(imageInputs.length).toEqual(1);
  expect(imageInputs[0].labelText).toEqual("Pic");
  expect(imageInputs[0].inputType).toEqual("IMG");
});
