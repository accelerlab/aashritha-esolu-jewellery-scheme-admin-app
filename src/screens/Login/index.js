import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Button from '../../components/Button'
import navigationStrings from '../../constants/navigationStrings'
import Input from '../../components/input'
import styles from './styles'
import imagePath from '../../constants/imagePath'
const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setVisible] = useState(true);
  const [fcmToken, setFcmToken] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Login..</Text>
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeHolder={"Email/Phone"}
            value={username}
            onChangeText={(val) => setUsername(val)}
          />
          <Input
            placeHolder={"Password"}
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={isVisible}
            rightIcon={isVisible ? "eye" : "eye-with-line"}
            onPressRight={() => setVisible(!isVisible)}
          />
        </View>
        <Button
          title={'Continue'}
          onPress={() => navigation.navigate(navigationStrings.GROUPS)}
        />
      </View>
    </View>
  )
}

export default Login
