import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import theme from "./src/theme";
import { Routes } from "./src/routes";
import { Loading } from "./src/components/Loading";

export default function App() {
  // carregar fonts é async, pode demorar um pouco
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {/* vamos verificar se as fontes foram carregadas antes: */}
      {fontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  );
}
