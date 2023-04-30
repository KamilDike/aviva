import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import WeatherScreen from "../screens/WeatherScreen";
import { ScreenEnum } from "../enums/Screen.enum";

const Stack = createNativeStackNavigator();

const NavigationCore = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenEnum.HOME}>
        <Stack.Screen
          name={ScreenEnum.HOME}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenEnum.WEATHER}
          component={WeatherScreen}
          options={{ headerTitle: "Weather" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationCore;
