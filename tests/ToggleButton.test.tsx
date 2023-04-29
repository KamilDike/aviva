import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ToggleButton from "../src/components/ToggleButton";
import { ToggleButtonStyles } from "../src/components/ToggleButton/styles";

describe("ToggleButton", () => {
  const mockCallback = jest.fn();
  const defaultProps = {
    name: "toggle button",
    callback: mockCallback,
    isActive: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    const { getByText } = render(<ToggleButton {...defaultProps} />);
    const button = getByText(defaultProps.name);
    expect(button).toBeDefined();
  });

  it("calls the callback function when pressed", () => {
    const { getByText } = render(<ToggleButton {...defaultProps} />);
    const button = getByText(defaultProps.name);
    fireEvent.press(button);
    expect(mockCallback).toHaveBeenCalled();
  });

  it("applies the active style when isActive is true", () => {
    const { getByLabelText } = render(
      <ToggleButton {...defaultProps} isActive />
    );
    const button = getByLabelText(defaultProps.name);
    expect(button.props.style).toEqual({
      ...ToggleButtonStyles.container,
      ...ToggleButtonStyles.active,
    });
  });

  it("applies the inactive style when isActive is false", () => {
    const { getByLabelText } = render(<ToggleButton {...defaultProps} />);
    const button = getByLabelText(defaultProps.name);
    expect(button.props.style).toEqual({
      ...ToggleButtonStyles.container,
      ...ToggleButtonStyles.inActive,
    });
  });
});
