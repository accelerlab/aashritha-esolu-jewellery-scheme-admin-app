import { SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'

//import SplashScreen from 'react-native-splash-screen'
import globalStyle from './src/styles/globalStyle';
import Routes from './src/navigation/routes';
import { AuthProvider } from './src/context/AuthContext';
const App = () => {
  return (

    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
      <View style={globalStyle.mainContainer}>
        <Routes />
      </View>
    </SafeAreaView>
      </AuthProvider >
   

  )
}

export default App

const styles = StyleSheet.create({})