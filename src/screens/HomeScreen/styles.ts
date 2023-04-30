import { StyleSheet } from "react-native";
import { Colors } from "../../consts/Colors";
import { Values } from "../../consts/Values";

export const HomeScreenStyles = StyleSheet.create({
  textInput: {
    marginTop: Values.S,
    backgroundColor: Colors.white,
    padding: Values.L,
    borderRadius: Values.L,
  },
  image: {
    width: "100%",
  },
});
