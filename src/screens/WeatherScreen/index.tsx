import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageEnum } from "../../enums/AsyncStorage.enum";
import ToggleButton from "../../components/ToggleButton";
import Screen from "../../components/containers/Screen";
import { getWeatherData } from "../../api/weatherData";
import { type IWeather } from "../../interfaces/IWeather";
import Description from "../../components/Description";
import { TextStyles } from "../../styles/TextStyles";
import { WeatherScreenStyles } from "./styles";

interface Props {
  route: {
    params: {
      cityName: string;
      favoriteCity: string | undefined;
    };
  };
}

const WeatherScreen = ({
  route: {
    params: { cityName, favoriteCity },
  },
}: Props) => {
  const [weatherData, setWeatherData] = useState<IWeather>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(favoriteCity === cityName);

  function toggleFavoriteCity(): void {
    isFavorite
      ? AsyncStorage.removeItem(AsyncStorageEnum.CITY_NAME)
      : AsyncStorage.setItem(AsyncStorageEnum.CITY_NAME, cityName);
    setIsFavorite((prevState) => !prevState);
  }

  useEffect(() => {
    (async () => {
      try {
        const weatherData = await getWeatherData(cityName);
        setWeatherData(weatherData);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <Screen>
        <Text style={TextStyles.information}>Loading</Text>
      </Screen>
    );

  if (error)
    return (
      <Screen>
        <Text style={TextStyles.information}>Unknown city</Text>
      </Screen>
    );

  return (
    <Screen>
      {weatherData === undefined ? null : (
        <>
          <Text style={[TextStyles.highlight, WeatherScreenStyles.cityName]}>
            {weatherData.name}
          </Text>
          <Description name="Description" value={weatherData.description} />
          <Description
            name="Temperature"
            value={`${weatherData.temperature}° C`}
          />
          <ToggleButton
            name={isFavorite ? "Forget" : "Save"}
            callback={toggleFavoriteCity}
            isActive={isFavorite}
          />
        </>
      )}
    </Screen>
  );
};

export default WeatherScreen;
