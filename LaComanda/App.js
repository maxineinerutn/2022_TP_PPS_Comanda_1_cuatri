import { StyleSheet } from 'react-native';
import { useState, useEffect } from "react";
import AnimatedSplash from 'react-native-animated-splash-screen';
import SplashScreen from './src/components/SplashScreen/SplashScreen';
import Main from './src/components/Main/Main';

export default function App() {
  const [isLoaded, setIsloaded] = useState(false);

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
      <Main></Main>
    </AnimatedSplash>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
});
