import { createStackNavigator } from '@react-navigation/stack';
import {
    Login,
} from '../screens';
import navigationStrings from '../constants/navigationStrings';
import { useEffect } from 'react';

const Stack = createStackNavigator();

function AuthStack() {

   

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}  >
            <Stack.Screen name={navigationStrings.LOGIN} component={Login} />
        </Stack.Navigator>
    );
}
export default AuthStack;