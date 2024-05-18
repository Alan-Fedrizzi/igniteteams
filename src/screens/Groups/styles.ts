// import styled from "styled-components";
// seria para usar em web, como vamos usar em react native, colocamos /native
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

// estamos criando o componente Container, que é uma View com esses estilos
// export const Container = styled.View`
// usar o safe area:
export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: 24px;
`;
