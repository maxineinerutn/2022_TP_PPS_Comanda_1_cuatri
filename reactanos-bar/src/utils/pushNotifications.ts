import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { Platform } from 'react-native';
import { db } from '../InitApp';
interface Notification{
    title:string;
    description:string;
}

let tokens:string[]=[];

export const notificationsConfiguration = () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
    registerForPushNotificationsAsync();
    getTokens();
    // const MY_TASK_NAME = 'BACKGROUND-NOTIFICATION-TASK';
    // Notifications.registerTaskAsync(MY_TASK_NAME)
    //     registerForPushNotificationsAsync().then((token) =>
    //   setExpoPushToken(token)
    // );

    // notificationListener.current =
    //   Notifications.addNotificationReceivedListener((notification) => {
    //     setNotification(notification);
    //   });

    // responseListener.current =
    //   Notifications.addNotificationResponseReceivedListener((response) => {
    //     console.log(response);
    //   });

    // return () => {
    //   Notifications.removeNotificationSubscription(
    //     notificationListener.current
    //   );
    //   Notifications.removeNotificationSubscription(responseListener.current);
    // };
}

export const sendPushNotification = async ({title, description}:Notification) =>  {
    try {
        const message = {
          to: tokens,
          title: title,
          body: description,
        };
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
    } catch (error) {
      console.log(error)              
    }
}

const getTokens = async () => {
    const q = query(collection(db, "pushTokens"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        tokens.push(doc.data().token)
    });
}

const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      const collectionRef = collection(db, "pushTokens");
            await setDoc(doc(collectionRef, token), {
                token,
                creationDate: new Date(),
            });
    } else {
      alert('Must use physical device for Push Notifications');
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        bypassDnd: true,
      });
    }
};
