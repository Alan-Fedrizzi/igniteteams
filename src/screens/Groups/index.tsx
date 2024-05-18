import { useState } from "react";
import { FlatList } from "react-native";

import { Container } from "./styles";
// import * as S from "./styles"; usaria <S.Container> por exemplo
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { GroupCard } from "../../components/GroupCard";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";

export function Groups() {
  // não precisaríamos deixar o type explícito, ele infere
  const [groups, setGroups] = useState<string[]>([
    "turma 1",
    "turma 2",
    "turma 3",
  ]);

  return (
    // Container definido do styles.ts
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
        contentContainerStyle={!groups.length && { flex: 1 }}
      />

      <Button title="Criar nova turma" />
    </Container>
  );
}
