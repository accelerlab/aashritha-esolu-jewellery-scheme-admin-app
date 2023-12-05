import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import styles from './styles'
import Input from '../../components/input'
import Button from '../../components/Button'

const SchemePayment = () => {
  return (
    <View style={styles.container}>
      <Header title={"SCHEME TRANSACTION"} showBackButton={true} />
      <KeyboardAvoidingView style={styles.container} keyboardShouldPersistTaps='handled'>
        <View style={[styles.inputContainer, { marginBottom: 10 }]}>
          <Text style={styles.heading}>Scheme Transaction Details</Text>
          
          <View style={styles.rowContainer}>
            <Input
              placeHolder={"Installment No. *"}
              inputStyle={{ flex: 0.5, marginHorizontal: 0, marginRight: 10 }}
            />
            <Input
              placeHolder={"Date *"}
              inputStyle={{ flex: 0.5, marginHorizontal: 0, marginRight: 10 }}
            />
          </View>
          <Input
            placeHolder={"Amount *"}
            value={''}
            keyboardType='numeric'
          />
          <Input
            placeHolder={"Current Rate"}
            value={'5625'}
            keyboardType='numeric'
          />
          <Input
            placeHolder={"Weight in grams*"}
            inputStyle={{marginBottom: 20}}
          />
          <Button
            title={'Proceed Payment'} />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default SchemePayment
