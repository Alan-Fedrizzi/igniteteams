import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLECTION } from "../storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupRemoveByName(groupName: string) {
  try {
    const storedGroups = await groupsGetAll();
    const groups = storedGroups.filter((group) => group !== groupName);
    const storage = JSON.stringify(groups);

    // salvar a nova lista de grupos sem o grupo que queremos deletar
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    // remover os players do grupo removido
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`);
  } catch (error) {
    throw error;
  }
}
