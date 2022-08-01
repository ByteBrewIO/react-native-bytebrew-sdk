import * as React from 'react';

import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import ByteBrew from 'react-native-bytebrew-sdk';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  if(Platform.OS == "android") {
    ByteBrew.Initialize("ANDROID_APP_ID", "ANDROID_SDK_KEY");
  } else if(Platform.OS == "ios") {
    ByteBrew.Initialize("IOS_APP_ID", "IOS_SDK_KEY");
  }

  React.useEffect(() => {

  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
