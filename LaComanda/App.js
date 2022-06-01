import { StyleSheet } from 'react-native';
import { useState, useEffect } from "react";
import AnimatedSplash from 'react-native-animated-splash-screen';
import SplashScreen from './src/components/SplashScreen/SplashScreen';
import Main from './src/components/Main/Main';
import GlobalContext from './src/context/GlobalContext';

export default function App() {
  const [isLoaded, setIsloaded] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsloaded(true);
    }, 3000);
  }, []);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      backgroundColor={"black"}
      customComponent={<SplashScreen/>}
    >
      <GlobalContext.Provider value={{ email, setEmail, password, setPassword }}>
        <Main></Main>
      </GlobalContext.Provider>
    </AnimatedSplash>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
