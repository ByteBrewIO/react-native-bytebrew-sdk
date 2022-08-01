# react-native-bytebrew-sdk
ByteBrew React Native SDK for Android and iOS platforms.

ByteBrew is the free easy to integrate React Native SDK that provides your app/game with Real-Time Analytic Tracking, Monetization Tracking, Attribution, Remote Configs and A/B Testing.

## Installation

```sh
npm install react-native-bytebrew-sdk
```

## Usage

```js
import ByteBrew from 'react-native-bytebrew-sdk';

// ...

// Initialize the ByteBrew SDK
if(Platform.OS == "android") {
    ByteBrew.Initialize("ANDROID_APP_ID", "ANDROID_SDK_KEY");
} else if(Platform.OS == "ios") {
    ByteBrew.Initialize("IOS_APP_ID", "IOS_SDK_KEY");
}
```

## More Documentation
### Checkout our ByteBrew developer docs [React-Native-Docs](https://docs.bytebrew.io/sdk/react-native)

## Getting Started With ByteBrew

[ByteBrew Dashboard](https://dashboard.bytebrew.io): Setup your mobile games and view your real-time analytics.

Create your ByteBrew account to access the [dashboard](https://dashboard.bytebrew.io/register), or if you do have an account login [here](https://dashboard.bytebrew.io/login).

## Community
Join our Community of Developers on Discord [here](https://discord.gg/sAp4f3tJte)!

## License

MIT

---
