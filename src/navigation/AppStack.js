import { createStackNavigator } from '@react-navigation/stack';
import {
  Login,
  Groups,
  Members,
  MemberTransaction,
} from '../screens';
import navigationStrings from '../constants/navigationStrings';
const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}  >
      <Stack.Screen name={navigationStrings.GROUPS} component={Groups} />
      <Stack.Screen name={navigationStrings.MEMBERS} component={Members} />
      <Stack.Screen name={navigationStrings.MEMBER_TRANSACTION} component={MemberTransaction} />
    </Stack.Navigator>
  );
}
export default AppStack;