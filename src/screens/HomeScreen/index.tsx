import React, { useEffect, useState } from "react";
import { TextInput, Text, Image } from "react-native";
import { HomeScreenStyles } from "./styles";
import Screen from "../../components/containers/Screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ScreenEnum } from "../../enums/Screen.enum";
import { type NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageEnum } from "../../enums/AsyncStorage.enum";
import { TextStyles } from "../../styles/TextStyles";

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const { navigate } = useNavigation<NativeStackNavigatorProps>();
  const [cityName, setCityName] = useState("");
  const [favoriteCity, setFavoriteCity] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    isFocused &&
      (async () => {
        const cityName = await AsyncStorage.getItem(AsyncStorageEnum.CITY_NAME);
        if (cityName !== null) {
          setCityName(cityName);
          setFavoriteCity(cityName);
        } else {
          setFavoriteCity("");
        }
        timeoutId = setTimeout(() => {
          setLoading(false);
        }, 1000);
      })();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isFocused]);

  function handleSubmit(): void {
    navigate(ScreenEnum.WEATHER, { cityName, favoriteCity });
    setLoading(true);
    setCityName("");
  }

  return (
    <Screen>
      <Text style={TextStyles.highlight}>Name of a city</Text>
      <TextInput
        onSubmitEditing={handleSubmit}
        value={loading ? "loading..." : cityName}
        onChangeText={setCityName}
        placeholder="city name"
        style={HomeScreenStyles.textInput}
        editable={!loading}
        accessibilityLabel="text-input"
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
