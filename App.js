import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./store/index";
import AppNavigator from "./navigation/AppNavigator";
import { View } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
        <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
