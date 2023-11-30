import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyle from './src/styles/globalStyle'
import Routes from './src/navigation/routes'

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <Routes/>
    </SafeAreaView>
    
  )
}

export default App

const styles = StyleSheet.create({})