import React from "react";
import { render } from "@testing-library/react-native";
import HomeScreen from "../../src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";

describe("HomeScreen", () => {
  it("renders the screen components correctly", () => {
    const { getByText, getByLabelText } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    expect(getByText("Name of a city")).toBeDefined();
    expect(getByLabelText("city name input")).toBeDefined();
    expect(getByLabelText("aviva image")).toBeDefined();
  });
});
