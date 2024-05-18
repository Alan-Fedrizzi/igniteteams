import { ActivityIndicator } from "react-native";
import { Container, LoadIndicator } from "./styles";

export function Loading() {
  return (
    <Container>
      {/* ActivityIndicator é um loader */}
      <LoadIndicator />
    </Container>
  );
}
