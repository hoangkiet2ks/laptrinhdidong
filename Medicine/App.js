import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Screen_1 from "./screen/Screen_1";
import Screen_2 from "./screen/Screen_2";
import Screen_3 from "./screen/Screen_3";

export default function App() {
  return <Screen_3 />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
