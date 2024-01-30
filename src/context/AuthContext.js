import React, {createContext, useRef} from 'react';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useMakeRequest from '../hooks/useMakeRequest';
import constant from '../constants/constant';
import {showAlert} from '../utils/Helper';
import messaging from '@react-native-firebase/messaging';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  // loading & usertoken hooks
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setuserToken] = useState(null);

  const [notificationCount, setNotifcationCount] = useState(0);

  //notification refresh list boolean value
  const refreshNotificationList = useRef(false);

  const {postData, getData} = useMakeRequest();

  //login method
  const login = async (username, password) => {
    try {
      let url = `${constant.BASE_URL}/api/authenticate/staff/signin`;
      //fcm token
      const fcm_token = await AsyncStorage.getItem('fcm_token');
      console.log('stored fcm token', fcm_token);
      let body = {username: username, password: password, fcm_token: fcm_token};
      let res = await postData(url, body);
      console.log('login body', body);
      console.log('login res', res);
      if (res?.responseCode == 200) {
        let data = res?.responseData;
        // //admin
        // if (data?.role == "1") {
        //     //saving admin token
        //     await AsyncStorage.setItem("Admin", data.access_token)
        //     setAdmin(true)
        // }
        // //staff
        // else if (data?.role == "2") {
        //saving staff token
        await AsyncStorage.setItem('Staff', data.access_token);
        // }
        //saving data
        //await AsyncStorage.setItem("userData", JSON.stringify(data))
        //token and user data
        setuserToken(data.access_token);
        //setUserData(data);
      } else if (res?.responseCode == 203) {
        showAlert('Warning', 'Invalid Email/Phone and Password');
      } else {
        showAlert('Error', res?.responseMessage);
      }
    } catch (error) {
      console.log('login api error', error);
      showAlert('Error', 'Error occured');
    }
  };
  //logout method
  const logout = async () => {
    //setting user token and data as null
    setuserToken(null);
    setIsLoading(true);
    try {
      //removing all items;
      AsyncStorage.clear();
      //removing fcm token
      await messaging().deleteToken();
    } catch (error) {
      // There was an error on the native side
      console.log('Error while removing data', error);
    }
    setIsLoading(false);
  };
  // checking user is already logged in each time when app starts
  const isLoggenIn = async () => {
    setIsLoading(true);
    try {
      // let userData = await AsyncStorage.getItem("userData");
      // //checking user data exists
      // if (userData) {
      //     setUserData(JSON.parse(userData));
      // }
      //staff
      let user = await AsyncStorage.getItem('Staff');
      if (user) {
        console.log('user token saved', user);
        setuserToken(user);
      }
      // //admin
      // let admin = await AsyncStorage.getItem("Admin");
      // if (admin) {
      //     console.log("amdin token saved", admin)
      //     setAdmin(true)
      //     setuserToken(admin);
      // }
    } catch (error) {
      console.log('Error retrieving data', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggenIn();
  }, []);

  //clean notfication unread count
  const getNotificationCount = async () => {
    try {
      let url = `${constant.BASE_URL}/api/notification/count`;
      let headers = {'access-token': userToken};
      let res = await getData(url, headers);
      if (res?.responseCode == 200) {
        console.log('unread notifcation count', res?.responseData?.count);
        //cart item count
        setNotifcationCount(res?.responseData?.count);
      }
    } catch (error) {
      console.log('notification count fetch error', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        userToken,
        notificationCount,
        getNotificationCount,
        refreshNotificationList
      }}>
      {children}
    </AuthContext.Provider>
  );
};
