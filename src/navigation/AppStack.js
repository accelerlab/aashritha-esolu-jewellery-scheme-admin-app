import {createStackNavigator} from '@react-navigation/stack';
import {Login, Groups, Members, MemberTransaction} from '../screens';
import navigationStrings from '../constants/navigationStrings';
const Stack = createStackNavigator();
import {notificationListeners} from '../services/notificationServices';
import {useContext, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import Invoice from '../screens/Invoice';
import {AuthContext} from '../context/AuthContext';
import Notification from '../screens/Notification';
import MemberSingleTransaction from '../screens/MembersSingleTranscation';
function AppStack() {
  useEffect(() => {
    console.log('inside app stack useffect');
    //push notification listeners
    notificationListeners();

    //foreground state
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

   

    return unsubscribe;
  }, []);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={navigationStrings.GROUPS} component={Groups} />
      <Stack.Screen name={navigationStrings.MEMBERS} component={Members} />
      <Stack.Screen
        name={navigationStrings.MEMBER_TRANSACTION}
        component={MemberTransaction}
      />
      <Stack.Screen name={navigationStrings.INVOICE} component={Invoice} />
      <Stack.Screen
        name={navigationStrings.NOTIFICATION}
        component={Notification}
      />
      <Stack.Screen
        name={navigationStrings.MEMBERS_SINGLE_TRANSACTION}
        component={MemberSingleTransaction}
      />
    </Stack.Navigator>
  );
}
export default AppStack;
