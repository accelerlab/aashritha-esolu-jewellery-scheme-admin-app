import { createStackNavigator } from '@react-navigation/stack';
import {
  Login,
  Members,
  MemberTransaction
} from '../screens';
import navigationStrings from '../constants/navigationStrings';
// import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
const Stack = createStackNavigator();

function AppStack() {

  // const { isAdmin } = useContext(AuthContext);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}  >
      {/* Admin Screens */}
      {/* {isAdmin && <Stack.Screen name={navigationStrings.ADMIN_HOME} component={AdminHome} />}
      {isAdmin && <Stack.Screen name={navigationStrings.ADMIN_ADD_STAFF} component={AdminAddStaff} />} */}

      {/* Staff Screens*/}
      <Stack.Screen name={navigationStrings.MEMBERS} component={Members} />
      <Stack.Screen name={navigationStrings.MEMBER_TRANSACTION} component={MemberTransaction} />
    </Stack.Navigator>
  );
}
export default AppStack;