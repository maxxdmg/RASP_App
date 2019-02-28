import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import StringInput from "./StringInput";

Enzyme.configure({ adapter: new Adapter() });

test("StringInput renders without crashing", () => {
  const changed = jest.fn();
  const wrapper = mount(<StringInput changed={changed} />);
  expect(wrapper.find("label")).toBeDefined();
});

test("StringInput label receives and renders proper prop", () => {
  const changed = jest.fn();
  const wrapper = mount(
    <StringInput changed={changed} labelText="Name" val="HELLO" />
  );

  expect(wrapper.find("label").text()).toEqual("Name");
});

test("StringInput recieves val correctly", () => {
  const changed = jest.fn();
  const wrapper = mount(
    <StringInput changed={changed} labelText="Name" val="TESTING" />
  );

  expect(wrapper.props().val).toEqual("TESTING");
});
