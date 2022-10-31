import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import ByteBrew from 'react-native-bytebrew-sdk';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = () => {
    const [result, setResult] = React.useState<string | undefined>();
    const [configs, setConfigs] = React.useState<string | undefined>();
    const [abtest, setABTest] = React.useState<string | undefined>();

    return (
        <View style={styles.container}>
            <Text>User: {result}</Text>
            <Text>Configs: {configs || "N/A"}</Text>
            <Text>A/B Test: {abtest || "N/A"}</Text>
            <Button title='Press me' onPress={() => ByteBrew.NewCustomEvent("press_me_bt")}></Button>
            <Button title='Press custom event string' onPress={() => ByteBrew.NewCustomEvent("clicked_product", "clock_1235")}></Button>
            <Button title='Press custom event' onPress={() => ByteBrew.NewCustomEvent("collected", 32)}></Button>
            <Button title='Press for complex custom event' onPress={() => ByteBrew.NewCustomEvent("complx_event", "item=react;time=" + Date.now + ";")}></Button>
            <Button title='Attribute something' onPress={() => ByteBrew.SetCustomDataAttribute("click", "yep")}></Button>
            <Button title='Attribute Another' onPress={() => ByteBrew.SetCustomDataAttribute("acknowledged", true)}></Button>
            <Button title='Attribute Level' onPress={() => ByteBrew.SetCustomDataAttribute("level", 2)}></Button>
            <Button title='Attribute Amounts' onPress={() => ByteBrew.SetCustomDataAttribute("amount", 29.99)}></Button>
            <Button title='Ad event' onPress={() => ByteBrew.TrackAdEvent("Interstitial", "HomeScreen")}></Button>
            <Button title='Reward Ad Event' onPress={() => ByteBrew.TrackAdEvent("Reward", "HomeScreen")}></Button>
            <Button title='Banner Showing' onPress={() => ByteBrew.TrackAdEvent("Banner", "HomeScreen", "some_id", "Google Ads")}></Button>
            <Button title='Progression Started' onPress={() => ByteBrew.NewProgressionEvent("Started", "Stack_Pages", "Home")}></Button>
            <Button title='Progression Failed' onPress={() => ByteBrew.NewProgressionEvent("Failed", "Stack_Pages", "Home")}></Button>
            <Button title='Progression Completed' onPress={() => ByteBrew.NewProgressionEvent("Completed", "Stack_Pages", "Home")}></Button>
            <Button
                title="Get User"
                onPress={() =>
                ByteBrew.GetUserID().then(setResult)
                }
            />
            <Button
                title="Get Configs"
                onPress={() => {
                  ByteBrew.IsByteBrewInitialized().then((sec) => {
                      console.log("ByteBrew Initialized Second: ", sec);
                  });

                  ByteBrew.LoadRemoteConfigs().then(value => {
                    if(value) {
                      ByteBrew.RetrieveRemoteConfigValue("test_key", "Nothing").then(config => {
                        setConfigs(config);
                      });
                      ByteBrew.RetrieveRemoteConfigValue("test-item", "Nothing").then(config => {
                        setABTest(config);
                      });
                    }
                  });
                }}
            />
        </View>
    );

    
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    box: {
      width: 60,
      height: 60,
      marginVertical: 20,
    },
  });

export default HomeScreen;