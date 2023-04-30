import React from "react";
import { Text, View } from "react-native";
import { TextStyles } from "../../styles/TextStyles";
import { DescriptionStyles } from "./styles";

interface Props {
  name: string;
  value: string;
}

const Description = ({ name, value }: Props): JSX.Element => {
  return (
    <View
      accessibilityLabel="description-container"
      style={DescriptionStyles.container}
    >
      <Text accessibilityLabel="description-name" style={TextStyles.highlight}>
        {name}
      </Text>
      <Text accessibilityLabel="description-value">{value}</Text>
    </View>
  );
};

export default Description;
