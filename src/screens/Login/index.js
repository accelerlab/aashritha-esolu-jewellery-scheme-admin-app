import {Image, ImageBackground, Platform, Text, View} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import styles from './styles';
import Input from '../../components/input';
import {passwordValidation, showAlert} from '../../utils/Helper';
import Button from '../../components/Button';
import {AuthContext} from '../../context/AuthContext';
import {
  androidNotificationPermission,
  requestUserPermission,
} from '../../services/notificationServices';
const Login = ({navigation}) => {
  const {userToken, login} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setVisible] = useState(true);
  const [fcmToken, setFcmToken] = useState('');

  //push notification logic
  useEffect(() => {
    console.log('inside login use Effect');
    if (Platform.OS == 'android') {
      //android notification permission
      androidNotificationPermission();
    } else if (Platform.OS == 'ios') {
      //android ios permission
      console.log('inside ios');
      requestUserPermission();
    }
  }, [userToken]);
  const submit = async () => {
    if (username && password) {
      //email and phone number validation

      //email / phone number is valid
      //acc_id validation
      // if (!acc_idValidation(acc_id)) {
      //     showAlert('Warning', 'The acc_id must be at least 6 characters long and must include at least one uppercase character,one number and one special character');
      //     return;
      // }
      //all data is valid calling login function
      login(username, password, fcmToken);
    } else {
      showAlert('Warning', 'Please fill all the details');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Login..</Text>
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeHolder={'Email/Phone'}
            value={username}
            onChangeText={val => setUsername(val)}
          />
          <Input
            placeHolder={'Password'}
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry={isVisible}
            rightIcon={isVisible ? 'eye' : 'eye-with-line'}
            onPressRight={() => setVisible(!isVisible)}
          />
        </View>
        <Button title={'Continue'} onPress={submit} />
      </View>
    </View>
  );
};

export default Login;
