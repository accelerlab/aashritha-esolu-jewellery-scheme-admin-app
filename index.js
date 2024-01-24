/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
//react-native push notification code 
//start
PushNotification.configure({

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // process the notification
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
});
//end

// firebase Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

// Check if app was launched in the background and conditionally render null if so
function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        // App has been launched in the background by iOS, ignore
        return null;
    }

    // Render the app component on foreground launch
    return <App />;
}



AppRegistry.registerComponent(appName, () => HeadlessCheck);
