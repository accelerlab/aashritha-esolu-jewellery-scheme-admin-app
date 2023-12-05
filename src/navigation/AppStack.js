import { createStackNavigator } from '@react-navigation/stack';
import {
  Login,
  Members,
  MemberTransaction,
  OtherPayment,
  SchemePayment
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
      <Stack.Screen name={navigationStrings.SCHEME_PAYMENT} component={SchemePayment} />
      <Stack.Screen name={navigationStrings.OTHER_PAYMENT} component={OtherPayment} />
      <Stack.Screen name={navigationStrings.FIXED_HISTORY} component={FixedHistory} />
      <Stack.Screen name={navigationStrings.UNFIXED_HISTORY} component={UnfixedHistory} />
      <Stack.Screen name={navigationStrings.OTHER_HISTORY} component={OtherHistory} />
    </Stack.Navigator>
  );
}
export default AppStack;