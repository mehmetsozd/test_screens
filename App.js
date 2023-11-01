import * as React from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import Onboarding from './src/screens/onboard/Onboarding';
import HomeScreen from './src/screens/onboard/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
}

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [viewedOnboarding, setViewedOnboarding] = React.useState(false);


  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding')
      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? <Loading /> : viewedOnboarding ? <HomeScreen /> : <Onboarding />}
      <StatusBar style="auto" />
    </View>

  );
};

export default App;
