import React, { useContext, useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { AuthContext } from '../context/AuthContext';
import AppStack from './AppStack';
import colors from '../constants/colors';
import { Login, MemberTransaction, Members, SchemePayment, OtherPayment, FixedHistory, UnfixedHistory, OtherHistory, Groups } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import navigationStrings from '../constants/navigationStrings';

const Stack = createStackNavigator();

const Routes = () => {
    // const { isLoading, userToken } = useContext(AuthContext);
    // //activity loader scrren method
    // if (isLoading) {
    //     return (
    //         <View style={{
    //             flex: 1,
    //             justifyContent: 'center',
    //             alignItems: 'center'
    //         }} >
    //             <ActivityIndicator size={'large'} color={colors.primary} />
    //         </View>
    //     );

    // }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={navigationStrings.LOGIN} component={Login}/>
                <Stack.Screen name={navigationStrings.MEMBERS} component={Members}/>
                <Stack.Screen name={navigationStrings.MEMBER_TRANSACTION} component={MemberTransaction}/>
                <Stack.Screen name={navigationStrings.SCHEME_PAYMENT} component={SchemePayment}/>
                <Stack.Screen name={navigationStrings.OTHER_PAYMENT} component={OtherPayment}/>
                <Stack.Screen name={navigationStrings.FIXED_HISTORY} component={FixedHistory}/>
                <Stack.Screen name={navigationStrings.UNFIXED_HISTORY} component={UnfixedHistory}/>
                <Stack.Screen name={navigationStrings.OTHER_HISTORY} component={OtherHistory}/>
                <Stack.Screen name={navigationStrings.GROUPS} component={Groups}/>
            </Stack.Navigator>
            {/* {userToken == null ? <AuthStack /> : <AppStack />} */}
        </NavigationContainer>
    );

}

export default Routes

