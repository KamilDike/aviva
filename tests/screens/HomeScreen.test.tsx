import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "../../src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { wait } from "../utils/wait";

describe("Component", () => {
  jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock")
  );

  const Component = (
    <NavigationContainer>
      <HomeScreen />
    </NavigationContainer>
  );

  const mockCityName = "Test City";
  const mockFavoriteCity = "Test Favorite City";
  const mockGetItem = jest.fn();

  beforeAll(() => {
    AsyncStorage.getItem = mockGetItem;
  });

  beforeEach(() => {
    mockGetItem.mockClear();
  });

  it("renders the city name input correctly", () => {
    const { getByText, getByPlaceholderText } = render(Component);
    const cityText = getByText("Name of a city");
    const cityInput = getByPlaceholderText("city name");
    expect(cityText).toBeTruthy();
    expect(cityInput).toBeTruthy();
  });

  it("loads the city name from async storage and sets favorite city", async () => {
    mockGetItem.mockResolvedValueOnce(mockCityName);
    const { getByPlaceholderText } = render(Component);
    const cityInput = getByPlaceholderText("city name");
    await wait();
    expect(cityInput.props.value).toEqual(mockCityName);
  });

  it("disables the city name input while loading", async () => {
    mockGetItem.mockResolvedValueOnce(mockCityName);
    const { getByPlaceholderText } = render(Component);
    const cityInput = getByPlaceholderText("city name");
    expect(cityInput.props.editable).toEqual(false);
    await wait();
    expect(cityInput.props.editable).toEqual(true);
  });

  it("sets the loading state to true on submit", async () => {
    const { getByLabelText } = render(Component);
    const cityInput = getByLabelText("text-input");
    fireEvent.changeText(cityInput, mockCityName);
    fireEvent(cityInput, "submitEditing");
    await wait();
    expect(cityInput.props.value).toEqual(undefined);
  });

  it("sets the favorite city correctly from async storage", async () => {
    mockGetItem.mockResolvedValueOnce(mockFavoriteCity);
    const { getByPlaceholderText } = render(Component);
    const cityInput = getByPlaceholderText("city name");
    await wait();
    expect(cityInput.props.value).toEqual(mockFavoriteCity);
  });
});
