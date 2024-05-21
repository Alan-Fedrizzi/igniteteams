import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "../../utils/AppError";
import { GROUP_COLLECTION } from "../storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroupName: string) {
  try {
    const storedGroups = await groupsGetAll();
    const groupsAlreadyExists = storedGroups.includes(newGroupName);

    if (groupsAlreadyExists) {
      throw new AppError("Já existe um grupo cadastrado com esse nome");
    }

    const storage = JSON.stringify([...storedGroups, newGroupName]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    // quem chamar esse function vai receber o erro
    throw error;
  }
}
