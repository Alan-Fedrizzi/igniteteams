import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { UsersThree } from "phosphor-react-native";

// styled(TouchableOpacity) é para funcionar  tipagem do styles
// o react-native pode atualizar as tipagens, e o styled-componentes tem que atualizar tb, se não pode dar erro
// ver no package json qual a versão do @types/react
// "@types/react": "~18.2.79",
// essa vai ser nossa tipagem padrão
// adicionar overrides no package.json... ver...
// (se usar o yarn é "resolution" não override)
export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 90px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
  padding: 24px;
  margin-bottom: 12px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_200};
  `}
`;
// export const Title = styled.Text`
//   font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
//   font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
//   color: ${({ theme }) => theme.COLORS.GRAY_200};
// `;

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.GREEN_700,
  weight: "fill",
}))`
  margin-right: 20px;
`;
