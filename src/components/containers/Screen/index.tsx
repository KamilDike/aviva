import React from "react";
import { View } from "react-native";
import { ScreenStyles } from "./styles";

interface Props {
  children: JSX.Element[];
}

const Screen = ({ children }: Props): JSX.Element => {
  return <View style={ScreenStyles.container}>{children}</View>;
};

export default Screen;
