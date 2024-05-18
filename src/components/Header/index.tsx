import { BackButton, BackIcon, Container, Logo } from "./style";
import logoImg from "../../assets/logo.png";

type HeaderProps = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: HeaderProps) {
  return (
    <Container>
      {showBackButton && (
        <BackButton>
          <BackIcon color="#ffffff" size={32} />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  );
}
