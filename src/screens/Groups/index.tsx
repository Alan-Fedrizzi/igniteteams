import { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { groupsGetAll } from "../../storage/group/groupsGetAll";
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

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.error(error);
    }
  }

  // dessa forma, executa só qd carrega o componente, se sai e volta para a tela, não recarrega
  // useEffect(() => {
  //   fetchGroups();
  // }, []);
  // react navigation tem o useFocusEffect, que executa qd a tela fica em foco, ou seja, volta a ser exibida. Sometimes we want to run side-effects when a screen is focused.
  // useCallback is a React Hook that lets you cache a function definition between re-renders.
  // To avoid the running the effect too often, it's important to wrap the callback in useCallback before passing it to useFocusEffect as shown in the example.
  // The useFocusEffect is analogous to React's useEffect hook. The only difference is that it only runs if the screen is currently focused.
  // só vai rodar se necessário, não vai fazer rerenders sem necessidade
  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    // Container definido do styles.ts
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
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
