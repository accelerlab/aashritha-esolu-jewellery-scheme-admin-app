import messaging from '@react-native-firebase/messaging';
import {Alert, PermissionsAndroid} from 'react-native';
import NavigationService from '../navigation/NavigationService';
import DeviceInfo from 'react-native-device-info';
import navigationStrings from '../constants/navigationStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';

//asking notification permission for android (sdd > 33)
export const androidNotificationPermission = () => {
  if (DeviceInfo.getApiLevelSync() >= 33) {
    console.log('info', DeviceInfo.getApiLevelSync());
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    )
      .then(res => {
        console.log('permission res', res);
        if (res && res == 'granted') {
          console.log('notification permission allowed');
          getFcmToken();
        }
      })
      .catch(err => console.log('Notification Error occured', err));
  }
  //api level is < 33 no need to ask permission
  else if (Platform.OS == 'android' && DeviceInfo.getApiLevelSync() < 33) {
    getFcmToken();
  }
};

//requesting user permission (required for ios)
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

//get fcm token
export const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('device fcm token', token);
    AsyncStorage.setItem('fcm_token', token);
  } catch (err) {
    console.log('fcm token async storage save error', err);
  }
};

// //issues -> some times foreground notification shows more than one time
// //displaying foreground notification
// async function onDisplayNotification(data) {
//     // Request permissions (required for iOS)
//     if (Platform.OS == 'ios') {
//         await notifee.requestPermission()
//     }

//     // Create a channel (required for Android)
//     // const channelId = await notifee.createChannel({
//     //     //id: data?.data?.channel_id,
//     //     //name: data?.data?.channel_name,
//     //     //sound: 'default',
//     //     id: 'default',
//     //     name: 'Default Channel',
//     //     importance: AndroidImportance.HIGH,
//     // });
//     const channelId = await notifee.createChannel({
//         id: 'default',
//         name: 'Default Channel',
//     });

//     // Display a notification
//     await notifee.displayNotification({
//         title: data?.notification.title,
//         body: data?.notification.body,
//         android: {
//             channelId,
//             //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
//             // pressAction is needed if you want the notification to open the app when pressed
//             pressAction: {
//                 id: 'default',
//             },
//         },
//     });

// }
//notification handle function
const handleNotification = remoteMessage => {
  //navigating after 1 second (giving time to navigation to initialise)
  if (remoteMessage?.data) {
    setTimeout(() => {
      NavigationService.navigate(navigationStrings.NOTIFICATION);
    }, 1000);
  }
  // if (remoteMessage?.data && remoteMessage?.data?.type == 'ProductDetails') {
  //     setTimeout(() => { NavigationService.navigate('ProductDetails') }, 1000)
  // }
};

//sample fcm test message object
//{ "type": "ProductDetails", "channel_id": "second channel6", "channel_name": "second channel6" }
//notification listeners
export const notificationListeners = async () => {
  console.log('inside listner');
  //foreground message
  // const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     getNotificationCount();
  //     // onDisplayNotification(remoteMessage)
  // });

  //back ground
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );
    handleNotification(remoteMessage);
  });

  // Check whether an initial notification is available
  //quite state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
        handleNotification(remoteMessage);
      }
    });

  //return unsubscribe;
};
