import React from "react";
import { View } from "react-native";
import { render } from "@testing-library/react-native";
import Screen from "../../src/components/containers/Screen";
import { ScreenStyles } from "../../src/components/containers/Screen/styles";

describe("<Screen />", () => {
  it("renders children", () => {
    const childElement = <View testID="child-element" />;
    const { getByTestId } = render(<Screen>{childElement}</Screen>);
    const renderedChild = getByTestId("child-element");
    expect(renderedChild).toBeTruthy();
  });

  it("applies the correct styles", () => {
    const childElement = <View />;
    const { getByLabelText } = render(<Screen>{childElement}</Screen>);
    const container = getByLabelText("screen-container");
    expect(container.props.style).toEqual(ScreenStyles.container);
  });
});
