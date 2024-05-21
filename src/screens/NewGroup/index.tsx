import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { AppError } from "../../utils/AppError";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Content, Icon } from "./styles";
import { groupCreate } from "../../storage/group/groupCreate";
import { Alert } from "react-native";

export function NewGroup() {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  async function handleNew() {
    try {
      if (!group.trim().length) {
        return Alert.alert("Novo Grupo", "Informe o nome da turma.");
      }

      await groupCreate(group);

      // navigation.navigate("players", { group: "turma 1" });
      // navigation.navigate("players", { group: group }); // o segundo group é o nosso state, para simplificar
      navigation.navigate("players", { group });
    } catch (error) {
      // lançamos uma msg com o AppError
      // verificar se o erro foi lançado por nós
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo!");
        console.error(error);
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />
        <Input
          placeholder="Nome da turma"
          // onChangeText={(text) => setGroup(text)}
          onChangeText={setGroup}
        />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
