import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { View } from "react-native";

import { AppRoutes } from "./app.routes";

export function Routes() {
  const { COLORS } = useTheme();

  return (
    // esse View é para não aparece uma tela branca no fundo qd troca de tela
    <View style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  );
}

// terminei rotas...
// agora é a ultima seção
