import { useState, useEffect, useMemo } from 'react';
import AnimatedSplash from 'react-native-animated-splash-screen';
import * as Notifications from 'expo-notifications';
import SplashScreen from './src/components/SplashScreen/SplashScreen';
import Main from './src/components/Main/Main';
import GlobalContext from './src/context/GlobalContext';

export default function App() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    })
  });
  const [isLoaded, setIsloaded] = useState( false );
  const [user, setUser] = useState({});
  const memo = useMemo(
    () => ({
      user,
      setUser
    }),
    [user]
  );

  useEffect(() => {
    setTimeout(() => {
      setIsloaded( true );
    }, 3000 );
  }, []);

  return (
    <AnimatedSplash
      translucent
      isLoaded={isLoaded}
      backgroundColor='black'
      customComponent={<SplashScreen />}
    >
      <GlobalContext.Provider value={memo}>
        <Main />
      </GlobalContext.Provider>
    </AnimatedSplash>
  );
}
