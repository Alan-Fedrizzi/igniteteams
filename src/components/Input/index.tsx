import { TextInput, TextInputProps } from "react-native";
// para acessar nosso tema:
import { useTheme } from "styled-components/native";
import { Container } from "./styles";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
};

// vamos fazer diferente das outras, pq não queremos criar nenhuma prop nova
export function Input({ inputRef, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    ></Container>
  );
}
