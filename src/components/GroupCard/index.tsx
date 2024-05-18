import { TouchableOpacityProps } from "react-native";
import { Container, Title, Icon } from "./styles";

// para pegar a tipagem do TouchableOpacity
type GroupCardProps = TouchableOpacityProps & {
  title: string;
};

// o ...rest é por causa das props do TouchableOpacity
export function GroupCard({ title, ...rest }: GroupCardProps) {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
}
