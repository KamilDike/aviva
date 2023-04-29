import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { ToggleButtonStyles } from "./styles";
import { TextStyles } from "../../styles/TextStyles";

interface Props {
  name: string;
  callback: () => void;
  isActive: boolean;
}

const ToggleButton = ({ name, callback, isActive }: Props): JSX.Element => {
  return (
    <TouchableOpacity
      accessibilityLabel="toggle button"
      onPress={callback}
      style={[
        ToggleButtonStyles.container,
        isActive ? ToggleButtonStyles.active : ToggleButtonStyles.inActive,
      ]}
    >
      <Text style={TextStyles.highlight}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ToggleButton;
