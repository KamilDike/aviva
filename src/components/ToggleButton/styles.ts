import { StyleSheet } from "react-native";
import { Values } from "../../consts/Values";
import { Colors } from "../../consts/Colors";

export const ToggleButtonStyles = StyleSheet.create({
  container: {
    width: "100%",
    padding: Values.L,
    borderRadius: Values.L,
    marginTop: Values.M,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  active: {
    backgroundColor: Colors.active,
  },
  inActive: {
    backgroundColor: Colors.white,
  },
});
