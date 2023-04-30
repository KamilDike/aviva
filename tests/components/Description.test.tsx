import React from "react";
import { render } from "@testing-library/react-native";
import Description from "../../src/components/Description";
import { DescriptionStyles } from "../../src/components/Description/styles";
import { TextStyles } from "../../src/styles/TextStyles";

describe("<Description />", () => {
  const testName = "Test Name";
  const testValue = "Test Value";

  it("renders name and value correctly", () => {
    const { getByText } = render(
      <Description name={testName} value={testValue} />
    );
    const nameText = getByText(testName);
    const valueText = getByText(testValue);
    expect(nameText).toBeTruthy();
    expect(valueText).toBeTruthy();
  });

  it("applies the correct styles", () => {
    const { getByLabelText } = render(
      <Description name={testName} value={testValue} />
    );
    const container = getByLabelText("description-container");
    const nameText = getByLabelText("description-name");
    const valueText = getByLabelText("description-value");
    expect(container.props.style).toEqual(DescriptionStyles.container);
    expect(nameText.props.style).toEqual(TextStyles.highlight);
    expect(valueText.props.style).toBeUndefined();
  });
});
