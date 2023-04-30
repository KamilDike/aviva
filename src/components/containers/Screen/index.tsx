import React from "react";
import { View } from "react-native";
import { ScreenStyles } from "./styles";

interface Props {
  children: JSX.Element[] | JSX.Element | null;
}

const Screen = ({ children }: Props): JSX.Element => {
  return (
    <View accessibilityLabel="screen-container" style={ScreenStyles.container}>
      {children}
    </View>
  );
};

export default Screen;
