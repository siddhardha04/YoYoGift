import React from "react";
import renderer from "react-test-renderer";
import Footer from "./Footer";

it("render a footer with social share icons", () => {
  const tree = renderer.create(<Footer />).toJSON();
  expect(tree).toMatchSnapshot();
});
