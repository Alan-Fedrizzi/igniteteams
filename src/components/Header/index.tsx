import { useNavigation } from "@react-navigation/native";
import { BackButton, BackIcon, Container, Logo } from "./style";
import logoImg from "../../assets/logo.png";

type HeaderProps = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: HeaderProps) {
  const navigation = useNavigation();

  function handleGoBack() {
    // goBack volta par a tela anterior
    // queremos voltar sempre para a groups
    // navigation.goBack();
    navigation.navigate("groups"); // assim fica explícito, melhor
    // Another alternative would be navigation.popToTop(), which goes back to the first screen in the stack.
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon color="#ffffff" size={32} />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  );
}
