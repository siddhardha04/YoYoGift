import React from "react";
import renderer from "react-test-renderer";
import Brands from "./Brands";

test("renders different brands based on category", () => {
  const tree = renderer.create(<Brands brands={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
