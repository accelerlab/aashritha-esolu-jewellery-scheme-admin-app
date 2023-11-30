// import React, { createContext } from "react";
// import { useState, useEffect } from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import useMakeRequest from "../hooks/useMakeRequest";
// import constant from "../constants/constant";
// import { showAlert } from "../utils/Helper";
// import messaging from '@react-native-firebase/messaging';

// export const AuthContext = createContext();
// export const AuthProvider = ({ children }) => {
//     // loading & usertoken hooks
//     const [isLoading, setIsLoading] = useState(false);
//     const [userToken, setuserToken] = useState(null);
//     const [userData, setUserData] = useState(null);
//     const [isAdmin, setAdmin] = useState(false);


//     const { postData } = useMakeRequest()

//     //login method
//     const login = async (username, password, fcmToken) => {
//         try {
//             let url = `${constant.BASE_URL}/api/authenticate/login`
//             let body = { username: username, password: password, fcm_token: fcmToken }
//             let res = await postData(url, body);
//             console.log("login res", res);
//             if (res?.responseCode == 200) {
//                 let data = res?.responseData;
//                 //admin
//                 if (data?.role == "1") {
//                     //saving admin token
//                     await AsyncStorage.setItem("Admin", data.access_token)
//                     setAdmin(true)
//                 }
//                 //staff
//                 else if (data?.role == "2") {
//                     //saving staff token
//                     await AsyncStorage.setItem("Staff", data.access_token)
//                 }
//                 //saving data
//                 await AsyncStorage.setItem("userData", JSON.stringify(data))
//                 //token and user data
//                 setuserToken(data.access_token)
//                 setUserData(data);
//             }
//             else if (res?.responseCode == 203) {
//                 showAlert('Warning', 'Invalid Email/Phone and Password');
//             }
//             else {
//                 showAlert('Error', res?.responseMessage);
//             }
//         }
//         catch (error) {
//             console.log("login api error", error)
//             showAlert('Error', "Error occured",)
//         }


//     }
//     //logout method
//     const logout = async () => {
//         //setting user token and data as null 
//         setuserToken(null);
//         setUserData(null);
//         setAdmin(null)
//         setIsLoading(true);
//         try {
//             //removing all items;
//             AsyncStorage.clear();
//             //removing fcm token
//             await messaging().deleteToken();
//         } catch (error) {
//             // There was an error on the native side
//             console.log("Error while removing data", error);
//         }
//         setIsLoading(false);
//     }
//     // checking user is already logged in each time when app starts
//     const isLoggenIn = async () => {
//         setIsLoading(true);
//         try {
//             let userData = await AsyncStorage.getItem("userData");
//             //checking user data exists
//             if (userData) {
//                 setUserData(JSON.parse(userData));
//             }
//             //staff
//             let staff = await AsyncStorage.getItem("Staff");
//             if (staff) {
//                 console.log("staff token saved", staff)
//                 setuserToken(staff);
//             }
//             //admin
//             let admin = await AsyncStorage.getItem("Admin");
//             if (admin) {
//                 console.log("amdin token saved", admin)
//                 setAdmin(true)
//                 setuserToken(admin);
//             }

//         } catch (error) {
//             console.log("Error retrieving data", error);
//         }
//         setIsLoading(false);
//     }

//     useEffect(() => {
//         isLoggenIn();
//     }, [])




//     return (
//         <AuthContext.Provider value={{
//             login,
//             logout,
//             isLoading,
//             userToken,
//             userData,
//             isAdmin

//         }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }