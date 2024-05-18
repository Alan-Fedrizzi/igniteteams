import { useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Container } from "./styles";
// import * as S from "./styles"; usaria <S.Container> por exemplo
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { GroupCard } from "../../components/GroupCard";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";

// type RootParamList = {
//   groups: undefined;
//   new: undefined;
//   players: {
//     group: string;
//   };
// };

// // o groups se refere a tela que estamos no momento
// type GroupsProps = {
//   navigation: NativeStackNavigationProp<RootParamList, "groups">;
// };

// export function Groups({ navigation }: GroupsProps) {
export function Groups() {
  // não precisaríamos deixar o type explícito, ele infere
  const [groups, setGroups] = useState<string[]>([
    "turma 1",
    "turma 2",
    "turma 3",
  ]);
  const navigation = useNavigation();

  function handleNewGroup() {
    // tb funciona assim:
    navigation.navigate("new");
    // navigation.navigate("players", {group: 'Galera do Ignite'});
  }

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
        showsVerticalScrollIndicator={false}
      />

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
