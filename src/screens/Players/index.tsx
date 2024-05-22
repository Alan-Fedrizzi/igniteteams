import { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, FlatList, TextInput } from "react-native";
// import { Alert, FlatList, Keyboard, TextInput } from "react-native";

import { AppError } from "../../utils/AppError";
import { playerAddByGroup } from "../../storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "../../storage/player/playerGetByGroupAndTeam";
import { playerRemoveByGroup } from "../../storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "../../storage/group/groupRemove";
import { PlayerStorageDTO } from "../../storage/player/PlayerStorageDTO";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Input } from "../../components/Input";
import { Filter } from "../../components/Filter";
import { PlayerCard } from "../../components/PlayerCard";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";

type RouteParams = {
  group: string;
};

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  // para acessar a rota que foi passada (o group, ver handleNew do Newgroup)
  const route = useRoute();
  const { group } = route.params as RouteParams;
  const navigation = useNavigation();

  // para pegar o elemento de input usamos o useRef
  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (!newPlayerName.trim().length) {
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adicionar."
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);
      // para remover o focus do input:
      newPlayerNameInputRef.current?.blur();
      // newPlayerNameInputRef.current?.focus(); se quiséssemos colocar o focus
      setNewPlayerName("");
      fetchPlayersByTeam();

      // obs, para fechar o teclado
      // não precisamos colocar, pois qd remove o focus do input o teclado fecha automaticamente
      // Keyboard.dismiss();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo pessoa", error.message);
      } else {
        Alert.alert("Novo pessoa", "Não foi possível adicionar!");
        console.error(error);
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Pessoas",
        "Não foi possível carregar as pessoas do time selecionado."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover pessoa", "Não foi possível remover essa pessoa.");
    }
  }

  async function groupRemove() {
    try {
      groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover grupo", "Não foi possíve remover o grupo.");
    }
  }

  async function handleRemoveGroup() {
    Alert.alert("Remover", "Deseja remover a turma?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => groupRemove(),
      },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="Adicione a galera e separe os times" />

      <Form>
        <Input
          // vamoe pegar dentro do nosso componente o ref
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          // para chamar nossa função que qd o usuário clique no "OK" do teclado:
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon
          icon="add"
          type="PRIMARY"
          onPress={() => handleAddPlayer()}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => {
                handleRemovePlayer(item.name);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time." />
          )}
          contentContainerStyle={[
            { paddingBottom: 100 },
            !players.length && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
