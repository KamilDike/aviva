import React, { useState } from "react";
import { TextInput, Text, Image } from "react-native";
import { HomeScreenStyles } from "./styles";
import Screen from "../../components/containers/Screen";
import { useNavigation } from "@react-navigation/native";
import { ScreenEnum } from "../../enums/Screen.enum";
import { type NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";

const HomeScreen = (): JSX.Element => {
  const [cityName, setCityName] = useState("");
  const { navigate } = useNavigation<NativeStackNavigatorProps>();

  function submit(): void {
    navigate(ScreenEnum.WEATHER, { cityName });
  }

  return (
    <Screen>
      <Text>Name of a city</Text>
      <TextInput
        onSubmitEditing={submit}
        value={cityName}
        onChangeText={setCityName}
        placeholder="city name"
        style={HomeScreenStyles.textInput}
        accessibilityLabel="city name input"
      />
      <Image
        source={require("../../../assets/splash.png")}
        style={HomeScreenStyles.image}
        resizeMode="contain"
        alt="aviva image"
        accessibilityLabel="aviva image"
      />
    </Screen>
  );
};

export default HomeScreen;
