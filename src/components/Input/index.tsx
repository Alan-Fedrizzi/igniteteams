import { TextInputProps } from "react-native";
// para acessar nosso tema:
import { useTheme } from "styled-components/native";
import { Container } from "./styles";

// vamos fazer diferente das outras, pq não queremos criar nenhuma prop nova
export function Input({ ...rest }: TextInputProps) {
  const { COLORS } = useTheme();

  return (
    <Container placeholderTextColor={COLORS.GRAY_300} {...rest}></Container>
  );
}
