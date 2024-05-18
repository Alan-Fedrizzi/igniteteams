import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  function handleNew() {
    // navigation.navigate("players", { group: "turma 1" });
    // navigation.navigate("players", { group: group }); // o segundo group é o nosso state, para simplificar
    navigation.navigate("players", { group });
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
