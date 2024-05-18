import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Groups } from "../screens/Groups";
import { NewGroup } from "../screens/NewGroup";
import { Players } from "../screens/Players";

// const NativeStack = createNativeStackNavigator();
{
  /* <NativeStack.Navigator>
  <NativeStack.Screen name="Home" component={HomeScreen} />
</NativeStack.Navigator> */
}
const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    // se não definir initialRouteName ele carrega a primeira
    // ele colocar um header, para tirar headerShown: false
    <Navigator
      initialRouteName="groups"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="groups" component={Groups} />
      <Screen name="new" component={NewGroup} />
      <Screen name="players" component={Players} />
    </Navigator>
  );
}
