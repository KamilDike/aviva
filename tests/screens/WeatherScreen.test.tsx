import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WeatherScreen from "../../src/screens/WeatherScreen";
import { getWeatherData } from "../../src/api/weatherData";
import { AsyncStorageEnum } from "../../src/enums/AsyncStorage.enum";

jest.mock("../../src/api/weatherData"); // Mock the weatherData module

describe("WeatherScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.clear(); // Clear AsyncStorage before each test
  });

  test("renders loading screen while weather data is being fetched", () => {
    const { getByText } = render(
      <WeatherScreen
        route={{ params: { cityName: "London", favoriteCity: undefined } }}
      />
    );
    expect(getByText("Loading")).toBeDefined();
  });

  test("renders unknown city screen when weather data is not found", async () => {
    // @ts-expected-error
    getWeatherData.mockRejectedValue(new Error("Not found"));

    const { getByText } = render(
      <WeatherScreen
        route={{ params: { cityName: "InvalidCity", favoriteCity: undefined } }}
      />
    );

    await waitFor(() => {
      expect(getWeatherData).toHaveBeenCalledWith("InvalidCity");
      expect(getByText("Unknown city")).toBeDefined();
    });
  });

  test("renders weather data and toggle button when weather data is found", async () => {
    const weatherData = {
      name: "London",
      temperature: "15",
      description: "Cloudy",
    };
    // @ts-expected-error
    getWeatherData.mockResolvedValue(weatherData);

    const { getByText, getByLabelText } = render(
      <WeatherScreen
        route={{ params: { cityName: "London", favoriteCity: undefined } }}
      />
    );

    await waitFor(() => {
      expect(getWeatherData).toHaveBeenCalledWith("London");
      expect(getByText("London")).toBeDefined();
      expect(getByText("Cloudy")).toBeDefined();
      expect(getByText("15° C")).toBeDefined();
      const toggleButton = getByLabelText("toggle-button");
      expect(toggleButton).toBeDefined();
      fireEvent.press(toggleButton); // Click the toggle button
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        AsyncStorageEnum.CITY_NAME,
        "London"
      ); // Verify that AsyncStorage.setItem has been called with the correct arguments
    });
  });
});
