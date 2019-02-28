import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ColorInput from "./ColorInput";

Enzyme.configure({ adapter: new Adapter() });

test("ColorInput renders without crashing", () => {
  const changed = jest.fn();
  const wrapper = mount(<ColorInput changed={changed} />);
  expect(wrapper.find("label")).toBeDefined();
});

test("ColorInput label receives and renders proper props", () => {
  const changed = jest.fn();
  const wrapper = mount(
    <ColorInput changed={changed} labelText="Color" textVal="#abcdeff" />
  );

  expect(wrapper.find("label").text()).toEqual("Color");
  expect(wrapper.find("h4").text()).toEqual("#abcdeff");
});

test("ColorInput textVal is set to #fffffff if none is specified", () => {
  const changed = jest.fn();
  const wrapper = mount(<ColorInput changed={changed} labelText="Color" />);

  expect(wrapper.find("h4").text()).toEqual("#fffffff");
});
